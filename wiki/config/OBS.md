---
description: Connect OBS via WebSocket to automatically import SubathonManager overlay browser sources into your scenes
---

SubathonManager can connect to OBS via WebSocket to automatically import overlay browser sources directly into your scenes.


![obs-config](https://assets.subathonmanager.app/docs/config/setup/v1.2.3/obsconfig.png)

Click **Connect** after entering your connection details. The status will update to **Connected** once the connection is established.

| Field | Description |
|---|---|
| **Host** | The address OBS is running on. Choose `localhost` if OBS is on the same machine. |
| **Port** | The WebSocket port configured in OBS. Default `4455` |
| **Password** | The WebSocket password set in OBS, if any. Leave blank if no password is configured. |

!!! tip
    To find or configure these values in OBS, go to **Tools -> WebSocket Server Settings**.

## Importing Overlays

![obs-import](https://assets.subathonmanager.app/docs/config/setup/obsimport.png)

Once connected, overlays can be imported directly into OBS as browser sources from within SubathonManager. They will have a button only visible if OBS is connected.

When importing, you can:

- Rename the overlay source before adding it
- Choose which scene to import the browser source into
- Check **Scale to canvas size** to automatically fit the source to your OBS canvas

!!! warning
    Without the [Lua Script](#lua-script) installed, SubathonManager cannot set the blending method of an imported source. If an overlay requires a specific **SRGB Off**, you will need to set this manually in OBS after importing, or install the Lua Script for enhanced integration.

## Overlay Management

![obs-overlay-management](https://assets.subathonmanager.app/docs/config/setup/v1.2.3/obs_control.png)

Once OBS is connected, you can manage your imported overlays directly from the **Overlays** tab in SubathonManager. From there you can manage your overlay, such as toggle visibility, modify resolution, refresh it or toggle blending method.

These controls are only available while OBS is connected. Blending method control is only available with the Lua script.

## Lua Script

An additional Lua script can be imported into OBS to enable an enhanced connection between OBS and SubathonManager. This unlocks capabilities the WebSocket connection alone cannot provide - such as automatically setting the blending method to **SRGB Off** for overlays that require it.

With the Lua script installed, SubathonManager can apply these advanced source settings for you automatically when importing and managing overlays, removing the need to configure them manually in OBS.

You can copy the path to the lua script from inside SubathonManager under **Settings** > **External Software** > **OBS**.

!!! tip
    To install the script in OBS, go to **Tools -> Scripts**, click the **+** button, and select the SubathonManager Lua script file via path copied above.