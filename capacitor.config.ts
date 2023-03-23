import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.travel.tales.app',
  appName: 'Travel-Tales',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.1.123:3000',
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
  cordova: {},
};

export default config;
