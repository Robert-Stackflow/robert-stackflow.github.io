/* OneSearch: untrusted results render as text and controlled marks. */
(() => {
  const PRE = '[onesearch-hit]', POST = '[/onesearch-hit]';
  function parts(value) {
    return String(value || '').split(/(\[onesearch-hit\]|\[\/onesearch-hit\])/).reduce((out, text) => {
      if (text === PRE) out.highlight = true;
      else if (text === POST) out.highlight = false;
      else if (text) out.items.push({ text, highlight: out.highlight });
      return out;
    }, { items: [], highlight: false }).items;
  }
  function articleUrl(value, base) {
    try {
      const url = new URL(value, base);
      return ['https:', 'http:'].includes(url.protocol) && url.origin === new URL(base).origin ? url.href : null;
    } catch { return null; }
  }
  function navigateResult(event, link, pjax, close) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank' || link.hasAttribute('download') || typeof pjax?.loadUrl !== 'function') return false;
    event.preventDefault(); event.stopPropagation(); close(true); pjax.loadUrl(link.href); return true;
  }
  // Reopening cancels the previous exit; stale timers cannot close a new dialog.
  function createMotion({ show, hide, leaving, reduced, schedule = setTimeout, cancel = clearTimeout }) {
    let timer, closing = false;
    const finish = () => {
      if (!closing) return;
      closing = false; cancel(timer); leaving(false); hide();
    };
    return {
      open() { cancel(timer); closing = false; leaving(false); show(); },
      close(immediate = false) {
        if (closing && !immediate) return;
        closing = true;
        if (immediate || reduced()) finish();
        else { leaving(true); timer = schedule(finish, 190); }
      }, finish
    };
  }
  if (typeof module !== 'undefined' && module.exports) { module.exports = { parts, articleUrl, createMotion, navigateResult }; return; }
  window.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('onesearch-search');
    if (!root) return;
    const dialog = root.querySelector('dialog'), input = root.querySelector('input');
    const results = document.getElementById('onesearch-results'), status = document.getElementById('onesearch-status');
    const pages = document.getElementById('onesearch-pagination'), info = document.getElementById('onesearch-page-info');
    const empty = document.getElementById('onesearch-empty'), clear = document.getElementById('onesearch-clear');
    const content = root.querySelector('.onesearch-content');
    let controller, timer, sequence = 0, page = 1, opener, composing = false, restoreBody;
    const appendText = (target, value) => {
      for (const item of parts(value)) {
        if (item.highlight) { const mark = document.createElement('mark'); mark.textContent = item.text; target.append(mark); }
        else target.append(document.createTextNode(item.text));
      }
    };
    const viewport = () => {
      dialog.style.setProperty('--onesearch-viewport', `${window.visualViewport?.height || window.innerHeight}px`);
      dialog.style.setProperty('--onesearch-offset', `${window.visualViewport?.offsetTop || 0}px`);
    };
    const motion = createMotion({
      reduced: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      leaving: value => dialog.classList.toggle('is-closing', value),
      show: () => {
        if (!dialog.open) {
          const previous = document.body.style.overflow;
          document.body.style.overflow = 'hidden'; restoreBody = () => { document.body.style.overflow = previous; };
          dialog.showModal(); window.visualViewport?.addEventListener('resize', viewport); window.visualViewport?.addEventListener('scroll', viewport);
        }
        viewport(); input.focus({ preventScroll: true });
      },
      hide: () => {
        dialog.close(); restoreBody?.(); restoreBody = null;
        window.visualViewport?.removeEventListener('resize', viewport); window.visualViewport?.removeEventListener('scroll', viewport);
        if (opener?.isConnected) opener.focus({ preventScroll: true });
      }
    });
    const state = (title, description, retry = false) => {
      empty.replaceChildren(); empty.hidden = false;
      const icon = document.createElement('i'), heading = document.createElement('h3'), text = document.createElement('p');
      icon.className = 'fas ' + (retry ? 'fa-exclamation-circle' : 'fa-search'); icon.setAttribute('aria-hidden', 'true');
      heading.textContent = title; text.textContent = description; empty.append(icon, heading, text);
      if (retry) {
        const button = document.createElement('button'); button.type = 'button'; button.textContent = '重新搜索';
        button.addEventListener('click', () => void search(page)); empty.append(button);
      } else if (!input.value.trim()) {
        const suggestions = document.createElement('div'); suggestions.className = 'onesearch-suggestions';
        for (const label of ['强化学习', '机器学习', '博客']) {
          const button = document.createElement('button'); button.type = 'button'; button.textContent = label;
          button.addEventListener('click', () => { input.value = label; input.focus(); void search(1); }); suggestions.append(button);
        }
        empty.append(suggestions);
      }
    };
    const invalidate = () => { clearTimeout(timer); controller?.abort(); sequence++; };
    async function search(nextPage = 1, focusPage = false) {
      invalidate(); const ticket = sequence, query = input.value.trim(); page = nextPage; clear.hidden = !input.value;
      results.replaceChildren(); pages.replaceChildren(); info.textContent = '站内文章搜索'; content.scrollTop = 0;
      dialog.classList.remove('is-loading'); results.setAttribute('aria-busy', 'false');
      if (!query) { status.textContent = '输入关键词搜索文章'; state('想找些什么？', '搜索文章标题、正文与标签。'); return; }
      const config = GLOBAL_CONFIG.oneSearch;
      if (!config?.endpoint || !config?.searchKey) { status.textContent = '搜索暂不可用'; state('搜索服务尚未配置', '请稍后再来。'); return; }
      controller = new AbortController(); empty.hidden = true;
      dialog.classList.add('is-loading'); results.setAttribute('aria-busy', 'true'); status.textContent = '正在搜索…';
      try {
        const response = await fetch(config.endpoint, {
          method: 'POST', credentials: 'omit', redirect: 'error', signal: controller.signal,
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + config.searchKey },
          body: JSON.stringify({ q: query, page, hitsPerPage: config.hitsPerPage || 6, attributesToRetrieve: ['id', 'title', 'url', 'content', 'date', 'tags'], attributesToHighlight: ['title', 'content'], attributesToCrop: ['content'], cropLength: 45, highlightPreTag: PRE, highlightPostTag: POST, showMatchesPosition: true })
        });
        if (!response.ok) throw new Error(response.status === 429 ? '搜索过于频繁，请稍后重试。' : '服务暂时不可用，请稍后重试。');
        const data = await response.json(); if (ticket !== sequence) return;
        for (const hit of data.hits || []) {
          const href = articleUrl(hit.url, config.siteUrl || location.href); if (!href) continue;
          const row = document.createElement('li'), link = document.createElement('a'), title = document.createElement('h3'), excerpt = document.createElement('p'), meta = document.createElement('span');
          // Validate canonical URLs, then keep mirrors on their own Blog host.
          const url = new URL(href); link.href = url.pathname + url.search + url.hash; link.className = 'onesearch-result';
          appendText(title, hit._formatted?.title ?? hit.title); appendText(excerpt, hit._formatted?.content ?? String(hit.content || '').slice(0, 180));
          const date = String(hit.date || '').slice(0, 10);
          meta.className = 'onesearch-result-meta'; meta.textContent = [date, ...(Array.isArray(hit.tags) ? hit.tags.slice(0, 2) : [])].filter(Boolean).join(' · ');
          link.append(title, excerpt); if (meta.textContent) link.append(meta); row.append(link); results.append(row);
        }
        status.textContent = data.totalHits ? `${data.totalHits} 篇文章 · ${data.processingTimeMs || 0} ms` : '没有找到匹配的文章';
        if (!results.children.length) state('没有找到相关内容', '试试更短的关键词，或换一种表达。');
        info.textContent = data.totalPages ? `第 ${page} / ${data.totalPages} 页` : '站内文章搜索';
        const button = (label, targetPage, disabled = false, selected = false) => {
          const el = document.createElement('button'); el.type = 'button'; el.textContent = label; el.disabled = disabled;
          if (selected) el.setAttribute('aria-current', 'page');
          el.addEventListener('click', () => void search(targetPage, true)); pages.append(el); return el;
        };
        let current;
        if (data.totalPages > 1) {
          button('上一页', page - 1, page <= 1);
          const start = Math.max(1, Math.min(page - 1, data.totalPages - 2)), end = Math.min(data.totalPages, start + 2);
          for (let n = start; n <= end; n++) { const el = button(String(n), n, false, n === page); if (n === page) current = el; }
          button('下一页', page + 1, page >= data.totalPages);
        }
        if (focusPage) current?.focus({ preventScroll: true });
      } catch (error) {
        if (error.name !== 'AbortError' && ticket === sequence) { status.textContent = '搜索未完成'; state('暂时无法搜索', error instanceof TypeError ? '请检查网络连接后重试。' : error.message, true); }
      } finally {
        if (ticket === sequence) { dialog.classList.remove('is-loading'); results.setAttribute('aria-busy', 'false'); }
      }
    }
    const close = (immediate = false) => { if (!dialog.open) return; invalidate(); motion.close(immediate); };
    // Capture dynamic result clicks before PJAX's per-anchor handlers can duplicate them.
    results.addEventListener('click', event => {
      const link = event.target.closest('a.onesearch-result');
      if (link && results.contains(link)) navigateResult(event, link, window.pjax, close);
    }, true);
    const open = event => {
      event.preventDefault(); opener = event.currentTarget instanceof HTMLElement ? event.currentTarget : document.activeElement;
      motion.open(); void search(input.value.trim() ? page : 1);
    };
    const bind = () => {
      const button = document.querySelector('#search-button > .search');
      if (button && !button.dataset.oneSearchBound) {
        button.tabIndex = 0; button.setAttribute('role', 'button'); button.setAttribute('aria-label', '搜索文章');
        button.addEventListener('click', open);
        button.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') open(event); });
        button.dataset.oneSearchBound = '1';
      }
    };
    const changed = () => { clear.hidden = !input.value; invalidate(); if (!composing) timer = setTimeout(() => void search(1), 250); };
    input.addEventListener('input', changed);
    input.addEventListener('compositionstart', () => { composing = true; invalidate(); });
    input.addEventListener('compositionend', () => { composing = false; changed(); });
    root.querySelector('form').addEventListener('submit', event => { event.preventDefault(); if (!composing) void search(1); });
    clear.addEventListener('click', () => { input.value = ''; input.focus(); void search(1); });
    root.querySelector('.search-close-button').addEventListener('click', () => close());
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return; const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
    });
    dialog.addEventListener('animationend', event => { if (event.target === dialog && dialog.classList.contains('is-closing')) motion.finish(); });
    dialog.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !event.isComposing) { event.preventDefault(); close(); return; }
      if (event.isComposing || !['ArrowDown', 'ArrowUp'].includes(event.key)) return;
      const links = [...results.querySelectorAll('a')]; if (!links.length) return;
      const current = links.indexOf(document.activeElement); if (document.activeElement !== input && current < 0) return;
      event.preventDefault(); const next = current + (event.key === 'ArrowDown' ? 1 : -1);
      if (next < 0) input.focus(); else links[Math.min(next, links.length - 1)].focus();
    });
    document.addEventListener('keydown', event => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') open(event); });
    document.addEventListener('pjax:send', () => close(true)); document.addEventListener('pjax:complete', bind); bind();
  });
})();
