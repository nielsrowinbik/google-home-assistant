import { fireEvent, HomeAssistant } from 'custom-card-helpers';
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

import { GoogleHomeGridItemConfig } from '../types';
import { provideHass } from '../util';

@customElement('google-home-grid-item')
export class GoogleHomeGridItem extends LitElement {
    @property() public hass?: HomeAssistant;
    @property() private _config?: GoogleHomeGridItemConfig;

    public setConfig = (config: GoogleHomeGridItemConfig) => {
        // TODO: Evaluate configuration
        if (!config) throw new Error('Invalid configuration');

        if (!this.hass) provideHass(this);
        this._config = config;
    };

    protected shouldUpdate = (changedProperties: PropertyValues) => {
        // TODO: Determine whether the entity that is being rendered has changed.
        const oldHass = changedProperties.get('hass');
        return true;
    };

    protected render = (): TemplateResult => {
        const entity = this.hass?.states[this._config!.entity];
        const isMdiIcon = this._config?.icon.startsWith('mdi:');

        return html`
            <div id="wrapper">
                <button @click=${this._handleButtonClick} type="button">
                    ${isMdiIcon
                        ? html`
                              <ha-icon icon=${this._config?.icon}></ha-icon>
                          `
                        : html`
                              <img src=${this._config?.icon} />
                          `}
                    <h4>
                        ${this._config?.name ||
                            entity?.attributes.friendly_name}
                    </h4>
                </button>
                <ul class="actions">
                    ${this._config?.actions?.map(
                        ({ label, state, service }) => {
                            if (!state || entity?.state === state)
                                return html`
                                    <button
                                        @click=${this._handleActionClick(
                                            service
                                        )}
                                    >
                                        ${label}
                                    </button>
                                `;
                            return html``;
                        }
                    )}
                </ul>
            </div>
        `;
    };

    private _handleButtonClick = () =>
        fireEvent(
            this,
            'hass-more-info',
            {
                entityId: this._config!.entity,
            },
            {
                bubbles: true,
                cancelable: false,
                composed: true,
            }
        );

    private _handleActionClick = (serviceString: string) => {
        const entityId = this._config!.entity;
        const [domain, service] = serviceString.split('.');

        return () =>
            this.hass?.callService(domain, service, { entity_id: entityId });
    };

    static get styles(): CSSResult {
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
            }

            #wrapper > button img {
                height: 100%;
                max-height: 50%;
                max-width: 76px;
                width: 100%;
            }

            #wrapper > button h4 {
                font-family: 'Product Sans';
                font-size: 1.1rem;
                font-weight: 400;
                margin: 12px 0px 0px;
            }

            .actions {
                align-items: center;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                height: 22px;
                justify-content: space-around;
                list-style: none;
                max-width: 170px;
                margin: 12px auto 0px;
                padding: 0;
                width: 100%;
            }

            .actions button {
                color: #4285f4;
                flex: 0;
                font-size: 1.1rem;
                font-weight: 500;
            }
        `;
    }
}
