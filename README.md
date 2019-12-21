# google-home-assistant

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/nielsrowinbik/google-home-assistant)

Turn your Home Assistant interface into something that closely resembles the Google Home app using this set of custom Lovelace components.

## Usage

Install `google-home-assistant` as a `module`.

```yaml
resources:
    - url: /local/js/google-home-assistant.js
      type: module
```

Set up your `lovelace-ui.yaml` with a panel view, and wrap the `google-home-assistant` cards in a `vertical-stack-card`.

```yaml
views:
    - title: My Home
      icon: mdi:home-variant-outline
      path: home
      panel: true
      cards:
          - type: custom:google-home-menu
            title: My Home
            cards:
                - type: custom:google-home-menu-item
                  color: yellow
                  entity: group.all_lights
                  label: Lights
                  icon: mdi:lightbulb-outline
          - type: custom:google-home-grid
            title: Living Room
            cards:
                - type: custom:google-home-grid-item
                  entity: media_player.living_room_tv
                  icon: /local/icons/chromecast.svg
```

To get the full experience, somehow manage to include the Product Sans font through custom CSS. It's also possible to get the icons the Google Home app uses right from its APK. Upload them as images, and reference them in the `icon` field within `google-home-grid-item`. Finally, include a theme that closely resembles the Google Home app's colours.

## Cards

The module enables the following cards (click for their configuration options):

-   [`google-home-menu`](#google-home-menu-configuration-options)
-   [`google-home-menu-item`](#google-home-menu-item-configuration-options)
-   [`google-home-grid`](#google-home-grid-configuration-options)
-   [`google-home-grid-tem`](#google-home-grid-item-configuration-options)

### `google-home-menu` configuration options

| Name  | Type   | Requirement  | Description                                                      | Default |
| ----- | ------ | ------------ | ---------------------------------------------------------------- | ------- |
| type  | string | **Required** | `custom:google-home-menu`                                        |         |
| cards | list   | **Required** | List of cards to display. Best used with `google-home-menu-item` |         |
| title | string | Optional     | Title to display above the menu                                  | `""`    |

### `google-home-menu-item` configuration options

| Name   | Type   | Requirement  | Description                                                             | Default |
| ------ | ------ | ------------ | ----------------------------------------------------------------------- | ------- |
| type   | string | **Required** | `custom:google-home-menu-item`                                          |         |
| entity | string | **Required** | Home Assistant Entity ID                                                |         |
| icon   | string | **Required** | Reference to a Material Design icon (has to start with `mdi:`)          |         |
| color  | string | Optional     | `blue`, `cyan`, `green`, `indigo`, `purple`, `red`, `yellow`, or `none` | `none`  |
| name   | string | Optional     | Override the entity's friendly name                                     |         |

### `google-home-grid` configuration options

| Name  | Type   | Requirement  | Description                                                      | Default |
| ----- | ------ | ------------ | ---------------------------------------------------------------- | ------- |
| type  | string | **Required** | `custom:google-home-grid`                                        |         |
| cards | list   | **Required** | List of cards to display. Best used with `google-home-grid-item` |         |
| title | string | **Required** | Title to display above the grid                                  |         |

### `google-home-grid-item` configuration options

| Name    | Type   | Requirement  | Description                                                                    | Default |
| ------- | ------ | ------------ | ------------------------------------------------------------------------------ | ------- |
| type    | string | **Required** | `custom:google-home-grid-item`                                                 |         |
| entity  | string | **Required** | Home Assistant Entity ID                                                       |         |
| icon    | string | **Required** | Reference to a Material Design icon or an image                                |         |
| name    | string | Optional     | Override the entity's friendly name                                            |         |
| actions | list   | Optional     | List of actions to display below the grid item (options below), maximum of two |         |

Grid item action options:

| Name    | Type              | Requirement  | Description                                                                | Default |
| ------- | ----------------- | ------------ | -------------------------------------------------------------------------- | ------- |
| service | string            | **Required** | Service to call when the action is clicked                                 |         |
| label   | string            | **Required** | Text to display inside the action's button                                 |         |
| state   | string or boolean | Optional     | Only display the action when the grid item's entity has the provided state |         |
