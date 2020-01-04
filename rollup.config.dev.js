import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';

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
        serve({
            contentBase: './dist',
            host: '0.0.0.0',
            port: 5000,
            allowCrossOrigin: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        }),
    ],
};
