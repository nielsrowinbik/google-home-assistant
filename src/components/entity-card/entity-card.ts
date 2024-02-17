import { computeDomain } from 'custom-card-helpers';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import {
  css,
  customElement,
  html,
  LitElement,
  property,
  state,
} from 'lit-element';

import type { EntityCardConfig } from './entity-card-config';
import { convertRange, registerCustomCard } from '../../util';
import { CARD_NAME, EDITOR_CARD_NAME } from './const';
import { nothing } from 'lit-html';
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
  @property() private hass!: HomeAssistant;

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

  private slideGesture: any;

  connectedCallback(): void {
    super.connectedCallback();
    // this.addEventListener('contextmenu', this._handleContextMenu);
    this.slideGesture = new SlideGesture(this, this._handlePointer.bind(this), {
      touchActions: 'pan-y',
      stopScrollDirection: 'horizontal',
    });
  }

  disconnectedCallback(): void {
    // this.removeEventListener('contextmenu', this._handleContextMenu);
    this.slideGesture.removeListeners();
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
    const prop = computeProperty(domain);

    let progress = 0;

    if (prop) {
      progress = convertRange(
        stateObj.attributes[prop] ?? 0,
        [0, 255],
        [0, 100]
      );
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
      :host {
        --slider-percent: 79%;
      }

      #wrapper {
        display: flex;
        flex-direction: row;
        padding: 12px;
        height: 80px;
        background-color: #ffefc9;
        border-radius: 32px;
        align-items: center;
        position: relative;
        overflow: hidden;
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

  private _handlePointer(e: PointerEvent, extra: SlideGestureEvent) {
    const entityId = this._config?.entity;

    if (!entityId) return;

    const domain = computeDomain(entityId);

    // TODO: Support other domains as well
    if (domain === 'light') {
      switch (e.type) {
        case 'pointerdown':
          // TODO: Handle a tap, which is a pointerdown quickly followed by a pointerup, separately
          console.log('Started sliding!');
          break;

        case 'pointermove':
          console.log('Sliding!');
          break;

        case 'pointerup':
          const stateObj = this.hass.states[entityId] as HassEntity | undefined;
          const currentValue = stateObj?.attributes.brightness ?? 0;

          // TODO: Compute which X coordinate we stopped at
          // TODO: Convert that end X coordinate to progress from left to right
          // TODO: Turn progress into new value

          console.log('Stopped sliding!', { e, extra });
          break;
      }
    }
  }
}

function computeProperty(domain: string): string | undefined {
  switch (domain) {
    case 'climate':
      return 'temperature';
    case 'light':
      return 'brightness';
    case 'media_player':
      return 'volume';
    default:
      return;
  }
}
