import type { Connection } from 'home-assistant-js-websocket';
import { css } from 'lit';

import type { Color } from './types';

export const getDerivedStyles = (color?: Color) => {
  switch (color) {
    case 'blue':
      return css`
        background-color: #dbe2fc;
        color: #2355c8;
      `;
    case 'red':
      return css`
        background-color: #f9dccf;
        color: #9c4019;
      `;
    case 'yellow':
      return css`
        background-color: #fcf0cd;
        color: #6f5d1a;
      `;
    case 'none':
    default:
      return css`
        background-color: #f3f6fb;
        color: #1f1f1f;
      `;
  }
};

export function convertRange(
  value: number,
  r1: [number, number],
  r2: [number, number]
) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
}

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
