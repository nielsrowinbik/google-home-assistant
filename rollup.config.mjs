import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';

const serveOptions = {
  contentBase: './dist',
  host: '0.0.0.0',
  port: 3000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/google-home-assistant.ts',
  output: {
    dir: 'dist',
    format: 'es',
    inlineDynamicImports: true,
  },
  plugins: [
    typescript({ declaration: false }),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
    }),
    ...(dev ? [serve(serveOptions)] : [terser()]),
  ],
};
