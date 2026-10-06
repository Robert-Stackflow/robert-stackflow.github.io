/* Pure preference helpers shared by the browser and regression checks. */
const consolePreferences = (() => {
  const luminance = rgb => rgb.map(value => {
    const s = value / 255;
    return s <= .04045 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4;
  }).reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i], 0);
  return {
    colorEndpoint(value) {
      try {
        const url = new URL(value);
        // imageAve is specific to the site's public image host. Do not modify signed URLs.
        if (url.origin !== 'https://picbed.cloudchewie.com' || url.search || url.hash) return null;
        url.pathname = url.pathname.replace(/!(cover|blogimg|mini)$/, '');
        if (!/\.(jpe?g|png|webp)$/i.test(url.pathname)) return null;
        url.search = 'imageAve';
        return url.href;
      } catch { return null; }
    },
    parseColor(value) {
      if (typeof value !== 'string' || !/^(?:0x|#)[\da-f]{6}$/i.test(value)) return null;
      return value.replace(/^(0x|#)/i, '').match(/../g).map(n => parseInt(n, 16));
    },
    readableColor(rgb, dark) {
      let result = [...rgb];
      const background = dark ? luminance([23, 23, 23]) : 1;
      for (let i = 0; i < 80; i++) {
        const l = luminance(result);
        const contrast = (Math.max(l, background) + .05) / (Math.min(l, background) + .05);
        if (contrast >= 4.5 && (dark ? l > background : l < background)) break;
        result = result.map(v => Math.round(dark ? v + (255 - v) * .08 : v * .92));
      }
      return result;
    },
    luminance,
  };
})();
if (typeof module !== 'undefined') module.exports = consolePreferences;
