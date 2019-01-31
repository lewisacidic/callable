import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

import pkg from './package.json'

const production = !(
  process.env.NODE_ENV === 'production' && process.env.ROLLUP_WATCH
)

const args = {
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
    production && uglify()
  ]
}

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'Callable',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      resolve(),
      commonjs(),
      production && uglify()
    ]
  },
  {
    output: { file: pkg.module, format: 'es', sourcemap: true },
    ...args
  },
  {
    output: { file: pkg.main, format: 'cjs', sourcemap: true },
    ...args
  }
]
