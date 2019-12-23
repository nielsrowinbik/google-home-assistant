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

        if (!this.hass) provideHass(this);
        this._config = config;
    };

    protected shouldUpdate = (changedProps: PropertyValues) =>
        hasConfigOrEntityChanged(this, changedProps, false);

    protected render = (): TemplateResult | void => {
        const derivedStyles = getDerivedStyles(this._config?.color);
        const entityId = this._config!.entity;
        const entity = this.hass?.states[entityId];

        const icon = this._config?.icon || entity?.attributes.icon;
        const name = this._config?.name || entity?.attributes.friendly_name;

        return html`
            <button
                @click=${this._handleClick}
                data-color=${this._config?.color}
                type="button"
            >
                <ha-icon icon=${icon} style=${derivedStyles}></ha-icon>
                <span>${name}</span>
            </button>
        `;
    };

    private _handleClick = () =>
        handleClick(this, this.hass!, this._config!, false, false);

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
                color: #616870;
                margin-top: 6px;
            }
        `;
    }
}
