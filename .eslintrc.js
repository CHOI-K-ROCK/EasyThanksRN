module.exports = {
    root: true,
    extends: ['@react-native', 'prettier', 'plugin:prettier/recommended'],
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
        'prettier/prettier': 'warn',
        'react-native/no-inline-styles': 'off',
    },
};
