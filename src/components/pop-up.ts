import { createThing } from 'custom-card-helpers';

import { getLovelace } from '../util';

const init = () => {
    const lovelace = getLovelace();
    const { gha } = lovelace.config;

    if (gha?.override_more_info === true) {
        document
            .querySelector('home-assistant')!
            .addEventListener('hass-more-info', handler);
    }
};

const handler = (e: any) => {
    const moreInfoEl =
        // @ts-ignore
        document.querySelector('home-assistant')?._moreInfoEl;

    // @ts-ignore
    if (!e.detail || !e.detail.entityId) {
        moreInfoEl.shadowRoot.querySelector('google-home-detail')?.remove();
        return;
    }

    const entity = e.detail.entityId;
    const card = createThing({
        type: 'custom:google-home-detail',
        entity,
    });

    moreInfoEl.shadowRoot.querySelector('more-info-controls')?.remove();
    moreInfoEl.shadowRoot.appendChild(card);
};

init();
