import styles from "./style.module.css";
/**
 * @file
 * Entrypoint. Creates a non-module es5entry.js in your build.
 */
import { whenOdysseyLoaded } from '@abcnews/env-utils';
import {proxy} from '@abcnews/dev-proxy'

const updateDatawrapperUrls = () => {
  // Set correct mode for Datawrapper embeds, based on current background
  const datawrapperIframes = document.querySelectorAll(`[data-component="Iframe"] iframe[src*="datawrapper"]`);
  datawrapperIframes.forEach(el => {
    if (!(el instanceof HTMLIFrameElement)) {
      return;
    }
    const shouldBeDark = (el.closest<HTMLElement>('[data-scheme]')?.dataset.scheme ?? 'light') === 'dark';
    const desiredParam = `dark=${shouldBeDark}`;
    const paramPattern = /dark=\w+/;
    const desiredSrc = paramPattern.test(el.src)
      ? el.src.replace(paramPattern, desiredParam)
      : `${el.src}&${desiredParam}`;

    // Change the URL, if needed
    if (el.src !== desiredSrc) {
      el.src = desiredSrc;
    }
  });
}

Promise.all([proxy('us-election-2026'), whenOdysseyLoaded]).then(() => {
  const mainEl = document.querySelector('.Main.u-layout');
  if (!mainEl) return;
  
  mainEl.classList.add(styles.uselection2026);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.target instanceof HTMLElement && mutation.target.dataset.component === 'Iframe') {
        updateDatawrapperUrls();
      }
    })
  });

  observer.observe(mainEl, {subtree: true, childList: true})
});
