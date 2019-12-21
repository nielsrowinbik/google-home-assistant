import { fireEvent, HomeAssistant, computeDomain } from 'custom-card-helpers';
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

        if (config && config.actions && config.actions.length > 2) {
            console.warn(
                'More than 2 actions specified. Only the first two will be rendered.'
            );
        }

        if (!this.hass) provideHass(this);
        this._config = config;
    };

    protected shouldUpdate = (changedProperties: PropertyValues) => {
        // TODO: Determine whether the entity that is being rendered has changed.
        const oldHass = changedProperties.get('hass');
        return true;
    };

    protected render = (): TemplateResult => {
        const actions = this._config?.actions
            ? this._config?.actions?.slice(0, 2)
            : [];
        const entityId = this._config!.entity;
        const entity = this.hass?.states[entityId];
        const isMdiIcon = this._config?.icon.startsWith('mdi:');
        const isGroup = computeDomain(entityId) === 'group';

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
                    ${actions.map(({ label, state, service }, i) => {
                        if (!state || entity?.state === state) {
                            const button = html`
                                <button
                                    @click=${this._handleActionClick(service)}
                                >
                                    ${label}
                                </button>
                            `;
                            if (i % 2 !== 0)
                                return html`
                                    <span></span>
                                    ${button}
                                `;
                            return button;
                        }
                        return html``;
                    })}
                </ul>
                <span class="badge"
                    >${isGroup
                        ? entity?.attributes.entity_id.length
                        : html``}</span
                >
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
                position: relative;
            }

            #wrapper > button img {
                height: 100%;
                max-height: 50%;
                max-width: 70px;
                width: 100%;
            }

            #wrapper > button h4 {
                color: #131313;
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
                height: 16px;
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
                font-size: 0.95rem;
                font-weight: 500;
            }

            .actions span {
                background-color: #dadce0;
                border-radius: 100%;
                height: 3px;
                width: 3px;
            }

            .badge {
                border: 1px solid #dadce0;
                border-radius: 100%;
                color: #131313;
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
