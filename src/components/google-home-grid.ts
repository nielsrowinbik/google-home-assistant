import 'card-tools/src/card-maker';

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

import { GoogleHomeGridConfig } from '../types';

@customElement('google-home-grid')
export class GoogleHomeGrid extends LitElement {
    @property() public hass?: HomeAssistant;
    @property() private _config?: GoogleHomeGridConfig;
    @property() private _cards?: LovelaceCard[];

    public setConfig = (config: GoogleHomeGridConfig) => {
        if (!config || !config.cards || !Array.isArray(config.cards))
            throw new Error('Invalid configuration');

        this._config = config;
        this._cards = config.cards.map(cardConfig => createThing(cardConfig));
    };

    protected shouldUpdate = (changedProperties: PropertyValues) =>
        changedProperties.has('_config');

    protected render = (): TemplateResult | void => html`
        <div id="wrapper">
            <h2>${this._config?.title}</h2>
            <h3>
                ${this._cards?.length}
                ${this._cards?.length === 1 ? 'device' : 'devices'}
            </h3>
            <div class="grid">
                ${this._cards}
            </div>
        </div>
    `;

    static get styles(): CSSResult {
        return css`
            :host {
                /* Override margin added by any of the stack cards this card may be used inside of */
                margin: 0 10px !important;
            }

            #wrapper {
                border-top: 1px solid var(--divider-color, #dadce0);
                margin: 0 auto;
                max-width: 960px;
                padding: 20px 0;
            }

            h2,
            h3 {
                font-family: 'Product Sans';
                margin: 6px 0 0;
                text-align: center;
            }

            h2 {
                font-size: 1.4rem;
                font-weight: 500;
            }

            h3 {
                color: var(--secondary-text-color);
                font-size: 0.9rem;
                font-weight: 400;
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
                padding: 20px 20px 0;
            }
        `;
    }
}
