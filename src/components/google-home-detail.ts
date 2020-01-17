import { HomeAssistant } from 'custom-card-helpers';
import {
    css,
    CSSResult,
    customElement,
    html,
    LitElement,
    property,
    TemplateResult,
    PropertyValues,
} from 'lit-element';

import { GoogleHomeDetailConfig } from '../types';
import { provideHass } from '../util';

@customElement('google-home-detail')
export class GoogleHomeDetail extends LitElement {
    @property() public hass?: HomeAssistant;
    @property() private _config?: GoogleHomeDetailConfig;

    public setConfig = (config: GoogleHomeDetailConfig) => {
        if (!config) throw new Error('Invalid configuration');

        if (!this.hass) provideHass(this);
        this._config = config;
    };

    protected shouldUpdate = (changedProperties: PropertyValues) =>
        changedProperties.has('_config');

    protected render = (): TemplateResult | void => {
        const entityId = this._config!.entity;
        const entity = this.hass?.states[entityId];

        return html`
            <div id="wrapper">
                <app-toolbar>
                    <paper-icon-button
                        icon="mdi:chevron-down"
                        dialog-dismiss=""
                    ></paper-icon-button>
                </app-toolbar>
                <h1>
                    ${this._config?.name || entity?.attributes.friendly_name}
                </h1>
                <h2>
                    ${this._config?.subname}
                </h2>
                <google-home-detail-slider
                    value="30"
                ></google-home-detail-slider>
            </div>
        `;
    };

    static get styles(): CSSResult {
        return css`
            #wrapper {
                margin: 0 auto;
                max-width: 960px;
            }

            h1,
            h2 {
                font-family: 'Product Sans';
                font-weight: 400;
                text-align: center;
            }

            h1:empty,
            h2:empty {
                display: none;
            }

            h1 {
                color: #131313;
                font-size: 32px;
                margin: 20px 0;
            }

            h2 {
                color: #616870;
                font-size: 20px;
            }
        `;
    }
}
