// eslint.config.js 

import js from '@eslint/js' // 推荐校验js规范
import prettierRecommended from 'eslint-plugin-prettier/recommended' // 推荐校验prettier
import pluginVue from 'eslint-plugin-vue' // 推荐校验vue规范
import { defineConfig } from 'eslint/config'
import globals from 'globals' // 全局变量
import tseslint from 'typescript-eslint' // 推荐校验ts规范

export default defineConfig([
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts,vue,jsx,tsx}'], // 校验src下的各种文件类型
    plugins: { js }, // 引入js规则
    extends: ['js/recommended'], // 继承js规则
    languageOptions: {
      // 指定环境
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  tseslint.configs.recommended, // 继承ts规则
  pluginVue.configs['flat/essential'], // 继承vue规则
  {
    files: ['**/*.vue'], // 校验vue文件
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    ignores: ['dist/**', 'node_modules/**'] // 忽略文件
  },
  {
    rules: {
      'no-console': 'off', // 禁止使用console
      'no-debugger': 'warn' // 禁止使用debugger
    }
  },
  prettierRecommended // 会覆盖eslint的规则
])