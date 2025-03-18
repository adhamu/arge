const { build } = require('esbuild')

const package = require('./package.json')
const tsconfig = require('./tsconfig.json')

const options = {
  bundle: true,
  sourcemap: false,
  entryPoints: ['./src/index.ts'],
  external: Object.keys(package.dependencies || {}),
  logLevel: 'info',
  minify: true,
  target: [tsconfig.compilerOptions.target],
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
