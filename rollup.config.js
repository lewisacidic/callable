import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const production = !(
  process.env.NODE_ENV === 'production' && process.env.ROLLUP_WATCH
)

export default [
  {
    input: 'src/index.js',
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      resolve({ jsnext: true, main: true, browser: true }),
      commonjs(),
      production && terser()
    ]
  },
  {
    input: 'src/index.js',
    output: [
      { file: pkg.module, format: 'es', sourcemap: true },
      { file: pkg.main, format: 'cjs', sourcemap: true }
    ],
    external: id => /^(@babel\/runtime|core-js)/.test(id),
    plugins: [
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      production && terser()
    ]
  }
]
