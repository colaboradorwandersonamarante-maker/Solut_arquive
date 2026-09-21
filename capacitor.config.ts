import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.solutarquive.app',
  appName: 'Solut_Arquive',
  webDir: 'dist',
  bundledWebRuntime: false,
  android: {
    backgroundColor: '#EFEAE0',
  },
  plugins: {
    Filesystem: {
      appendToFile: false,
    },
  },
};

export default config;
