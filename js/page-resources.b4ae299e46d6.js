/* Resources tied to the current PJAX page, rather than the browser session. */
window.pageResources = (() => {
  const disposers = new Set();
  return {
    add(dispose) { disposers.add(dispose); },
    frame(callback) {
      const dispose = () => window.cancelAnimationFrame(id);
      const id = window.requestAnimationFrame(() => { disposers.delete(dispose); callback(); });
      disposers.add(dispose);
      return id;
    },
    timeout(callback, delay) {
      const dispose = () => window.clearTimeout(id);
      const id = window.setTimeout(() => { disposers.delete(dispose); callback(); }, delay);
      disposers.add(dispose);
      return id;
    },
    interval(callback, delay) {
      const id = window.setInterval(callback, delay);
      disposers.add(() => window.clearInterval(id));
      return id;
    },
    listen(target, event, callback, options) {
      target.addEventListener(event, callback, options);
      disposers.add(() => target.removeEventListener(event, callback, options));
    },
    cleanup() {
      disposers.forEach(dispose => dispose());
      disposers.clear();
    },
    get size() { return disposers.size; },
  };
})();
document.addEventListener('pjax:send', () => window.pageResources.cleanup());
document.addEventListener('pjax:complete', () => {
  const payload = document.getElementById('page-seo-payload');
  if (!payload) return;
  const nodes = JSON.parse(payload.textContent);
  document.head.querySelectorAll('[data-page-seo]').forEach(node => node.remove());
  nodes.forEach(({ tag, attrs, text }) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([name, value]) => node.setAttribute(name, value));
    node.textContent = text;
    document.head.appendChild(node);
  });
});
