import {
  type HomeAssistant,
  type LovelaceCardEditor,
} from 'custom-card-helpers';
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { DomainCardConfig } from './domain-card-config';
import {
  registerCustomCard,
  type RenderTemplateResult,
  subscribeRenderTemplate,
} from '../../util';
import {
  CARD_NAME,
  EDITOR_CARD_NAME,
  TEMPLATE_KEYS as TEMPLATE_KEYS,
} from './const';
import { styleMap } from 'lit/directives/style-map.js';
import type { UnsubscribeFunc } from 'home-assistant-js-websocket';

registerCustomCard({
  type: CARD_NAME,
  name: 'Google Home Domain Card',
  description: 'Card for all entities',
});

type TemplateKey = (typeof TEMPLATE_KEYS)[number];

@customElement(CARD_NAME)
export class DomainCard extends LitElement {
  @property() hass!: HomeAssistant;

  static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./domain-card-editor');
    return document.createElement(EDITOR_CARD_NAME) as LovelaceCardEditor;
  }

  static getStubConfig() {
    return {
      type: `custom:${CARD_NAME}`,
      domain: 'light', // TODO: Replace with color picker
      primary: 'Lighting',
      secondary:
        "{{ states.light|list|count }} {{ iif(states.light|list|count == 1, 'light', 'lights') }}",
      icon: 'mdi:lightbulb-outline',
    };
  }

  @state() private _config?: DomainCardConfig;

  @state() private _templateResults: Partial<
    Record<TemplateKey, RenderTemplateResult | undefined>
  > = {};

  @state() private _unsubRenderTemplates: Map<
    TemplateKey,
    Promise<UnsubscribeFunc>
  > = new Map();

  getCardSize(): number | Promise<number> {
    return 1;
  }

  setConfig(config: DomainCardConfig): void {
    TEMPLATE_KEYS.forEach((key) => {
      if (
        this._config?.[key] !== config[key] ||
        this._config?.domain != config.domain
      ) {
        this._tryDisconnectKey(key);
      }
    });

    this._config = config;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._tryConnect();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._tryDisconnect();
  }

  public isTemplate(key: TemplateKey) {
    const value = this._config?.[key];
    return value?.includes('{');
  }

  private getValue(key: TemplateKey) {
    return this.isTemplate(key)
      ? this._templateResults[key]?.result?.toString()
      : this._config?.[key];
  }

  protected render() {
    if (!this._config || !this.hass || !this._config.domain) {
      return nothing;
    }

    const primary = this.getValue('primary');
    const secondary = this.getValue('secondary');
    const icon = this.getValue('icon');

    return html`
      <div
        id="wrapper"
        style=${styleMap({
          ...getColors(this._config?.domain),
        })}
      >
        <ha-state-icon
          id="icon"
          .icon=${icon}
          .hass=${this.hass}
        ></ha-state-icon>
        <div id="info">
          <span class="primary">${primary}</span>
          <span class="secondary">${secondary}</span>
        </div>
      </div>
    `;
  }

  private async _tryConnect() {
    TEMPLATE_KEYS.forEach((key) => {
      this._tryConnectKey(key);
    });
  }

  private async _tryConnectKey(key: TemplateKey) {
    if (
      this._unsubRenderTemplates.get(key) !== undefined ||
      !this.hass ||
      !this._config ||
      !this.isTemplate(key)
    ) {
      return;
    }

    try {
      const sub = subscribeRenderTemplate(
        // @ts-ignore
        this.hass.connection,
        (result) => {
          this._templateResults = {
            ...this._templateResults,
            [key]: result,
          };
        },
        {
          template: this._config?.[key] ?? '',
          strict: true,
        }
      );
      this._unsubRenderTemplates.set(key, sub);
      await sub;
    } catch (error) {
      console.log(error);

      const result = {
        result: this._config[key] ?? '',
        listeners: {
          all: false,
          domains: [],
          entities: [],
          time: false,
        },
      };
      this._templateResults = {
        ...this._templateResults,
        [key]: result,
      };
      this._unsubRenderTemplates.delete(key);
    }
  }

  private async _tryDisconnect(): Promise<void> {
    TEMPLATE_KEYS.forEach((key) => {
      this._tryDisconnectKey(key);
    });
  }

  private async _tryDisconnectKey(key: TemplateKey): Promise<void> {
    const unsubRenderTemplate = this._unsubRenderTemplates.get(key);
    if (!unsubRenderTemplate) {
      return;
    }

    try {
      const unsub = await unsubRenderTemplate;
      unsub();
      this._unsubRenderTemplates.delete(key);
    } catch (err: any) {
      if (err.code === 'not_found' || err.code === 'template_error') {
        // If we get here, the connection was probably already closed. Ignore.
      } else {
        throw err;
      }
    }
  }

  static get styles() {
    return css`
      :host {
        width: 120px;
        aspect-ratio: 1 / 1;
      }

      #wrapper {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 16px;
        height: 100%;
        border-radius: 28px;
        align-items: flex-start;
        justify-content: space-between;
        position: relative;
        overflow: hidden;
      }

      #info {
        display: flex;
        flex-direction: column;
      }

      #info .primary {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
      }

      #info .secondary {
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
      }
    `;
  }
}

function getColors(domain: string) {
  switch (domain) {
    case 'camera':
      return { 'background-color': '#edf0ff' };

    case 'climate':
      return { 'background-color': '#ffede6' };

    case 'light':
      return { 'background-color': '#fcf0cd' };

    default:
      return { 'background-color': '#f3f6fb' };
  }
}
