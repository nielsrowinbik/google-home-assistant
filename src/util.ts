import type { Connection } from 'home-assistant-js-websocket';
import { css } from 'lit-element';

import type { Color } from './types';

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

export function registerCustomCard(params: {
  type: string;
  name: string;
  description: string;
}) {
  const windowWithCards = window as unknown as Window & {
    customCards: unknown[];
  };
  windowWithCards.customCards = windowWithCards.customCards || [];

  windowWithCards.customCards.push({
    ...params,
    preview: false,
  });
}
