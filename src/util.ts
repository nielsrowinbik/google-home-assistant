import { css } from 'lit-element';

import { Color } from './types';

export const getDerivedStyles = (color?: Color) => {
    switch (color) {
        case 'blue':
            return css`
                background-color: #e8f0fe;
                color: #4285f4;
            `;
        case 'cyan':
            return css`
                background-color: #e4f7fb;
                color: #12b5cb;
            `;
        case 'green':
            return css`
                background-color: #e6f4ea;
                color: #34a853;
            `;
        case 'indigo':
            return css`
                background-color: #e8eaf6;
                color: #3f51b5;
            `;
        case 'purple':
            return css`
                background-color: #f3e8fd;
                color: #ab47bc;
            `;
        case 'red':
            return css`
                background-color: #fce8e6;
                color: #ea4335;
            `;
        case 'yellow':
            return css`
                background-color: #fef7e0;
                color: #af5c00;
            `;
        case 'none':
        default:
            return css`
                color: #616161;
                border: 1px solid #dadce0;
            `;
    }
};

export const provideHass = (element: HTMLElement) =>
    // @ts-ignore
    document.querySelector('home-assistant')?.provideHass(element);
