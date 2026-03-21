const { withNx } = require('@nx/rollup/with-nx');
const url = require('@rollup/plugin-url');
const svg = require('@svgr/rollup');

module.exports = withNx(
  {
    main: './src/index.ts',
    outputPath: './dist',
    tsConfig: './tsconfig.lib.json',
    compiler: 'babel',
    external: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      '@mantine/core',
      '@mantine/form',
      '@mantine/hooks',
      '@mantine/notifications',
    ],
    preserveModules: true,
    format: ['esm'],
    assets: [{ input: '.', output: '.', glob: 'README.md' }],
    treeshake: {
      moduleSideEffects: false,
    },
  },
  {
    plugins: [
      svg({
        svgo: false,
        titleProp: true,
        ref: true,
      }),
      url({
        limit: 10000, // 10kB
      }),
    ],
  },
);
