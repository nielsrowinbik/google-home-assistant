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
import { styleMap } from 'lit/directives/style-map.js';

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
      <div
        id="wrapper"
        style=${styleMap({
          'background-color': getDerivedBackgroundColor(this._config?.domain),
        })}
      >
        <ha-state-icon
          id="icon"
          .icon=${icon}
          .hass=${this.hass}
        ></ha-state-icon>
        <div id="info">
          <span class="primary">${name}</span>
          <span class="secondary">${pluralize('device', devices, true)}</span>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        width: 120px;
        aspect-ratio: 1 / 1;
      }

      #wrapper {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 16px;
        height: 100%;
        border-radius: 28px;
        align-items: flex-start;
        justify-content: space-between;
        position: relative;
        overflow: hidden;
      }

      #info {
        display: flex;
        flex-direction: column;
      }

      #info .primary {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
      }

      #info .secondary {
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
      }
    `;
  }
}

function getDerivedBackgroundColor(domain: string) {
  switch (domain) {
    case 'camera':
      return '#dbe2fc';

    case 'climate':
      return '#f9dccf';

    case 'light':
      return '#fcf0cd';

    default:
      return '#f3f6fb';
  }
}
