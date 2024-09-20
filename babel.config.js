module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["module:metro-react-native-babel-preset", { "useTransformReactJSXExperimental": true }],
      'babel-preset-expo',
      '@babel/preset-typescript', // Ensures Babel can handle TypeScript files
    ],
    plugins: [
      // Add any necessary Babel plugins here, if needed
    ],
  };
};
