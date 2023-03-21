# Unleash Browser Extension (unleash-bex)

Unleash browser extension. Easily see notifications and feature toggles on your browser.

Currently supports [Unleash Enterprise v4.22](https://www.getunleash.io/plans) or above.

https://user-images.githubusercontent.com/14320932/223819417-413a5877-6754-46ce-9f90-4c5dd96c99f0.mp4

## Getting Started

### 🎁 Install

This extension should be compatible with Chrome, Firefox and other Chromium-based browsers.

You can access the latest build in [Releases](https://github.com/nunogois/unleash-bex/releases). Simply download the ZIP file and extract it somewhere in your computer.

After downloading the latest build, you can install it in Chrome by following these steps:

1. In Chrome, navigate to `chrome://extensions`.
2. Toggle "Developer Mode".
3. Click “Load unpacked”. This will present you with the folder selection dialog. Navigate to and select the extension folder.
4. You should now see the extension in Chrome.

For Firefox, you can follow these steps:

1. In Firefox, navigate to `about:debugging`.
2. Click on "This Firefox".
3. Click “Load Temporary Add-on…”. This will present you with the file selection dialog. Navigate to and select the `manifest.json` file inside the extension folder.
4. You should now see the extension in Firefox.

For other browsers, we recommend following the appropriate browser documentation on how to add a browser extension to that particular browser.

### 🔧 Settings

After installing the extension, click it to open. Since this is your first time using the extension, you won't have access to most features and instead you'll be redirected to the settings page.

![image](https://user-images.githubusercontent.com/14320932/223826518-18d6c33c-015f-4c91-b5c2-46d758127037.png)

You should enter your Unleash instance URL on the first field.

If you're already logged in in that instance, this should be enough. The browser extension should be able to use the same Unleash session cookie that was set when you logged in.

However, if you'd like to have access at all times, even when your session expires or you log out, we suggest setting a token in the second field. Unleash [PATs](https://docs.getunleash.io/how-to/how-to-create-personal-access-tokens) are great for this use case. No matter the token you set, the session cookie will always take precedence.

You can also change the notification refresh interval, setting a value (in seconds) of how often to check for new notifications.

## ✨ Features

### 🔔 Notifications

![image](https://user-images.githubusercontent.com/14320932/223823787-2431608d-e745-4f08-8d89-077f2012740d.png)

Access your Unleash notifications from your browser's toolbar. Notifications will be fetched from Unleash on the interval you set when configuring the extension. By clicking any of them, you'll get redirected to the respective page in your Unleash instance.

The extension will also show the total unread notifications in a badge, so you can easily see if there are any new notifications:

![image](https://user-images.githubusercontent.com/14320932/223823966-d727e26e-4963-4dc5-9ab2-08b3afeea55e.png)

**Note**: We highly suggest pinning the extension to the toolbar:

![image](https://user-images.githubusercontent.com/14320932/223823488-c5b1caa7-1296-4fc8-990e-333e9ccd5296.png)

### 🚦 Toggles

![image](https://user-images.githubusercontent.com/14320932/223824801-81419f62-5253-4bff-a7e0-a391b9d90eec.png)

Control your feature toggles and quickly toggle a feature on or off. You can select the project and environment on the top right. By clicking any of the feature toggle names, you'll get redirected to the respetive page in your Unleash instance.

The [change requests](https://docs.getunleash.io/reference/change-requests) feature is currently not supported on this browser extension. In case you try to toggle a feature on a project that has change requests enabled for an environment, you'll see a tooltip with more information:

![image](https://user-images.githubusercontent.com/14320932/223825564-1aecc9e1-d768-48dd-b242-576cc45e0d24.png)

### 👀 Tooltips

<img width="519" alt="image" src="https://user-images.githubusercontent.com/14320932/226730558-1f33ff8f-aae5-42bf-87f0-982692d7a187.png">

Improve interactivity whenever you encounter a link to your Unleash instance while browsing. Easily see the current state of a feature toggle for a specific environment and toggle it right from the tooltip.

**Note**: Currently only links to feature toggles are supported.

## 👨‍💻 Development

Built using [Quasar Framework](https://quasar.dev/) ([Vue.js](https://vuejs.org/) 3) [BEX mode](https://quasar.dev/quasar-cli-vite/developing-browser-extensions/introduction).

Also uses [Pinia](https://pinia.vuejs.org/) and [Axios](https://axios-http.com/).

You can read more about how to use the Unleash API by following the [official docs](https://docs.getunleash.io/).
