const consoleFn = {
  /**
   * 打开/关闭功能
   */
  toggleConsole: () => {
    document.getElementById('console')?.classList.contains('show') ? consoleFn.closeConsole() : consoleFn.showConsole();
  },
  showConsole: () => {
    const panel = document.getElementById('console');
    if (!panel || panel.classList.contains('show')) return;
    consoleFn.returnFocus = document.activeElement;
    panel.inert = false;
    panel.setAttribute('aria-hidden', 'false');
    panel.classList.add('show');
    document.body.classList.add('modal-open');
    consoleFn.selectSettingsTab(consoleFn.settingsTab || 'theme');
    document.getElementById('console-close')?.focus({ preventScroll: true });
  },
  closeConsole: (restoreFocus = true) => {
    const panel = document.getElementById('console');
    if (!panel) return;
    panel.classList.remove('show');
    panel.setAttribute('aria-hidden', 'true');
    panel.inert = true;
    document.body.classList.remove('modal-open');
    if (restoreFocus && consoleFn.returnFocus?.isConnected) consoleFn.returnFocus.focus({ preventScroll: true });
    consoleFn.returnFocus = null;
  },
  selectSettingsTab: key => {
    if (!['theme', 'accent', 'background', 'aplayer'].includes(key)) return;
    consoleFn.settingsTab = key;
    document.querySelectorAll('#console [data-settings-tab]').forEach(tab => {
      const selected = tab.dataset.settingsTab === key;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    document.querySelectorAll('#console [role="tabpanel"]').forEach(panel => {
      panel.hidden = panel.id !== key + '-settings';
      if (!panel.hidden && document.getElementById('console')?.classList.contains('show')) {
        panel.querySelectorAll('[data-preview]').forEach(el => {
          el.style.backgroundImage = 'url("' + el.dataset.preview + '")';
          el.removeAttribute('data-preview');
        });
      }
    });
    const content = document.querySelector('#console .console-settings-content');
    if (content) content.scrollTop = 0;
  },
  /**
   * 加载设置
   */
  // 加载设置
  loadSetting: () => {
    const panel = document.getElementById('console');
    if (!panel) return;
    consoleFn.controller?.abort();
    consoleFn.controller = new AbortController();
    const { signal } = consoleFn.controller;
    const listen = (target, type, fn) => target?.addEventListener(type, fn, { signal });
    const tabs = [...panel.querySelectorAll('[data-settings-tab]')];
    tabs.forEach((tab, index) => {
      listen(tab, 'click', () => consoleFn.selectSettingsTab(tab.dataset.settingsTab));
      listen(tab, 'keydown', event => {
        let next;
        if (event.key === 'ArrowDown') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        consoleFn.selectSettingsTab(tabs[next].dataset.settingsTab);
        tabs[next].focus();
      });
    });
    consoleFn.selectSettingsTab(consoleFn.settingsTab || 'theme');
    panel.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
    panel.querySelectorAll('button[title]').forEach(el => el.setAttribute('aria-label', el.title));
    document.getElementById('con-toggleAutoColor').checked = utilsFn.getLocalStorage('enableAutoColor') === 'true';
    consoleFn.changeAutoColor();
    //固定导航栏
    if (utilsFn.getLocalStorage("enableFixedNav") == undefined) {
      utilsFn.setLocalStorage("enableFixedNav", "false");
    }
    if (utilsFn.getLocalStorage("enableFixedNav") == "false") {
      $("#page-header").removeClass("nav-fixed nav-visible");
      $("#name-container").hide();
    } else {
      $("#name-container").show();
      $("#page-header").addClass("nav-fixed nav-visible");
      document.getElementById("con-toggleFixedNav").checked = true;
    }
    //侧栏居右
    if (utilsFn.getLocalStorage("asideRight") == undefined) {
      utilsFn.setLocalStorage("asideRight", "true");
    }
    if (utilsFn.getLocalStorage("asideRight") == "false") {
      document.documentElement.setAttribute("aside-position", "left");
    } else {
      document.documentElement.setAttribute("aside-position", "right");
      document.getElementById("con-toggleAsidePosition").checked = true;
    }
    //加载是否打开右键菜单功能
    if (utilsFn.getLocalStorage("enableContextMenu") == undefined) {
      utilsFn.setLocalStorage("enableContextMenu", "true");
    }
    if (utilsFn.getLocalStorage("enableContextMenu") == "true") {
      $("#con-rightmouse").addClass("checked");
      cloudchewieFn.bindContextMenu(true, false);
    } else {
      $("#con-rightmouse").removeClass("checked");
      cloudchewieFn.bindContextMenu(false, false);
    }
    //加载是否打开APlayer
    if (utilsFn.getLocalStorage("enableAPlayer") == undefined) {
      utilsFn.setLocalStorage("enableAPlayer", "true");
    }
    const navMusic = $("#nav-music");
    if (navMusic != null && navMusic.find("meting-js") != null) {
      const navMetingAplayer = navMusic.find("meting-js").aplayer;
      if (utilsFn.getLocalStorage("enableAPlayer") == "true") {
        $("#con-music").show();
        $("#menuMusic").show();
        if (!utilsFn.isMusic()) {
          navMusic.show();
          document.getElementById("nav-music").classList.remove("hidden");
        } else {
          navMusic.hide();
          document.getElementById("nav-music").classList.add("hidden");
        }
        $(".music-wrapper .aplayer").show();
        if (document.getElementById("con-toggleAPlayer"))
          document.getElementById("con-toggleAPlayer").checked = true;
      } else {
        navMusic.hide();
        document.getElementById("nav-music").classList.add("hidden");
        $("#con-music").hide();
        $("#menuMusic").hide();
        $(".music-wrapper .aplayer").show();
        if (navMetingAplayer) {
          navMetingAplayer.pause();
        }
      }
    }
    document.documentElement.dataset.rightside = utilsFn.getLocalStorage("enableRightSide") === "false" ? "hidden" : "visible";
    //加载是否显示侧边按钮
    if (utilsFn.getLocalStorage("enableRightSide") == undefined) {
      utilsFn.setLocalStorage("enableRightSide", "true");
    }
    if (utilsFn.getLocalStorage("enableRightSide") == "false") {
      $("#rightside").hide();
    } else {
      $("#rightside").show();
      document.getElementById("con-toggleRightSide").checked = true;
    }
    // 加载网页背景
    try {
      let data = utilsFn.getLocalStorage("blogBackground", 1440);
      if (data) consoleFn.changeBackground(data, 1);
      else consoleFn.setDefaultBackground();
    } catch (error) {
      utilsFn.removeLocalStorage("blogBackground");
    }
    consoleFn.syncSystemTheme();
    listen(window.matchMedia('(prefers-color-scheme: dark)'), 'change', consoleFn.syncSystemTheme);
    //加载繁星效果
    if (utilsFn.getLocalStorage("enableStarBackground") == undefined) {
      utilsFn.setLocalStorage("enableStarBackground", "true");
    }
    if (utilsFn.getLocalStorage("enableStarBackground") == "true") {
      $("#universe").show();
      document.getElementById("con-toggleStarBackground").checked = true;
    } else {
      $("#universe").hide();
      document.getElementById("con-toggleStarBackground").checked = false;
    }
    //加载噪点效果
    if (utilsFn.getLocalStorage("enableNoise") == undefined) {
      utilsFn.setLocalStorage("enableNoise", "false");
    }
    if (utilsFn.getLocalStorage("enableNoise") == "true") {
      document.getElementById("con-toggleNoise").checked = true;
      $("#noiseStyle").html(noiseCSS);
    } else {
      document.getElementById("con-toggleNoise").checked = false;
      $("#noiseStyle").html("");
    }
    //加载快捷键
    if (utilsFn.getLocalStorage("enableShortcut") == undefined) {
      utilsFn.setLocalStorage("enableShortcut", "false");
    }
    if (utilsFn.getLocalStorage("enableShortcut") == "true") {
      $("#con-shortcut").addClass("checked");
    } else {
      $("#con-shortcut").removeClass("checked");
    }
    cloudchewieFn.executeShortcutKeyFunction();
    //加载播放列表
    const playlist = utilsFn.getLocalStorage('playlist');
    if (playlist && playlist !== consoleFn.appliedPlaylist) {
      try {
        const json = JSON.parse(playlist);
        if (json.id && json.server) consoleFn.changeAPlayerList(json.id, json.server, false, false);
        consoleFn.appliedPlaylist = playlist;
      } catch { utilsFn.removeLocalStorage('playlist'); }
    }
    consoleFn.loadCustomPlaylists();
    listen(document.getElementById('console-mask'), 'click', () => consoleFn.closeConsole());
    listen(document.getElementById('console-button'), 'click', consoleFn.showConsole);
    listen(document, 'fullscreenchange', () => {
      document.getElementById('con-fullscreen')?.classList.toggle('checked', !!document.fullscreenElement);
    });
    listen(document, 'keydown', event => {
      if (event.key === 'Escape') {
        if (panel.classList.contains('show')) { event.preventDefault(); consoleFn.closeConsole(); }
        else if (cloudchewieFn.isReadMode) { event.preventDefault(); cloudchewieFn.exitReadMode(); }
      }
      if (event.key !== 'Tab' || !panel.classList.contains('show')) return;
      const controls = [...panel.querySelectorAll('button, input, a[href], [tabindex="0"]')].filter(el => !el.disabled && el.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) { event.preventDefault(); first?.focus(); }
    });
    if (saveToLocal.get("enableAside") == "hide") {
      $("#con-toggleaside").addClass("checked");
      document.querySelector(".menu-toggleAside-text").textContent =
        "切换为双栏";
    } else {
      $("#con-toggleaside").removeClass("checked");
      document.querySelector(".menu-toggleAside-text").textContent =
        "切换为单栏";
    }
    const nowMode =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    if (nowMode === "light") {
      document.querySelector(".menu-toggleDarkMode-text").textContent =
        "深色模式";
      $("#darkmode-button").attr("title", "切换为深色模式");
      $("#con-mode").attr("title", "切换为深色模式");
    } else {
      document.querySelector(".menu-toggleDarkMode-text").textContent =
        "浅色模式";
      $("#darkmode-button").attr("title", "切换为浅色模式");
      $("#con-mode").attr("title", "切换为浅色模式");
    }
    consoleFn.themeObserver?.disconnect();
    consoleFn.themeObserver = new MutationObserver(() => consoleFn.changeAutoColor());
    consoleFn.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  },
  /**
   * 重置设置
   */
  resetSettings: () => {
    utilsFn.removeLocalStorage('themeAccent');
    utilsFn.removeLocalStorage("blogBackground");
    utilsFn.removeLocalStorage("enableStarBackground");
    utilsFn.removeLocalStorage("isLeftAside");
    utilsFn.removeLocalStorage("asideRight");
    utilsFn.removeLocalStorage("enableShortcut");
    utilsFn.removeLocalStorage("enableRightSide");
    utilsFn.removeLocalStorage("enableAutoTheme");
    utilsFn.removeLocalStorage("enableFixedNav");
    utilsFn.removeLocalStorage("enableAutoColor");
    utilsFn.removeLocalStorage("enableContextMenu");
    utilsFn.removeLocalStorage("enableAPlayer");
    utilsFn.removeLocalStorage("enableNoise");
    utilsFn.removeLocalStorage("enableFPS");
    window.location.reload();
  },
  /**
   * 重置为默认背景
   */
  setDefaultBackground: () => {
    ++consoleFn.backgroundRequest;
    utilsFn.removeLocalStorage('blogBackground');
    const bg = document.getElementById('web_bg');
    if (bg) bg.style.cssText = consoleFn.defaultBackgroundStyle || '';
    document.querySelector('.parallax > use:nth-child(4)')?.style.removeProperty('fill');
    consoleFn.markBackground('');
  },
  backgroundRequest: 0,
  markBackground: value => {
    document.querySelectorAll('#background-settings button').forEach(el => {
      const selected = el.dataset.background === value;
      el.setAttribute('aria-pressed', String(!!selected));
    });
    document.getElementById('background-settings')?.removeAttribute('aria-busy');
  },
  changeBackground: async (value, restoring = false) => {
    const bg = document.getElementById('web_bg');
    if (!bg || typeof value !== 'string' || !CSS.supports('background', value)) return;
    consoleFn.defaultBackgroundStyle ??= bg.style.cssText;
    const request = ++consoleFn.backgroundRequest;
    const match = value.match(/^url\(["']?(.*?)["']?\)$/);
    if (match) {
      let url;
      try { url = new URL(match[1], location.href); } catch { return; }
      if (!['https:', 'http:'].includes(url.protocol)) return;
      document.getElementById('background-settings')?.setAttribute('aria-busy', 'true');
      try {
        await new Promise((resolve, reject) => {
          const image = new Image();
          const timeout = setTimeout(() => { image.onload = image.onerror = null; reject(new Error('timeout')); }, 10000);
          image.onload = () => { clearTimeout(timeout); resolve(); };
          image.onerror = () => { clearTimeout(timeout); reject(new Error('image')); };
          image.src = url.href;
        });
      } catch {
        if (request === consoleFn.backgroundRequest) {
          document.getElementById('background-settings')?.removeAttribute('aria-busy');
          if (!restoring) utilsFn.snack('背景图片加载失败，请重试');
        }
        return;
      }
    }
    if (request !== consoleFn.backgroundRequest) return;
    bg.style.background = value;
    bg.style.backgroundSize = 'cover';
    bg.style.backgroundPosition = 'center';
    bg.style.backgroundRepeat = 'no-repeat';
    const wave = document.querySelector('.parallax > use:nth-child(4)');
    if (wave) { wave.style.removeProperty('fill'); if (value.startsWith('#')) wave.style.fill = value; }
    if (!restoring) utilsFn.setLocalStorage('blogBackground', value);
    consoleFn.markBackground(value);
  },
  /**
   * 设置默认主题色
   */
  setDefaultThemeColor: () => {
    const style = document.getElementById("themeColor");
    if (style) style.textContent = "";
    const saved = utilsFn.getLocalStorage('themeAccent');
    const rgb = consolePreferences.parseColor(saved);
    if (style && rgb) consoleFn.setThemeColor(...consolePreferences.readableColor(rgb, document.documentElement.dataset.theme === 'dark'));
    document.querySelectorAll('#accent-settings [data-accent]').forEach(el => {
      el.setAttribute('aria-pressed', String(el.dataset.accent === (rgb ? saved : '')));
    });
  },
  selectThemeColor: value => {
    if (value !== '' && !consolePreferences.parseColor(value)) return;
    if (value) utilsFn.setLocalStorage('themeAccent', value);
    else utilsFn.removeLocalStorage('themeAccent');
    utilsFn.setLocalStorage('enableAutoColor', 'false');
    const toggle = document.getElementById('con-toggleAutoColor');
    if (toggle) toggle.checked = false;
    consoleFn.changeAutoColor();
  },
  /**
   * 设置主题色
   */
  setThemeColor: (r, g, b) => {
    document.getElementById(
      "themeColor"
    ).innerText = `:root{--cloudchewie-theme:rgb(${r}, ${g}, ${b})!important;--btn-bg:rgb(${r}, ${g}, ${b})!important;--btn-color:${document.documentElement.dataset.theme === 'dark' ? '#111' : '#fff'}!important;--btn-hover-color:rgba(${r}, ${g}, ${b},0.8)!important;--text-bg-hover:rgba(${r}, ${g}, ${b},0.5)!important;--km-toc-active:rgba(${r}, ${g}, ${b},0.8)!important;--km-toc-hover:rgba(${r}, ${g}, ${b},0.6)!important;}`;
  },
  /**
   * 打开/关闭繁星效果
   */
  toggleStarBackground: () => {
    if (utilsFn.getLocalStorage("enableStarBackground") == "true") {
      utilsFn.setLocalStorage("enableStarBackground", "false");
      $("#universe").hide();
    } else {
      utilsFn.setLocalStorage("enableStarBackground", "true");
      $("#universe").show();
    }
  },
  /**
   * 打开/关闭噪点效果
   */
  toggleNoise: () => {
    if (utilsFn.getLocalStorage("enableNoise") == "true") {
      utilsFn.setLocalStorage("enableNoise", "false");
      $("#noiseStyle").html("");
    } else {
      utilsFn.setLocalStorage("enableNoise", "true");
      $("#noiseStyle").html(noiseCSS);
    }
  },
  /**
   * 切换歌单
   */
  changeAPlayerList: (id, server, zhudong = false, reload = true) => {
    if (window.aplayers)
      for (let i = 0; i < window.aplayers.length; i++)
        window.aplayers[i].pause();
    utilsFn.setLocalStorage(
      "playlist",
      JSON.stringify({ id: id, server: server })
    );
    $("meting-js").attr("id", id);
    $("meting-js").attr("server", server);
    if (zhudong)
      GLOBAL_CONFIG.Snackbar !== undefined && utilsFn.snack("歌单切换成功");
    cloudchewieFn.changeMusicList(server, id, reload);
    consoleFn.syncPlaylistSelection();
  },
  /**
   * 保存自定义歌单
   */
  saveCustomPlaylist: (id, server) => {
    var raw = utilsFn.getLocalStorage("customPlaylists");
    var customPlayLists;
    try { customPlayLists = raw ? JSON.parse(raw) : []; } catch { customPlayLists = []; }
    if (!Array.isArray(customPlayLists)) customPlayLists = [];
    var saved = false;
    customPlayLists.forEach((e) => {
      if (e.id == id && e.server == server) saved = true;
    });
    if (saved) {
      GLOBAL_CONFIG.Snackbar !== undefined && utilsFn.snack("歌单已存在");
    } else {
      consoleFn.appendPlaylist(id, server, customPlayLists.length + 1);
      GLOBAL_CONFIG.Snackbar !== undefined && utilsFn.snack("歌单保存成功");
      customPlayLists.push({ id: id, server: server });
    }
    utilsFn.setLocalStorage("customPlaylists", JSON.stringify(customPlayLists));
  },
  /**
   * 删除自定义歌单
   */
  removeCustomPlaylist: (id, server) => {
    var raw = utilsFn.getLocalStorage("customPlaylists");
    var customPlayLists = raw ? JSON.parse(raw) : [];
    var delete_index = -1;
    customPlayLists.forEach((e, index) => {
      if (e.id == id && e.server == server) delete_index = index;
    });
    if (delete_index >= 0) {
      customPlayLists.splice(delete_index, 1);
      utilsFn.setLocalStorage(
        "customPlaylists",
        JSON.stringify(customPlayLists)
      );
      consoleFn.loadCustomPlaylists();
      GLOBAL_CONFIG.Snackbar !== undefined && utilsFn.snack("歌单删除成功");
    }
  },
  /**
   * 加载自定义歌单
   */
  loadCustomPlaylists: (id, server) => {
    document.querySelectorAll(".custom-playlist-item-wrapper").forEach(el => el.remove());
    var raw = utilsFn.getLocalStorage("customPlaylists");
    var customPlayLists;
    try { customPlayLists = raw ? JSON.parse(raw) : []; } catch { customPlayLists = []; }
    if (!Array.isArray(customPlayLists)) customPlayLists = [];
    customPlayLists.forEach((e, index) => {
      consoleFn.appendPlaylist(e.id, e.server, index + 1);
    });
    consoleFn.syncPlaylistSelection();
  },
  syncPlaylistSelection: () => {
    const container = document.querySelector('#aplayer-settings .playlist-container');
    if (!container) return;
    let selected;
    try { selected = JSON.parse(utilsFn.getLocalStorage('playlist') || 'null'); } catch {}
    selected ||= { id: container.dataset.defaultId, server: container.dataset.defaultServer };
    container.querySelectorAll('[data-playlist-id]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.playlistId === String(selected.id) && button.dataset.playlistServer === selected.server));
    });
  },
  appendPlaylist(id, server, index) {
    const container = document.querySelector('#aplayer-settings .playlist-container');
    if (!container) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-playlist-item-wrapper';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'background-option playlist-option';
    button.dataset.playlistId = String(id);
    button.dataset.playlistServer = server;
    button.onclick = () => consoleFn.changeAPlayerList(id, server, true);
    const preview = document.createElement('span');
    preview.className = 'background-swatch';
    preview.style.backgroundImage = 'url("https://picbed.cloudchewie.com/blog/other/archives.jpg!blogimg")';
    preview.setAttribute('aria-hidden', 'true');
    const name = document.createElement('span');
    name.className = 'background-name';
    name.textContent = '歌单 ' + id;
    button.append(preview, name);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'playlist-remove';
    remove.textContent = '×';
    remove.setAttribute('aria-label', '删除歌单 ' + id);
    remove.onclick = () => consoleFn.removeCustomPlaylist(id, server);
    wrapper.append(button, remove);
    container.appendChild(wrapper);
  },
  /**
   * 切换全屏
   */
  toggleFullScreen: () => {
    if (utilsFn.isFullScreen()) {
      document.exitFullscreen();
      $("#con-fullscreen").removeClass("checked");
    } else {
      document.documentElement.requestFullscreen();
      $("#con-fullscreen").addClass("checked");
    }
  },
  /**
   * 切换快捷键
   */
  toggleShortcut: () => {
    if (utilsFn.getLocalStorage("enableShortcut") == "true") {
      utilsFn.setLocalStorage("enableShortcut", "false");
      $("#con-shortcut").removeClass("checked");
      utilsFn.snack("已禁用键盘快捷键");
    } else {
      utilsFn.setLocalStorage("enableShortcut", "true");
      $("#con-shortcut").addClass("checked");
      utilsFn.snack("已启用键盘快捷键,可长按Shift呼出快捷键菜单");
    }
    cloudchewieFn.executeShortcutKeyFunction();
  },
  /**
   * 侧栏位置
   */
  switchAside: () => {
    if (left) {
      $("#aside-content").addClass("right");
      $(".layout > div:first-child").addClass("left");
      utilsFn.setLocalStorage("isLeftAside", "false");
    } else {
      $("aside-content").className = "aside-content";
      $(".layout > div:first-child").className = "";
      if ($("#recent-posts") != null)
        $("#recent-posts").className = "recent-posts";
      utilsFn.setLocalStorage("isLeftAside", "true");
    }
    left = !left;
  },
  /**
   * 显示隐藏右侧边栏
   */
  toggleRightSide: () => {
    if (utilsFn.getLocalStorage("enableRightSide") == "true") {
      utilsFn.setLocalStorage("enableRightSide", "false");
      document.documentElement.dataset.rightside = "hidden";
      $("#rightside").hide();
    } else {
      utilsFn.setLocalStorage("enableRightSide", "true");
      document.documentElement.dataset.rightside = "visible";
      $("#rightside").show();
    }
  },
  /**
   * 设置深浅色跟随系统模式
   */
  syncSystemTheme: () => {
    const enabled = utilsFn.getLocalStorage('enableAutoTheme') === 'true';
    const checkbox = document.getElementById('con-toggleAutoTheme');
    if (checkbox) checkbox.checked = enabled;
    $('#con-mode,.rightMenu-item:has(.fa-adjust)').toggle(!enabled);
    if (enabled) {
      const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if ((document.documentElement.dataset.theme === 'dark') !== dark) dark ? activateDarkMode() : activateLightMode();
      utilsFn.removeLocalStorage('theme');
    }
  },
  toggleAutoTheme: () => {
    utilsFn.setLocalStorage('enableAutoTheme', String(utilsFn.getLocalStorage('enableAutoTheme') !== 'true'));
    consoleFn.syncSystemTheme();
  },
  /**
   * 是否固定导航栏
   */
  toggleFixedNav: () => {
    if (utilsFn.getLocalStorage("enableFixedNav") == "false") {
      utilsFn.setLocalStorage("enableFixedNav", "true");
      $("#page-header").addClass("nav-fixed nav-visible");
      $("#name-container").show();
      cloudchewieFn.fixNav();
    } else {
      utilsFn.setLocalStorage("enableFixedNav", "false");
      $("#page-header").removeClass("nav-fixed nav-visible");
      $("#name-container").hide();
    }
  },
  /**
   * 是否侧栏居右
   */
  toggleAsidePosition: () => {
    if (utilsFn.getLocalStorage("asideRight") == "false") {
      utilsFn.setLocalStorage("asideRight", "true");
      document.documentElement.setAttribute("aside-position", "right");
    } else {
      utilsFn.setLocalStorage("asideRight", "false");
      document.documentElement.setAttribute("aside-position", "left");
    }
  },
  /**
   * 是否自动主题色
   */
  toggleAutoColor: () => {
    if (utilsFn.getLocalStorage("enableAutoColor") == "true")
      utilsFn.setLocalStorage("enableAutoColor", "false");
    else utilsFn.setLocalStorage("enableAutoColor", "true");
    consoleFn.changeAutoColor(false);
  },
  /**
   * 是否打开右键菜单
   */
  toggleContextMenu: () => {
    if (utilsFn.getLocalStorage("enableContextMenu") == "true") {
      utilsFn.setLocalStorage("enableContextMenu", "false");
      $("#con-rightmouse").removeClass("checked");
      cloudchewieFn.bindContextMenu(false, true);
    } else {
      utilsFn.setLocalStorage("enableContextMenu", "true");
      $("#con-rightmouse").addClass("checked");
      cloudchewieFn.bindContextMenu(true, true);
    }
  },
  /**
   * 是否打开APlayer
   */
  toggleAPlayer: () => {
    const navMusic = $("#nav-music");
    if (navMusic == null || navMusic.find("meting-js") == null) return;
    const navMetingAplayer = navMusic.find("meting-js").aplayer;
    if (utilsFn.getLocalStorage("enableAPlayer") == "true") {
      utilsFn.setLocalStorage("enableAPlayer", "false");
      navMusic.hide();
      document.getElementById("nav-music").classList.add("hidden");
      $("#con-music").hide();
      $("#menuMusic").hide();
      $(".music-wrapper .aplayer").show();
      if (navMetingAplayer) {
        navMetingAplayer.pause();
      }
    } else {
      utilsFn.setLocalStorage("enableAPlayer", "true");
      $("#con-music").show();
      $("#menuMusic").show();
      if (!utilsFn.isMusic()) {
        navMusic.show();
        document.getElementById("nav-music").classList.remove("hidden");
      } else {
        navMusic.hide();
        document.getElementById("nav-music").classList.add("hidden");
      }
    }
  },
  /**
   * 解析歌单链接
   */
  resolveUrl: () => {
    var id;
    var server;
    var url = document.getElementById("url-input").value;
    if (url == "") return;
    if (!isNaN(url)) id = url;
    if (url.indexOf("music.163.com/#/playlist?id=") != -1) {
      id = url.split("id=")[1].replace("/", "");
      server = "netease";
    } else if (url.indexOf("y.qq.com/n/ryqq/playlist/") != -1) {
      id = url.split("playlist/")[1].replace("/", "");
      server = "tencent";
    } else if (url.indexOf("https://www.kugou.com/songlist/") != -1) {
      id = url.split("songlist/")[1].replace("/", "");
      server = "kugou";
    } else if (url.indexOf("https://music.91q.com/songlist/") != -1) {
      id = url.split("songlist/")[1].replace("/", "");
      server = "baidu";
    } else {
      $("#url-btn").html("解析失败");
      $("#url-btn").removeClass("success");
      $("#url-btn").addClass("fail");
      return;
    }
    var t =
      "https://meting.api.cloudchewie.com/api?server=" +
      server +
      "&type=playlist&id=" +
      id;
    var o = new XMLHttpRequest();
    (o.onreadystatechange = () => {
      if (
        4 === o.readyState &&
        ((o.status >= 200 && o.status < 300) || 304 === o.status)
      ) {
        if (JSON.parse(o.responseText).length != 0) {
          $("#url-btn").html("解析成功");
          $("#url-btn").addClass("success");
          $("#url-btn").removeClass("fail");
          consoleFn.saveCustomPlaylist(id, server);
          consoleFn.changeAPlayerList(id, server, false);
        } else {
          $("#url-btn").html("解析失败");
          $("#url-btn").removeClass("success");
          $("#url-btn").addClass("fail");
        }
      }
    }),
      o.open("get", t, !0),
      o.send(null);
  },
  colorCache: new Map(),
  colorRequest: 0,
  changeAutoColor: async () => {
    const request = ++consoleFn.colorRequest;
    consoleFn.colorController?.abort();
    consoleFn.setDefaultThemeColor();
    const header = document.getElementById('page-header');
    if (!GLOBAL_CONFIG_SITE.isPost || utilsFn.getLocalStorage('enableAutoColor') !== 'true' || !header) return;
    const match = header.style.backgroundImage.match(/^url\(["']?(.*?)["']?\)$/);
    if (!match) return;
    const endpoint = consolePreferences.colorEndpoint(match[1]);
    if (!endpoint) return;
    let rgb = consoleFn.colorCache.get(endpoint);
    if (!rgb) {
      const controller = consoleFn.colorController = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      try {
        const response = await fetch(endpoint, { signal: controller.signal });
        if (!response.ok) return;
        rgb = consolePreferences.parseColor((await response.json()).RGB);
        if (!rgb) return;
        if (consoleFn.colorCache.size >= 40) consoleFn.colorCache.delete(consoleFn.colorCache.keys().next().value);
        consoleFn.colorCache.set(endpoint, rgb);
      } catch { return; } finally { clearTimeout(timeout); }
    }
    if (request !== consoleFn.colorRequest || header !== document.getElementById('page-header') || utilsFn.getLocalStorage('enableAutoColor') !== 'true') return;
    consoleFn.setThemeColor(...consolePreferences.readableColor(rgb, document.documentElement.dataset.theme === 'dark'));
  },
};

document.addEventListener('pjax:send', () => {
  consoleFn.closeConsole(false);
  cloudchewieFn.exitReadMode(false);
  consoleFn.controller?.abort();
  consoleFn.themeObserver?.disconnect();
  consoleFn.colorController?.abort();
  ++consoleFn.colorRequest;
  ++consoleFn.backgroundRequest;
  consoleFn.setDefaultThemeColor();
});
