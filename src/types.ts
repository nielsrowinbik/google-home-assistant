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

export declare type Color =
    | 'blue'
    | 'cyan'
    | 'green'
    | 'indigo'
    | 'purple'
    | 'red'
    | 'yellow'
    | 'none';

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
}

export interface GoogleHomeGridItemActionConfig {
    label: string;
    state?: boolean | string;
    service: string;
}

export interface GoogleHomeGridItemConfig {
    entity: string;
    actions?: GoogleHomeGridItemActionConfig[];
    icon?: string;
    name?: string;
}
