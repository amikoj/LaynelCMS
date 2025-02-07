import { defineConfig, presetAttributify, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetAttributify(), presetUno()],
  // 可以添加其他预设和规则
});
