import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { customElement, state, property } from 'lit/decorators.js'; // `.js` extension needed, see: https://github.com/material-components/material-web/issues/3395
import { html, nothing, LitElement } from 'lit';
import { EDITOR_CARD_NAME } from './const';
import { DomainCardConfig, domainCardConfigSchema } from './domain-card-config';
import type { HaFormSchema } from '../../shared/ha-form';

const SCHEMA: HaFormSchema[] = [
  {
    name: 'domain',
    selector: {
      select: { options: ['camera', 'climate', 'light'], mode: 'dropdown' },
    },
  },
  { name: 'primary', selector: { template: {} } },
  { name: 'secondary', selector: { template: {} } },
  { name: 'icon', selector: { template: {} } },
  { name: 'tap_action', selector: { 'ui-action': {} } },
  { name: 'hold_action', selector: { 'ui-action': {} } },
];

@customElement(EDITOR_CARD_NAME)
export class DomainCardEditor extends LitElement {
  @state() private _config?: DomainCardConfig;
  @property() private hass!: HomeAssistant;

  public setConfig(config: DomainCardConfig) {
    domainCardConfigSchema.parse(config);
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
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _computeLabel = (schema: any) => {
    return this.hass.localize(
      `ui.panel.lovelace.editor.card.generic.${schema.name}`
    );
  };

  private _valueChanged(ev: CustomEvent): void {
    fireEvent(this, 'config-changed', { config: ev.detail.value });
  }
}
