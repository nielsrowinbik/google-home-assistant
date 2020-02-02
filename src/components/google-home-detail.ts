import { hasConfigOrEntityChanged, HomeAssistant } from 'custom-card-helpers';
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
import { getDerivedSubtitle, getDerivedValue, provideHass } from '../util';

@customElement('google-home-detail')
export class GoogleHomeDetail extends LitElement {
    @property() public hass?: HomeAssistant;
    @property() private _config?: GoogleHomeDetailConfig;

    public setConfig = (config: GoogleHomeDetailConfig) => {
        if (!config) throw new Error('Invalid configuration');

        if (!this.hass) provideHass(this);
        this._config = config;
    };

    protected shouldUpdate = (changedProps: PropertyValues) =>
        hasConfigOrEntityChanged(this, changedProps, false);

    protected render = (): TemplateResult | void => {
        const entityId = this._config!.entity;
        const entity = this.hass?.states[entityId];

        const slider = this._config?.slider;

        return html`
            <div id="wrapper">
                <app-toolbar>
                    <paper-icon-button
                        icon="mdi:chevron-down"
                        dialog-dismiss=""
                    ></paper-icon-button>
                </app-toolbar>
                <google-home-detail-header
                    title=${this._config?.name ||
                        entity?.attributes.friendly_name}
                    subtitle=${this._config?.subtitle ||
                        getDerivedSubtitle(entity!)}
                ></google-home-detail-header>
                ${slider
                    ? html`
                          <google-home-detail-slider
                              label=${getDerivedValue(entity!, '%')}
                              max="1"
                              min="0"
                              step="0.01"
                              value=${entity?.attributes[
                                  slider.value_attribute
                              ]}
                          ></google-home-detail-slider>
                      `
                    : html``}
            </div>
        `;
    };

    static get styles(): CSSResult {
        return css`
            @media (max-width: 450px) {
                #wrapper {
                    height: 100vh;
                }
            }

            #wrapper {
                display: flex;
                flex-direction: column;
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
