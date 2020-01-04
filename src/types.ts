import {
    LovelaceCardConfig,
    MoreInfoActionConfig,
    NavigateActionConfig,
    NoActionConfig,
    UrlActionConfig,
} from 'custom-card-helpers';

export declare type ActionConfig =
    | MoreInfoActionConfig
    | NavigateActionConfig
    | NoActionConfig
    | UrlActionConfig;

type ValuesOf<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
    infer ElementType
>
    ? ElementType
    : never;

export const allowedColors = [
    'blue',
    'cyan',
    'green',
    'indigo',
    'purple',
    'red',
    'yellow',
    'none',
];

export type Color = ValuesOf<typeof allowedColors>;

export interface GoogleHomeMenuConfig {
    cards: LovelaceCardConfig[];
    title?: string;
}

export interface GoogleHomeMenuItemConfig {
    entity: string;
    icon: string;
    color?: Color;
    name?: string;
    tap_action?: ActionConfig;
}

export interface GoogleHomeGridConfig {
    cards: LovelaceCardConfig[];
    title: string;
    counter_text?: string;
    disable_counter?: boolean;
}

export interface GoogleHomeGridItemActionConfig {
    label: string;
    state?: boolean | string;
    service: string;
}

export interface GoogleHomeGridItemConfig {
    entity: string;
    actions?: GoogleHomeGridItemActionConfig[];
    animation?: string;
    group_size?: number;
    icon?: string;
    name?: string;
}
