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

@customElement('google-home-detail-header')
export class GoogleHomeDetailHeader extends LitElement {
    @property() public title: string;
    @property() public subtitle: string;

    public constructor() {
        super();
        this.title = '';
        this.subtitle = '';
    }

    protected render = (): TemplateResult | void => html`
        <div id="wrapper">
            <h1>
                ${this.title || ''}
            </h1>
            <h2>
                ${this.subtitle || ''}
            </h2>
        </div>
    `;

    static get styles(): CSSResult {
        return css`
            @media (max-width: 450px) {
                h1 {
                    font-size: 32px;
                }
            }

            #wrapper {
                margin: 0 auto;
                max-width: 80%;
            }

            h1,
            h2 {
                font-family: 'Product Sans';
                font-weight: 400;
                text-align: center;
            }

            h1 {
                color: #131313;
                font-size: 28px;
                margin: 20px 0;
            }

            h2 {
                color: #616870;
                font-size: 1.4rem;
                font-weight: 300;
                margin: 36px 0 0;
            }
        `;
    }
}
