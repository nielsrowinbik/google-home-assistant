import { createThing, HomeAssistant, LovelaceCard } from 'custom-card-helpers';
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
import pluralize from 'pluralize';

import { GoogleHomeGridConfig } from '../types';
import { provideHass, subscribeTemplate } from '../util';

const KEYS_TO_TEMPLATE: string[] = [];

@customElement('google-home-grid')
export class GoogleHomeGrid extends LitElement {
    // Properties provided by configuration
    @property() public cards?: LovelaceCard[];
    @property() public counter_text?: string;
    @property() public disable_counter?: boolean;

    // Internal properties
    @property() private hass?: HomeAssistant;

    public setConfig = (config: GoogleHomeGridConfig) => {
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
    };

    protected render = (): TemplateResult | void => html`
        <div id="wrapper">
            <h2>${this.title}</h2>
            ${this._renderDeviceCounter()}
            <div class="grid">
                ${this._renderCards()}
            </div>
        </div>
    `;

    protected shouldUpdate = (changedProperties: PropertyValues) => {
        // Rerender if our config properties have changed (likely through template updates)
        if (
            changedProperties.has('cards') ||
            changedProperties.has('counter_text') ||
            changedProperties.has('disable_counter') ||
            changedProperties.has('title')
        )
            return true;

        // Do not rerender if anything else changes
        return false;
    };

    private _renderCards = (): TemplateResult => {
        const cards = this.cards?.map(card => createThing(card));

        return html`
            ${cards}
        `;
    };

    private _renderDeviceCounter = (): TemplateResult => {
        if (this.disable_counter === true) return html``;

        const count = pluralize(
            this.counter_text || 'device',
            this.cards?.length,
            true
        );

        return html`
            <h3>${count}</h3>
        `;
    };

    static get styles(): CSSResult {
        return css`
            :host {
                /* Override margin added by any of the stack cards this card may be used inside of */
                margin: 0 10px !important;
            }

            #wrapper {
                border-top: 1px solid #dadce0;
                margin: 0 auto;
                max-width: 960px;
                padding: 20px 0;
            }

            h2,
            h3 {
                font-family: 'Product Sans';
                text-align: center;
            }

            h2 {
                color: #131313;
                font-size: 1.4rem;
                font-weight: 500;
                margin: 0;
            }

            h3 {
                color: #616870;
                font-size: 0.95rem;
                font-weight: 400;
                margin: 6px 0 0;
            }

            h2:empty,
            h3:empty {
                display: none;
            }

            .grid {
                display: grid;
                grid-template-columns: repeat(2, minmax(1px, 250px));
                gap: 24px 20px;
                justify-content: center;
                padding: 14px 20px 0;
            }
        `;
    }
}
