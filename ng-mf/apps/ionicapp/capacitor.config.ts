import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionicapp',
  webDir: '../../dist/apps/ionicapp',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
