import {
  computeDomain,
  type HomeAssistant,
  type LovelaceCardEditor,
} from 'custom-card-helpers';
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js'; // `.js` extension needed, see: https://github.com/material-components/material-web/issues/3395
import type { DomainCardConfig } from './domain-card-config';
import { getDerivedStyles, registerCustomCard } from '../../util';
import { CARD_NAME, EDITOR_CARD_NAME } from './const';
import pluralize from 'pluralize';

registerCustomCard({
  type: CARD_NAME,
  name: 'Google Home Domain Card',
  description: 'Card for all entities',
});

@customElement(CARD_NAME)
export class DomainCard extends LitElement {
  @property() hass!: HomeAssistant;

  static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./domain-card-editor');
    return document.createElement(EDITOR_CARD_NAME) as LovelaceCardEditor;
  }

  static getStubConfig() {
    return {
      type: `custom:${CARD_NAME}`,
      domain: 'light',
      name: 'Lighting',
      icon: 'mdi:lightbulb-outline',
    };
  }

  @state() private _config?: DomainCardConfig;

  getCardSize(): number | Promise<number> {
    return 1;
  }

  setConfig(config: DomainCardConfig): void {
    this._config = config;
  }

  protected render() {
    if (!this._config || !this.hass || !this._config.domain) {
      return nothing;
    }

    const name = this._config.name || '';
    const icon = this._config.icon;

    const devices = Object.keys(this.hass.states).filter(
      (entityId) => computeDomain(entityId) === this._config?.domain
    ).length;

    return html`
      <div id="wrapper">
        <ha-state-icon
          id="icon"
          .icon=${icon}
          .hass=${this.hass}
        ></ha-state-icon>
        <div id="info">
          <span class="name">${name}</span>
          <span class="">${pluralize('device', devices, true)}</span>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      #wrapper {
        display: flex;
        flex-direction: column;
        padding: 12px;
        width: 120px;
        aspect-ratio: 1 / 1;
        border-radius: 32px;
        align-items: flex-start;
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
}
