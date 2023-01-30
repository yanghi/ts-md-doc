import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import nodeResolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

const resolve = (p) => path.resolve(__dirname, p)

delete pkg.dependencies['markdown-table']
var external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]

export default {
  input: './lib/index.ts',
  output: {
    file: resolve(`dist/index.js`),
    format: 'cjs'
  },
  external,
  plugins:[
    ts({
      tsconfig: path.join(__dirname, 'tsconfig.json'),
      tsconfigOverride:{
        exclude: ["tests"]
      }
    }),
    commonjs(),
    nodeResolve()
  ]
}