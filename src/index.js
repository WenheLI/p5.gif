/* Main Entry of Library */
import 'babel-polyfill';
import p5Gif from './components/p5Gif.js';
import GIFEncoder from 'gif-encoder';

p5Gif.GIFEncoder = GIFEncoder;
if (typeof window !== 'undefined') window.p5Gif = p5Gif;

module.exports = p5Gif;
