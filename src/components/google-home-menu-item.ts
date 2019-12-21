import {
    ActionHandlerEvent,
    fireEvent,
    handleAction,
    hasAction,
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

import { GoogleHomeMenuItemConfig } from '../types';
import { getDerivedStyles, provideHass } from '../util';

@customElement('google-home-menu-item')
export class GoogleHomeMenuItem extends LitElement {
    @property() public hass?: HomeAssistant;
    @property() private _config?: GoogleHomeMenuItemConfig;

    public setConfig = (config: GoogleHomeMenuItemConfig) => {
        // TODO: Evaluate configuration
        if (!config) throw new Error('Invalid configuration');

        if (!config.entity)
            throw new Error(
                `Invalid configuration: field \`entity\`is required`
            );

        if (!config.icon)
            throw new Error(`Invalid configuration: field \`icon\`is required`);

        if (!this.hass) provideHass(this);
        this._config = config;
    };

    protected shouldUpdate = (changedProperties: PropertyValues) => {
        // TODO: Determine whether the entity that is being rendered has changed.
        const oldHass = changedProperties.get('hass');
        return true;
    };

    protected render = (): TemplateResult | void => {
        const derivedStyles = getDerivedStyles(this._config?.color);

        return html`
            <button
                @click=${this._handleClick}
                data-color=${this._config?.color}
                type="button"
            >
                <ha-icon
                    icon=${this._config?.icon}
                    style=${derivedStyles}
                ></ha-icon>
                <span
                    >${this._config?.name ||
                        this.hass?.states[this._config?.entity as string]
                            .attributes.friendly_name}</span
                >
            </button>
        `;
    };

    private _handleClick = () =>
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
                height: 90px;
                justify-content: center;
                margin: 0 auto;
                outline: none;
                padding: 0;
                width: 90px;
            }

            ha-icon {
                border-radius: 100%;
                padding: 17px;
            }

            span {
                color: #616870;
                margin-top: 6px;
            }
        `;
    }
}
