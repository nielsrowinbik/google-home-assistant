import {
    handleClick,
    hasConfigOrEntityChanged,
    HomeAssistant,
    computeDomain,
} from 'custom-card-helpers';
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

    protected shouldUpdate = (changedProps: PropertyValues) =>
        hasConfigOrEntityChanged(this, changedProps, false);

    protected render = (): TemplateResult => {
        const entityId = this._config!.entity;
        const entity = this.hass?.states[entityId];
        const actions = this._config?.actions
            ? this._config?.actions
                  ?.filter(({ state }) => !state || entity?.state === state)
                  .slice(0, 2)
            : [];

        const icon = this._config?.icon || entity?.attributes.icon;
        const name = this._config?.name || entity?.attributes.friendly_name;

        const isMdiIcon = icon!.startsWith('mdi:');
        const isGroup = computeDomain(entityId) === 'group';

        return html`
            <div id="wrapper">
                <button @click=${this._handleButtonClick} type="button">
                    ${isMdiIcon
                        ? html`
                              <ha-icon icon=${icon}></ha-icon>
                          `
                        : html`
                              <img src=${icon} />
                          `}
                    <h4>
                        ${name}
                    </h4>
                </button>
                <ul class="actions">
                    ${actions.map(({ label, service }, i) => {
                        const button = html`
                            <button @click=${this._handleActionClick(service)}>
                                ${label}
                            </button>
                        `;
                        return i % 2 !== 0
                            ? html`
                                  <span></span>
                                  ${button}
                              `
                            : button;
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
        handleClick(this, this.hass!, this._config!, false, false);

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
                height: 4px;
                width: 4px;
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
