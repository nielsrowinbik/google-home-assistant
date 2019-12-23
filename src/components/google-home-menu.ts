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

@customElement('google-home-menu')
export class GoogleHomeMenu extends LitElement {
    @property() public hass?: HomeAssistant;
    @property() private _config?: GoogleHomeMenuConfig;
    @property() private _cards?: LovelaceCard[];

    public setConfig = (config: GoogleHomeMenuConfig) => {
        if (!config || !config.cards || !Array.isArray(config.cards))
            throw new Error('Invalid configuration');

        this._config = config;
        this._cards = config.cards.map(cardConfig => createThing(cardConfig));
    };

    protected shouldUpdate = (changedProperties: PropertyValues) =>
        changedProperties.has('_config');

    protected render = (): TemplateResult | void => html`
        <div id="wrapper">
            <h1>${this._config?.title}</h1>
            <div class="flex">
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
                margin: 0 auto;
                max-width: 960px;
            }

            h1 {
                color: #131313;
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
