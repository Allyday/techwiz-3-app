import 'dotenv/config';

module.exports = {
  expo: {
    name: 'FPT Aptech Hanoi - Gao Rangers',
    slug: 'smart-study',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './src/assets/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#483f97',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      requireFullScreen: true,
    },
    android: {
      package: 'com.gaorangers.smartstudy',
      versionCode: 10,
      adaptiveIcon: {
        foregroundImage: './src/assets/adaptive-icon.png',
        backgroundColor: '#483f97',
      },
      googleServicesFile: './google-services.json',
    },
    jsEngine: 'hermes',
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
};
