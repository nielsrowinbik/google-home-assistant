import { handleClick, HomeAssistant, computeDomain } from 'custom-card-helpers';
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

import {
    GoogleHomeGridItemConfig,
    GoogleHomeGridItemActionConfig,
} from '../types';
import { provideHass, subscribeTemplate } from '../util';

const KEYS_TO_TEMPLATE: string[] = ['animation', 'icon', 'name'];

@customElement('google-home-grid-item')
export class GoogleHomeGridItem extends LitElement {
    // Properties provided by configuration
    @property() public actions?: GoogleHomeGridItemActionConfig[];
    @property() public animation?: string;
    @property() public entity?: string;
    @property() public group_size?: number;
    @property() public icon?: string;
    @property() public name?: string;

    // Internal properties
    @property() private hass?: HomeAssistant;
    @property() private isGroup?: boolean;

    public setConfig = (config: GoogleHomeGridItemConfig) => {
        // Check if a configuration is provided at all
        if (!config) throw new Error('Invalid configuration');

        // Provide hass object if unset
        if (!this.hass) provideHass(this);

        // Set properties from config
        Object.keys(config).forEach(key => {
            const value = config[key];

            if (KEYS_TO_TEMPLATE.includes(key)) {
                if (!this.hass) throw new Error('Hass is undefined!');

                subscribeTemplate(this.hass?.connection, this, key, value);
                return;
            }

            this[key] = config[key];
        });

        // Set internal properties
        this.isGroup = computeDomain(config.entity) === 'group';
    };

    protected render = (): TemplateResult => {
        return html`
            <div id="wrapper">
                <button @click=${this._handleButtonClick} type="button">
                    ${this._renderIcon()} ${this._renderFriendlyName()}
                </button>
                <ul class="actions">
                    ${this._renderActionButtons()}
                </ul>
                ${this._renderBadge()}
            </div>
        `;
    };

    protected shouldUpdate = (changedProperties: PropertyValues) => {
        // Rerender if our config properties have changed (likely through template updates)
        if (
            changedProperties.has('actions') ||
            changedProperties.has('animation') ||
            changedProperties.has('entity') ||
            changedProperties.has('group_size') ||
            changedProperties.has('icon') ||
            changedProperties.has('name')
        )
            return true;

        // Rerender if the entity that was set by the user changes
        if (changedProperties.has('hass')) {
            const curEntity = this.hass?.states[this.entity!];
            const newHass = changedProperties.get('hass') as HomeAssistant;
            const newEntity = newHass?.states[this.entity!];

            if (curEntity !== newEntity) return true;
        }

        // Do not rerender if anything else changes
        return false;
    };

    private _handleActionButtonClick = (
        serviceString: string,
        serviceData?: { [key: string]: any }
    ) => {
        const [domain, service] = serviceString.split('.');

        return () =>
            this.hass?.callService(
                domain,
                service,
                serviceData || { entity_id: this.entity }
            );
    };

    private _handleButtonClick = () =>
        handleClick(
            this,
            this.hass!,
            {
                entity: this.entity,
                tap_action: { action: 'more-info' },
            },
            false,
            false
        );

    private _renderActionButtons = (): TemplateResult[] => {
        const entity = this.hass?.states[this.entity!];
        const actions =
            this.actions
                ?.filter(({ state }) => {
                    if (state === undefined) return true;
                    return entity?.state === state;
                })
                .slice(0, 2) || [];

        return actions.map(({ label, service, service_data }, i) => {
            const button = html`
                <button
                    @click=${this._handleActionButtonClick(
                        service,
                        service_data
                    )}
                    type="button"
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
        });
    };

    private _renderIcon = (): TemplateResult => {
        const entity = this.hass?.states[this.entity!];
        const icon = this.icon || entity?.attributes.icon;
        const isMdiIcon = icon?.startsWith('mdi:');

        if (isMdiIcon)
            return html`
                <ha-icon icon=${icon}></ha-icon>
            `;

        return html`
            <img src=${icon} />
        `;
    };

    private _renderBadge = (): TemplateResult => {
        if (this.group_size || this.isGroup) {
            const entity = this.hass?.states[this.entity!];
            const size = this.group_size || entity?.attributes.entity_id.length;

            return html`
                <span class="badge">${size}</span>
            `;
        }
        return html``;
    };

    private _renderFriendlyName = (): TemplateResult => {
        const entity = this.hass?.states[this.entity!];
        return html`
            <h4>
                ${this.name || entity?.attributes.friendly_name}
            </h4>
        `;
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

            #wrapper > button img,
            #wrapper > button svg {
                height: 100%;
                max-height: 50%;
                max-width: 70px;
                width: 100%;
            }

            #wrapper > button h4 {
                color: #131313;
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
                color: #4285f4;
                flex: 0;
                font-weight: 500;
                white-space: nowrap;
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
