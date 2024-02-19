# google-home-assistant

**Turn your Home Assistant interface into something that closely resembles the Google Home app using this set of custom Lovelace components.**

## Installation

### Manual

Install the latest `google-home-assistant` release by getting the compiled `google-home-assistant.js` file from [here](https://github.com/nielsrowinbik/google-home-assistant/releases/latest) and including it as a `module` in `ui-lovelace.yaml`:

```yaml
resources:
  - url: /local/js/google-home-assistant.js
    type: module
```

## Usage

Set up your dashboard with a centered vertical list of cards to get the best experience. You can use a `vertical-stack` card for this, or use the excellent [`lovelace-layout-card`](https://github.com/thomasloven/lovelace-layout-card) like I've done below.

```yaml
views:
  - path: home
    icon: mdi:home-assistant
    type: custom:vertical-layout
    badges: []
    cards:
      - square: false
        type: grid # TODO: Replace with (to be built) slider card
        cards:
          - type: custom:google-home-domain-card
            domain: light
            icon: mdi:lightbulb-outline
            name: Lighting
        columns: 3
      - square: false
        type: grid
        cards:
          - type: custom:google-home-entity-card
            entity: light.hallway_spots
          - type: custom:google-home-entity-card
            entity: media_player.amplifier
        columns: 2
```

All done! See below for each of the available [cards](#cards) and consider installing a theme that closely resembles the Google Home app to get the full experience.

![Google Home Asisstant](screenshots/google-home-assistant.jpg)
