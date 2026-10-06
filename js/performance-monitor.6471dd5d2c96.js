/* Local diagnostics only; no metrics are transmitted to an external service. */
(() => {
  if (!['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) return;
  const metrics = window.blogPerformance = {
    fcpMs: null, lcpMs: null, cls: 0, longTasks: 0, longTaskMs: 0,
    longestInteractionMs: null, pjaxNavigations: 0,
  };
  let sessionStart = 0, sessionEnd = 0, sessionScore = 0;
  const observe = (type, callback, extra = {}) => {
    if (!window.PerformanceObserver || !PerformanceObserver.supportedEntryTypes.includes(type)) return;
    new PerformanceObserver(list => list.getEntries().forEach(callback))
      .observe({ type, buffered: true, ...extra });
  };
  observe('paint', entry => {
    if (entry.name === 'first-contentful-paint') metrics.fcpMs = entry.startTime;
  });
  observe('largest-contentful-paint', entry => { metrics.lcpMs = entry.startTime; });
  observe('layout-shift', entry => {
    if (entry.hadRecentInput) return;
    if (entry.startTime - sessionEnd > 1000 || entry.startTime - sessionStart > 5000) {
      sessionStart = entry.startTime;
      sessionScore = 0;
    }
    sessionEnd = entry.startTime;
    sessionScore += entry.value;
    metrics.cls = Math.max(metrics.cls, sessionScore);
  });
  observe('longtask', entry => { metrics.longTasks++; metrics.longTaskMs += entry.duration; });
  // This is the longest observed interaction, not the percentile-based INP.
  observe('event', entry => {
    if (entry.interactionId) metrics.longestInteractionMs = Math.max(metrics.longestInteractionMs || 0, entry.duration);
  }, { durationThreshold: 16 });
  document.addEventListener('pjax:complete', () => metrics.pjaxNavigations++);

  const snapshot = () => {
    const navigation = performance.getEntriesByType('navigation')[0];
    return {
      ...metrics,
      ttfbMs: navigation ? navigation.responseStart - navigation.requestStart : null,
      domElements: document.querySelectorAll('*').length,
      resources: performance.getEntriesByType('resource').length,
      managedPageResources: window.pageResources ? window.pageResources.size : null,
    };
  };
  metrics.snapshot = snapshot;
  if (!new URLSearchParams(location.search).has('perf')) return;
  const panel = document.createElement('details');
  panel.open = true;
  panel.style.cssText = 'position:fixed;bottom:12px;left:12px;z-index:100000;background:#111e;color:#fff;padding:12px;border-radius:8px;font:12px/1.6 monospace;max-width:340px';
  const heading = document.createElement('summary');
  heading.textContent = '本地性能监测（本次文档加载）';
  const output = document.createElement('pre');
  output.style.cssText = 'margin:8px 0 0;background:transparent;color:inherit;white-space:pre-wrap';
  panel.append(heading, output);
  document.body.appendChild(panel);
  const format = value => value == null ? '等待数据' : `${Math.round(value)} ms`;
  const render = () => {
    const data = snapshot();
    output.textContent = [
      `FCP: ${format(data.fcpMs)}   LCP: ${format(data.lcpMs)}`,
      `CLS: ${data.cls.toFixed(3)}   TTFB: ${format(data.ttfbMs)}`,
      `长任务: ${data.longTasks} 次 / ${format(data.longTaskMs)}`,
      `最长已观测交互: ${format(data.longestInteractionMs)}（非 INP）`,
      `DOM: ${data.domElements}   请求: ${data.resources}`,
      `站内切页: ${data.pjaxNavigations}   页面资源: ${data.managedPageResources}`,
      '切页后指标继续累计；重新加载可开始新一轮。',
    ].join('\n');
  };
  render();
  window.setInterval(render, 1000);
})();
