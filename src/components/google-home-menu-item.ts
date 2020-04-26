import {
    handleClick,
    hasConfigOrEntityChanged,
    HomeAssistant,
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

import { ActionConfig, GoogleHomeMenuItemConfig } from '../types';
import { getDerivedStyles, provideHass, subscribeTemplate } from '../util';

const KEYS_TO_TEMPLATE: string[] = ['color', 'icon', 'name'];

@customElement('google-home-menu-item')
export class GoogleHomeMenuItem extends LitElement {
    // Properties provided by configuration
    @property() public color?: string;
    @property() public entity?: string;
    @property() public icon?: string;
    @property() public name?: string;
    @property() public tap_action?: ActionConfig;

    // Internal properties
    @property() private hass?: HomeAssistant;

    public setConfig = (config: GoogleHomeMenuItemConfig) => {
        // Check if a configuration is provided at all
        if (!config) throw new Error('Invalid configuration');

        // Provide hass object if unset
        if (!this.hass) provideHass(this);

        // Set properties from config
        Object.keys(config).forEach((key) => {
            const value = config[key];

            if (KEYS_TO_TEMPLATE.includes(key)) {
                if (!this.hass) throw new Error('Hass is undefined!');

                subscribeTemplate(this.hass?.connection, this, key, value);
                return;
            }

            this[key] = config[key];
        });
    };

    protected render = (): TemplateResult | void => {
        return html`
            <button
                @click=${this._handleButtonClick}
                data-color=${this.color}
                type="button"
            >
                ${this._renderIconWithDerivedStyles()}
                ${this._renderFriendlyName()}
            </button>
        `;
    };

    protected shouldUpdate = (changedProperties: PropertyValues) => {
        // Rerender if our config properties have changed (likely through template updates)
        if (
            changedProperties.has('color') ||
            changedProperties.has('entity') ||
            changedProperties.has('icon') ||
            changedProperties.has('name') ||
            changedProperties.has('tap_action')
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

    private _handleButtonClick = () =>
        handleClick(
            this,
            this.hass!,
            {
                entity: this.entity,
                tap_action: this.tap_action || { action: 'more-info' },
            },
            false,
            false
        );

    private _renderIconWithDerivedStyles = (): TemplateResult => {
        const derivedStyles = getDerivedStyles(this.color);
        const entity = this.hass?.states[this.entity!];
        const icon = this.icon || entity?.attributes.icon;

        return html` <ha-icon icon=${icon} style=${derivedStyles}></ha-icon> `;
    };

    private _renderFriendlyName = (): TemplateResult => {
        const entity = this.hass?.states[this.entity!];
        return html`
            <span>
                ${this.name || entity?.attributes.friendly_name}
            </span>
        `;
    };

    static get styles(): CSSResult {
        return css`
            button {
                align-items: center;
                background-color: transparent;
                border: none;
                cursor: pointer;
                display: flex;
                font-family: 'Product Sans';
                font-size: 0.9rem;
                flex-direction: column;
                height: 96px;
                justify-content: center;
                margin: 0 auto;
                outline: none;
                padding: 0;
                width: 96px;
            }

            ha-icon {
                border-radius: 100%;
                padding: 17px;
            }

            span {
                color: var(--secondary-text-color, #616870);
                margin-top: 6px;
            }
        `;
    }
}
