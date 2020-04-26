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

import { GoogleHomeMenuConfig } from '../types';
import { provideHass, subscribeTemplate } from '../util';

const KEYS_TO_TEMPLATE: string[] = [];

@customElement('google-home-menu')
export class GoogleHomeMenu extends LitElement {
    // Properties provided by configuration
    @property() public cards?: LovelaceCard[];

    // Internal properties
    @property() private hass?: HomeAssistant;

    public setConfig = (config: GoogleHomeMenuConfig) => {
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

    protected render = (): TemplateResult | void => html`
        <div id="wrapper">
            <h1>${this.title}</h1>
            <div class="flex">
                ${this._renderCards()}
            </div>
        </div>
    `;

    protected shouldUpdate = (changedProperties: PropertyValues) => {
        // Rerender if our config properties have changed (likely through template updates)
        if (changedProperties.has('cards') || changedProperties.has('title'))
            return true;

        // Do not rerender if anything else changes
        return false;
    };

    private _renderCards = (): TemplateResult => {
        const cards = this.cards?.map((card) => createThing(card));

        return html` ${cards} `;
    };

    static get styles(): CSSResult {
        return css`
            :host {
                /* Override margin added by any of the stack cards this card may be used inside of */
                margin: 0 10px !important;
            }

            #wrapper {
                margin: 0 auto;
                max-width: 960px;
            }

            h1 {
                color: var(--primary-text-color, #131313);
                font-family: 'Product Sans';
                font-size: 32px;
                font-weight: 400;
                margin: 20px 0;
                text-align: center;
            }

            h1:empty {
                display: none;
            }

            .flex {
                align-items: center;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                margin: 20px 0;
            }
        `;
    }
}
