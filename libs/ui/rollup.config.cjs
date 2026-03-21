const { withNx } = require('@nx/rollup/with-nx');
const url = require('@rollup/plugin-url');
const svg = require('@svgr/rollup');

const externalPackages = new Set([
  'react',
  'react-dom',
  'next',
  'next/link',
  'react/jsx-runtime',
  '@mantine/core',
  '@mantine/form',
  '@mantine/hooks',
  '@mantine/notifications',
]);

module.exports = withNx(
  {
    main: './src/index.ts',
    outputPath: './dist',
    tsConfig: './tsconfig.lib.json',
    compiler: 'babel',
    external: (id) =>
      externalPackages.has(id) ||
      id === 'react/jsx-dev-runtime' ||
      id.startsWith('@mantine/'),
    preserveModules: true,
    preserveModulesRoot: 'src',
    format: ['esm'],
    assets: [{ input: '.', output: '.', glob: 'README.md' }],
    treeshake: true,
    moduleSideEffects: false,
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
