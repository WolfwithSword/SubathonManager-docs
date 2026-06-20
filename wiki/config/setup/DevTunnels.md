---
description: Set up Microsoft Azure DevTunnels to receive webhook events from Ko-Fi, FourthWall, and Throne in SubathonManager
---

# Dev Tunnels

Dev Tunnels allow your app to receive webhook events from external services like Ko-Fi, FourthWall, and Throne by exposing a local endpoint to the internet via Microsoft's Azure DevTunnels service.

The tunnel will start automatically on launch if any service that requires it is already configured. For first-time setup, follow the steps below.

![configuration](https://assets.subathonmanager.app/docs/config/setup/devtunnels.png)

---

## Step 1: Install the DevTunnels CLI

In the **External Services** dropdown of the settings page, go to the **Dev Tunnels** tab, and check the **CLI Status** field.

- If it shows **Not installed**, click **Install** to download the Azure DevTunnels CLI from Microsoft. You will be prompted with a link to download and install if it is not able to automatically install.
- Once installation is complete, click **Check** to confirm it was found successfully.
- If it does not find it after installing, try restarting SubathonManager.

!!! note
    The CLI is a small command-line tool installed by the app on your behalf. You do not need to interact with it directly.

---

## Step 2: Sign in

Once the CLI is installed, sign in with either a **Microsoft** or **GitHub** account using the buttons provided.

Clicking either button will open a browser tab. Complete the sign-in flow there - the **Login Status** field will update automatically once you are authenticated.

!!! tip
    Either account type works the same. Use whichever you already have.

---

## Step 3: Start the tunnel

After signing in, click **Start** next to the Tunnel field to start the tunnel for the first time.

The app will display a base URL once the tunnel is running. You can ignore this.

When other services hook into the DevTunnel setup, they will append their own path to the base url. See examples below.

| Service | Webhook path |
|---|---|
| Ko-Fi | `/api/webhooks/kofi` |
| FourthWall | `/api/webhooks/fourthwall` |
| Throne | `/api/webhooks/throne` |

!!! info "Automatic startup"
    After the first manual start, the tunnel will launch automatically on app startup whenever Ko-Fi, FourthWall, Throne, or other integration which requires it is configured.

If your DevTunnel has issues starting, you can try deleting old tunnels after signed in if it has stopped running.

!!! info "Upgrading from v1.2.0 & below"
    If upgrading from v1.2.0 and below, you will need to re-setup all of your DevTunnel integrations (except FourthWall) due to a data change.
