import { HassEntity } from 'home-assistant-js-websocket';
import { hasConfigOrEntityChanged, HomeAssistant } from 'custom-card-helpers';
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

import { GoogleHomeDetailConfig } from '../types';
import { provideHass } from '../util';

@customElement('google-home-detail')
export class GoogleHomeDetail extends LitElement {
    @property() public hass?: HomeAssistant;
    @property() private _config?: GoogleHomeDetailConfig;

    public setConfig = (config: GoogleHomeDetailConfig) => {
        if (!config) throw new Error('Invalid configuration');

        if (!this.hass) provideHass(this);
        this._config = config;
    };

    protected shouldUpdate = (changedProps: PropertyValues) =>
        hasConfigOrEntityChanged(this, changedProps, false);

    protected render = (): TemplateResult | void => {
        const entityId = this._config!.entity;
        const entity = this.hass?.states[entityId];

        if (!entity) throw new Error('Provided entity does not exist!');

        return html`
            <div id="wrapper">
                <app-toolbar>
                    <paper-icon-button
                        icon="mdi:chevron-down"
                        dialog-dismiss=""
                    ></paper-icon-button>
                </app-toolbar>
                ${renderHeader(entity)} ${renderSlider(entity)}
            </div>
        `;
    };

    static get styles(): CSSResult {
        return css`
            @media (max-width: 450px) {
                #wrapper {
                    height: 100vh;
                }
            }

            #wrapper {
                display: flex;
                flex-direction: column;
                margin: 0 auto;
                max-width: 960px;
            }

            h1,
            h2 {
                font-family: 'Product Sans';
                font-weight: 400;
                text-align: center;
            }

            h1:empty,
            h2:empty {
                display: none;
            }

            h1 {
                color: #131313;
                font-size: 32px;
                margin: 20px 0;
            }

            h2 {
                color: #616870;
                font-size: 20px;
            }
        `;
    }
}

const getSubtitle = (entity: HassEntity): string => {
    const { attributes, entity_id, state } = entity;
    const { media_artist, media_title } = attributes;
    const domain = entity_id.split('.')[0];

    switch (domain) {
        case 'media_player':
            if (['paused', 'playing'].includes(state))
                return `${media_title} · ${media_artist}`;
            return 'Not playing';
        default:
            return '';
    }
};

const getValue = (entity: HassEntity) => {
    const { attributes, entity_id } = entity;
    const { brightness_pct, temperature, volume_level } = attributes;
    const domain = entity_id.split('.')[0];

    switch (domain) {
        case 'climate':
            return temperature || 0;
        case 'light':
            return brightness_pct || 0;
        case 'media_player':
            return volume_level ? Math.round(volume_level * 100) : 0;
        default:
            return 0;
    }
};

const renderHeader = (entity: HassEntity): TemplateResult => {
    const { attributes } = entity;
    const { friendly_name } = attributes;

    return html`
        <google-home-detail-header
            title=${friendly_name}
            subtitle=${getSubtitle(entity)}
        >
        </google-home-detail-header>
    `;
};

const renderSlider = (entity: HassEntity): TemplateResult => {
    const { entity_id } = entity;
    const domain = entity_id.split('.')[0];

    const value = getValue(entity);

    // TODO: Check if entity supports values set through a slider,
    // and don't render a slider if it doesn't

    switch (domain) {
        case 'climate':
            return html`
                <google-home-detail-slider value=${value}>
                </google-home-detail-slider>
            `;
        case 'media_player':
            return html`
                <google-home-detail-slider label="${value}%" value=${value}>
                </google-home-detail-slider>
            `;
        default:
            return html``;
    }
};
