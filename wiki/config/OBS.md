SubathonManager can connect to OBS via WebSocket to automatically import overlay browser sources directly into your scenes.


![obs-config](https://assets.subathonmanager.app/docs/config/setup/obsconfig.png)

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
    SubathonManager cannot set the blending method of an imported source. If an overlay requires a specific **SRGB Off*, you will need to set this manually in OBS after importing.