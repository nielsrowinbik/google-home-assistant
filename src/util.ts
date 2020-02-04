import { Connection, HassEntity } from 'home-assistant-js-websocket';
import { css } from 'lit-element';

import { Color } from './types';

export const getPopupConfigs = (object: any, result: object = {}) => {
    if (
        object.hasOwnProperty('type') &&
        (object['type'] === 'custom:google-home-grid-item' ||
            object['type'] === 'custom:google-home-menu-item') &&
        object.hasOwnProperty('detail')
    )
        result[object.entity] = object.detail;

    const keys = Object.keys(object);
    for (var i = 0; i < keys.length; i++) {
        if (typeof object[keys[i]] === 'object') {
            result = getPopupConfigs(object[keys[i]], result);
        }
    }

    return result;
};

export const getDerivedStyles = (color?: Color) => {
    switch (color) {
        case 'blue':
            return css`
                background-color: #e8f0fe;
                border: 1px solid #e8f0fe;
                color: #4285f4;
            `;
        case 'cyan':
            return css`
                background-color: #e4f7fb;
                border: 1px solid #e4f7fb;
                color: #12b5cb;
            `;
        case 'dark-green':
            return css`
                background-color: #dff1f0;
                border: 1px solid #dff1f0;
                color: #00887a;
            `;
        case 'green':
            return css`
                background-color: #e6f4ea;
                border: 1px solid #e6f4ea;
                color: #34a853;
            `;
        case 'indigo':
            return css`
                background-color: #e8eaf6;
                border: 1px solid #e8eaf6;
                color: #3f51b5;
            `;
        case 'purple':
            return css`
                background-color: #f3e8fd;
                border: 1px solid #f3e8fd;
                color: #ab47bc;
            `;
        case 'red':
            return css`
                background-color: #fce8e6;
                border: 1px solid #fce8e6;
                color: #ea4335;
            `;
        case 'yellow':
            return css`
                background-color: #fef7e0;
                border: 1px solid #fef7e0;
                color: #af5c00;
            `;
        case 'none':
        default:
            return css`
                color: #5f6268;
                border: 1px solid #acb1b7;
            `;
    }
};

export const getDerivedSubtitle = (entity: HassEntity): string => {
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

export const getDerivedValue = (entity: HassEntity, suffix?: string) => {
    const { attributes, entity_id } = entity;
    const { volume_level } = attributes;
    const domain = entity_id.split('.')[0];

    switch (domain) {
        case 'media_player':
            const value = volume_level ? Math.round(volume_level * 100) : 0;
            return suffix ? `${value}${suffix}` : value;
        default:
            return suffix ? `0${suffix}` : 0;
    }
};

export const getLovelace = () => {
    const root = document
        .querySelector('home-assistant')
        ?.shadowRoot?.querySelector('home-assistant-main')
        ?.shadowRoot?.querySelector(
            'app-drawer-layout partial-panel-resolver ha-panel-lovelace'
        )
        ?.shadowRoot?.querySelector('hui-root');
    // @ts-ignore
    return root?.lovelace;
};

export const subscribeTemplate = (
    connection: Connection,
    component: any,
    field: string,
    template: string
) =>
    connection.subscribeMessage(
        ({ result }: any) => {
            component[field] = result;
        },
        {
            type: 'render_template',
            template,
        }
    );

export const provideHass = (element: HTMLElement) =>
    // @ts-ignore
    document.querySelector('home-assistant')?.provideHass(element);
