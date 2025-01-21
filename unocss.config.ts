import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetUno()],
  rules: [
    ['m-1', { margin: '1px' }], [/^fancy-(.*)$/, ([, c]) => ({ color: `${c}` })]
  ],
});