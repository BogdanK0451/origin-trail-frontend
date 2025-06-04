module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/eslint-config-typescript',
    //used this because of conficts between eslint rules and prettier formatting
    'plugin:prettier-vue/recommended',
    'plugin:vue/vue3-recommended',
  ],
  parser: 'vue-eslint-parser',
  settings: {
    'prettier-vue': {
      // Settings for how to process Vue SFC Blocks
      SFCBlocks: {
        /**
         * Use prettier to process `<template>` blocks or not
         *
         * If set to `false`, you may need to enable those vue rules that are disabled by `eslint-config-prettier`,
         * because you need them to lint `<template>` blocks
         *
         * @default true
         */
        template: false,

        /**
         * Use prettier to process `<script>` blocks or not
         *
         * If set to `false`, you may need to enable those rules that are disabled by `eslint-config-prettier`,
         * because you need them to lint `<script>` blocks
         *
         * @default true
         */
        script: true,

        /**
         * Use prettier to process `<style>` blocks or not
         *
         * @default true
         */
        style: true,

        // Settings for how to process custom blocks
        customBlocks: {
          // Treat the `<docs>` block as a `.markdown` file
          docs: { lang: 'markdown' },

          // Treat the `<config>` block as a `.json` file
          config: { lang: 'json' },

          // Treat the `<module>` block as a `.js` file
          module: { lang: 'js' },

          // Ignore `<comments>` block (omit it or set it to `false` to ignore the block)
          comments: false,

          // Other custom blocks that are not listed here will be ignored
        },
      },

      // Use prettierrc for prettier options or not (default: `true`)
      usePrettierrc: false,

      // Set the options for `prettier.getFileInfo`.
      // @see https://prettier.io/docs/en/api.html#prettiergetfileinfofilepath-options
      fileInfoOptions: {
        // Path to ignore file (default: `'.prettierignore'`)
        // Notice that the ignore file is only used for this plugin
        ignorePath: '.testignore',

        // Process the files in `node_modules` or not (default: `false`)
        withNodeModules: false,
      },
    },
  },
  plugins: ['@typescript-eslint', 'sonarjs', 'unicorn', 'import'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
  },
  //makes eslint aware of global variables defined in vite.config.ts
  globals: {
    VITE_APP_VERSION: true,
    VITE_GIT_COMMIT_DATE: true,
    VITE_GIT_BRANCH_NAME: true,
    VITE_GIT_COMMIT_HASH: true,
    VITE_GIT_LAST_COMMIT_MESSAGE: true,
  },
  ignorePatterns: ['commitlint.config.js', 'env.d.ts', 'JS2Shapefile.min.js'],
  rules: {
    'prettier-vue/prettier': [
      'error',
      {
        $schema: 'https://json.schemastore.org/prettierrc',
        semi: false,
        tabWidth: 2,
        singleQuote: true,
        printWidth: 140,
        trailingComma: 'all',
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'vue/require-name-property': 'error',
    'vue/require-explicit-emits': 'error',
    'vue/no-setup-props-destructure': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 3,
        },
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never',
      },
    ],
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignores: [],
      },
    ],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', { registeredComponentsOnly: true }],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/match-component-import-name': 'error',
    'vue/no-empty-component-block': 'error',
    'vue/no-multiple-objects-in-class': 'error',
    'vue/attribute-hyphenation': 'error',
    'vue/no-restricted-html-elements': [
      'error',
      {
        element: 'button',
        message: 'Prefer use of vuetify <v-btn/> component',
      },
    ],
    'vue/no-useless-v-bind': 'error',
    'vue/v-on-function-call': ['error', 'never', { ignoreIncludesComment: true }],
    'vue/eqeqeq': 'error',
    'vue/object-curly-spacing': 'error',
    'vue/array-bracket-spacing': 'error',
    'vue/no-constant-condition': 'error',
    'vue/comma-spacing': 'error',
    'vue/func-call-spacing': 'error',
    'vue/space-infix-ops': 'error',
    'vue/space-unary-ops': 'error',
    'vue/html-indent': 'error',
    'vue/prefer-template': 'error',
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],

    'sonarjs/cognitive-complexity': 'warn',
    'prefer-template': 'error',
    'no-useless-concat': 'error',
    'no-cond-assign': ['error', 'except-parens'],
    'init-declarations': ['error', 'always'],
    'array-bracket-spacing': 'error',
    'import/no-duplicates': 'error',
    'no-use-before-define': 'error',
    'no-self-compare': 'error',
    'no-lonely-if': 'error',
    'no-await-in-loop': 'warn',
    'operator-linebreak': 'error',
    curly: 'error',
    'no-else-return': 'error',
    'no-nested-ternary': 'warn',
    'no-var': 'error',
    'unicorn/no-for-loop': 'error',
    'unicorn/no-array-for-each': 'error',
    'unicorn/no-lonely-if': 'error',
    'unicorn/no-unnecessary-await': 'error',
    'unicorn/no-console-spaces': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/better-regex': 'error',
    'unicorn/no-array-push-push': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
