import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
    input: ['src/google-home-assistant.ts'],
    output: {
        dir: './dist',
        format: 'es',
    },
    plugins: [
        commonjs(),
        resolve(),
        typescript(),
        babel({
            exclude: 'node_modules/**',
        }),
        terser(),
    ],
};
