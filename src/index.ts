import styles from "./style.module.css";
/**
 * @file
 * Entrypoint. Creates a non-module es5entry.js in your build.
 */
import {  whenOdysseyLoaded } from '@abcnews/env-utils';
import {proxy} from '@abcnews/dev-proxy'

Promise.all([proxy('us-election-2026'), whenOdysseyLoaded]).then(() => {
  document.querySelector('.Main.u-layout')?.classList.add(styles.uselection2026);
});
