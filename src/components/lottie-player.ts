import {
    css,
    CSSResult,
    customElement,
    html,
    LitElement,
    property,
    PropertyValues,
} from 'lit-element';
import lottie from 'lottie-web';

@customElement('lottie-player')
export class LottiePlayer extends LitElement {
    @property() src?: string;
    @property() container?: Element | null;

    protected firstUpdated = () => {
        this.container = this.shadowRoot!.getElementById('lottie');
    };

    protected render = () =>
        html`
            <div id="lottie"></div>
        `;

    protected shouldUpdate = (changedProps: PropertyValues) =>
        changedProps.has('src');

    protected updated = () => this._load();

    private _load = () => {
        // TODO: Ugly hack, change this
        this.container!.innerHTML = '';
        return lottie.loadAnimation({
            container: this.container!,
            loop: true,
            autoplay: true,
            path: this.src || '',
        });
    };

    static get styles(): CSSResult {
        return css`
            :host {
                height: 100%;
                display: block;
                margin: 0 auto;
                max-height: 50%;
                max-width: 70px;
                width: 100%;
            }

            div {
                display: block;
                height: 100%;
                width: 100%;
                max-height: 50%;
                max-width: 70px;
            }
        `;
    }
}
