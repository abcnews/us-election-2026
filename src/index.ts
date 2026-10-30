import "./style.css";
/**
 * @file
 * Entrypoint. Creates a non-module es5entry.js in your build.
 */
import {  whenOdysseyLoaded } from '@abcnews/env-utils';
import {proxy} from '@abcnews/dev-proxy'

Promise.all([proxy('us-election-2026'), whenOdysseyLoaded]).then(() => {
  
});
