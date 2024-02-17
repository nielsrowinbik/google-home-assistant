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
import { registerCustomCard } from '../../util';
import { CARD_NAME, EDITOR_CARD_NAME } from './const';
import { nothing } from 'lit-html';
import type { HassEntity } from 'home-assistant-js-websocket';

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

    return html`<div id="wrapper">${name}</div>`;
  }

  static get styles() {
    return css`
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-family: 'Product Sans';
        padding: 0;
        outline: none;
        width: 100%;
      }

      #wrapper {
        display: flex;
        flex-direction: column;
        position: relative;
      }

      #wrapper > button img,
      #wrapper > button svg {
        height: 100%;
        max-height: 50%;
        max-width: 70px;
        width: 100%;
      }

      #wrapper > button h4 {
        color: var(--primary-text-color, #131313);
        font-family: 'Product Sans';
        font-size: 1.15rem;
        font-weight: 400;
        margin: 12px 0px 0px;
      }

      .actions {
        align-items: center;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        height: 16px;
        justify-content: space-around;
        list-style: none;
        max-width: 170px;
        margin: 12px auto 0px;
        padding: 0;
        width: 100%;
      }

      .actions button {
        color: var(--primary-color, #4285f4);
        flex: 0;
        font-weight: 500;
        white-space: nowrap;
      }

      .actions span {
        background-color: var(--material-divider-color, #dadce0);
        border-radius: 100%;
        height: 4px;
        width: 4px;
      }

      .badge {
        border: 1px solid var(--material-divider-color, #dadce0);
        border-radius: 100%;
        color: var(--primary-text-color, #131313);
        font-family: 'Product Sans';
        font-size: 1.1rem;
        height: 24px;
        line-height: 24px;
        position: absolute;
        right: calc(50% - 64px);
        text-align: center;
        top: 0;
        width: 24px;
      }

      .badge:empty {
        display: none;
      }
    `;
  }
}
