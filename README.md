# Next.js + Tailwind CSS + Ionic Framework + Capacitor Mobile Starter

![Screenshot](./screenshot.png)

_Note: this repo is in active development and not quite ready for production use!_

This repo is a starting point for building an iOS, Android, and Progressive Web App with Next.js, Tailwind CSS, Ionic Framework, and Capacitor.

Next.js handles the production React app experience, Tailwind can be used to style each page of your app, Ionic Framework provides the cross-platform system controls (navigation/transitions/tabs/etc.), and then Capacitor bundles all of it up and runs it on iOS, Android, and Web with full native access.

## Usage

Build your client side Next.js files

```bash
npm run build
npm run export
```

All the client side files will be sent to `./out/` directory, you can now run capacitor on iOS or Android:

```bash
# iOS
npx cap copy ios
npx cap open ios
```

```bash
# Android
npx cap copy android
npx cap open android
```

## What is Capacitor?

You can think of [Capacitor](https://capacitorjs.com/) as a sort of "electron for mobile" that runs standard web apps on iOS, Android, Desktop, and Web.

Capacitor provides access to Native APIs and a plugin system for building any native functionality your app needs.

Capacitor apps can also run in the browser as a Progressive Web App with the same code.
