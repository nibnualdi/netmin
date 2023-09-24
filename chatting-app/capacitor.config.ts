import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.netmin.app',
  appName: 'Netmin',
  webDir: 'build',
  server: {
    url: 'https://netmin.netlify.app/',
    cleartext: true
    // androidScheme: 'https'
  }
};

export default config;
