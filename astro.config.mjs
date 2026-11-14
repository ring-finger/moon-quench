// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// GitHub Pages 项目站（非用户主页仓库）需要设置 base 为 /仓库名/
// site 用于生成正确的绝对链接
export default defineConfig({
  site: 'https://ring-finger.github.io',
  base: '/moon-quench/',
});
