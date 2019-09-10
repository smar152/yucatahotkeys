import path from 'path';
import webpack from 'webpack';
import {getPlugins, getEntryPoints, getOutputData, getRules} from './webpackHelper';

const environment = "PROD";

let config = {
    mode: 'development',
    devtool: 'none', // Source map settings - does not impact production as source maps are only downloaded when a user opens dev tools
    entry: getEntryPoints(environment),
    target: 'web', // You can use "node" or "electron" here
    output: getOutputData(environment),
    plugins: getPlugins(environment),
    module: {
        // This means we can import any of these files with the import keyword
        rules: getRules(environment)
    },
    optimization: {
        minimize: false
    }
};

export default config;
