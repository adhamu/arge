const { build } = require('esbuild')

const options = {
  bundle: true,
  sourcemap: false,
  entryPoints: ['./src/index.ts'],
  external: Object.keys(require('./package.json').dependencies || {}),
  logLevel: 'info',
  minify: true,
  target: [require('./tsconfig.json').compilerOptions.target],
}

build({
  ...options,
  format: 'esm',
  outfile: './dist/index.esm.js',
})

build({
  ...options,
  format: 'cjs',
  outfile: './dist/index.js',
})
