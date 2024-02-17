import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import {
  customElement,
  LitElement,
  CSSResult,
  css,
  state,
  property,
} from 'lit-element';
import { TemplateResult, html, nothing } from 'lit-html';
import { EDITOR_CARD_NAME } from './const';
import { EntityCardConfig } from './entity-card-config';

const SCHEMA = [{ name: 'entity', selector: { entity: {} } }];

@customElement(EDITOR_CARD_NAME)
export class EntityCardEditor extends LitElement {
  @state() private _config?: EntityCardConfig;
  @property() private hass!: HomeAssistant;

  public setConfig(config: EntityCardConfig) {
    this._config = config;
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    fireEvent(this, 'config-changed', { config: ev.detail.value });
  }
}
