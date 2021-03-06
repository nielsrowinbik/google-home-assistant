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
    'dark-green',
    'green',
    'indigo',
    'purple',
    'red',
    'yellow',
    'none',
];

export type Color = ValuesOf<typeof allowedColors>;

export interface GoogleHomeDetailSliderConfig {
    label?: string;
    value_attribute: string;
}

export interface GoogleHomeDetailConfig {
    entity: string;
    name?: string;
    subtitle?: string;
    slider?: GoogleHomeDetailSliderConfig;
}

export interface GoogleHomeMenuConfig {
    cards: LovelaceCardConfig[];
    title?: string;
}

export interface GoogleHomeSettingsConfig {
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
    service_data?: { [key: string]: any };
}

export interface GoogleHomeGridItemConfig {
    entity: string;
    actions?: GoogleHomeGridItemActionConfig[];
    group_size?: number;
    icon?: string;
    name?: string;
}
