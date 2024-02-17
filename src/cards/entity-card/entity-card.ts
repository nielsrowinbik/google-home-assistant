import { computeDomain } from 'custom-card-helpers';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js'; // `.js` extension needed, see: https://github.com/material-components/material-web/issues/3395
import type { EntityCardConfig } from './entity-card-config';
import { convertRange, getDerivedStyles, registerCustomCard } from '../../util';
import { CARD_NAME, EDITOR_CARD_NAME } from './const';
import type { HassEntity } from 'home-assistant-js-websocket';
import { SlideGesture } from '@nicufarmache/slide-gesture';
import type { SlideGestureEvent } from '@nicufarmache/slide-gesture';

registerCustomCard({
  type: CARD_NAME,
  name: 'Google Home Entity Card',
  description: 'Card for all entities',
});

@customElement(CARD_NAME)
export class EntityCard extends LitElement {
  @property() hass!: HomeAssistant;

  static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./entity-card-editor');
    return document.createElement(EDITOR_CARD_NAME) as LovelaceCardEditor;
  }

  static getStubConfig(hass: HomeAssistant) {
    const entities = Object.keys(hass.states);

    return {
      type: `custom:${CARD_NAME}`,
      entity: entities[0],
    };
  }

  @state() private _config?: EntityCardConfig;

  getCardSize(): number | Promise<number> {
    return 1;
  }

  setConfig(config: EntityCardConfig): void {
    this._config = config;
  }

  private _slideGesture: any;
  private _state: 'idle' | 'pressed' | 'dragging' | 'held' = 'idle';
  private _holdTimer: any;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('contextmenu', this._handleContextMenu);
    this._slideGesture = new SlideGesture(
      this,
      this._handlePointer.bind(this),
      {
        touchActions: 'pan-y',
        stopScrollDirection: 'horizontal',
      }
    );
  }

  disconnectedCallback(): void {
    this.removeEventListener('contextmenu', this._handleContextMenu);
    this._slideGesture.removeListeners();
    super.disconnectedCallback();
  }

  protected render() {
    if (!this._config || !this.hass || !this._config.entity) {
      return nothing;
    }

    const entityId = this._config.entity;
    const stateObj = this.hass.states[entityId] as HassEntity | undefined;

    if (!stateObj) {
      //   return this.renderNotFound(this._config);
      return nothing;
    }

    const name = this._config.name || stateObj.attributes.friendly_name || '';
    const icon = this._config.icon;

    const domain = computeDomain(entityId);
    const [prop, range] = computePropertyAndRange(domain);

    let progress = 0;
    if (prop && range) {
      progress = convertRange(stateObj.attributes[prop] ?? 0, range, [0, 100]);
    }

    return html`
      <div id="wrapper" style="--slider-percent: ${progress}%">
        <div id="slider"></div>
        <ha-state-icon
          id="icon"
          .icon=${icon}
          .state=${stateObj}
          .hass=${this.hass}
          .stateObj=${stateObj}
        ></ha-state-icon>
        <div id="info">
          <span class="name">${name}</span>
          <span class="state">${stateObj.state}</span>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      #wrapper {
        display: flex;
        flex-direction: row;
        padding: 12px;
        height: 80px;
        border-radius: 32px;
        align-items: center;
        position: relative;
        overflow: hidden;
        ${getDerivedStyles('yellow')}
      }

      #slider {
        position: absolute;
        top: 0;
        left: 0;
        right: calc(100% - var(--slider-percent));
        bottom: 0;
        background-color: #ffe082;
        z-index: 0;
        transition: right 300ms ease;
      }

      #info,
      #icon {
        z-index: 0;
      }

      #icon {
        margin-right: 12px;
      }

      #info {
        display: flex;
        flex-direction: column;
      }

      #info .state {
        text-transform: capitalize;
      }
    `;
  }

  private _handleContextMenu(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    return false;
  }

  private _handlePointer(e: PointerEvent, extra: SlideGestureEvent) {
    if (e.type === 'pointerdown') {
      // Mark button as being pressed:
      this._state = 'pressed';
      // Set a timeout, after which the button will be marked als held:
      this._holdTimer = setTimeout(() => {
        this._state = 'held';
        console.log('handling hold'); // TODO: Handle hold
      }, 600); // TODO: Configure hold time
    }

    if (e.type === 'pointermove') {
      // Ignore moves if we're pressing and not moving enough:
      if (this._state === 'pressed' && Math.abs(extra.relativeX) < 5) return;

      // Also ignore moves if we're holding:
      if (this._state === 'held') return;

      // If moving enough, signal that we're dragging:
      if (this._state !== 'dragging') {
        this._state = 'dragging';
        clearTimeout(this._holdTimer);
      }

      // TODO: Update values as we're dragging, instead of just when we release
    }

    if (e.type === 'pointercancel') {
      // Reset if pointer is cancelled:
      clearTimeout(this._holdTimer);
      this._state = 'idle';
    }

    if (e.type === 'pointerup') {
      clearTimeout(this._holdTimer);

      // If we're pressing when the pointer is released, handle it:
      if (this._state === 'pressed') {
        // TODO: Handle press
        console.log('handling press');
        this._state = 'idle';
        return;
      }

      // If we're holding when the pointer is released, reset (we handle the hold
      // the second we register it):
      if (this._state === 'held') {
        this._state = 'idle';
        return;
      }

      // Compute the new value (in terms of progress from left to right):
      const { left, width } = this.getBoundingClientRect();
      const newValue = (e.clientX - left) / width;

      // Compute the correct service call, if possible:
      const entityId = this._config?.entity;
      const [domain, service, data] = computeServiceCall(
        computeDomain(entityId!),
        newValue
      );

      // Call the service, if it exists:
      if (!!domain && !!service && !!data) {
        this.hass.callService(domain, service, {
          ...data,
          entity_id: entityId,
        });
      }

      // Reset:
      this._state = 'idle';
    }
  }
}

function computePropertyAndRange(
  domain: string
): [string, [number, number]] | [] {
  switch (domain) {
    case 'light':
      return ['brightness', [0, 255]];
    case 'media_player':
      return ['volume_level', [0, 1]];
    default:
      return [];
  }
}

function computeServiceCall(
  domain: string,
  value: number
): [domain: string, service: string, data: any] | [] {
  switch (domain) {
    case 'light':
      return [
        'light',
        'turn_on',
        { brightness: convertRange(value, [0, 1], [0, 255]) },
      ];
    case 'media_player':
      return ['media_player', 'volume_set', { volume_level: value }];
    default:
      return [];
  }
}
