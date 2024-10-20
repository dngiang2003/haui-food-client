import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

export default defineConfig({
  plugins: [pluginReact(), pluginSvgr({ mixedImport: true }), pluginSass()],
  source: {
    define: { process, _: {} },
    alias: {
      '~': './src',
    },
  },
  output: {
    distPath: {
      root: 'build',
    },
  },
  html: {
    template: './public/index.html',
  },
});
