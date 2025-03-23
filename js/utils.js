window.meting_api =
  "https://meting.api.cloudchewie.com/api?server=:server&type=:type&id=:id&r=:r";
var adjectives = [
  "美丽的",
  "英俊的",
  "聪明的",
  "勇敢的",
  "可爱的",
  "慷慨的",
  "善良的",
  "可靠的",
  "开朗的",
  "成熟的",
  "稳重的",
  "真诚的",
  "幽默的",
  "豁达的",
  "有趣的",
  "活泼的",
  "优雅的",
  "敏捷的",
  "温柔的",
  "温暖的",
  "敬业的",
  "细心的",
  "耐心的",
  "深沉的",
  "朴素的",
  "含蓄的",
  "率直的",
  "开放的",
  "务实的",
  "坚强的",
  "自信的",
  "谦虚的",
  "文静的",
  "深刻的",
  "纯真的",
  "朝气蓬勃的",
  "慎重的",
  "大方的",
  "顽强的",
  "迷人的",
  "机智的",
  "善解人意的",
  "富有想象力的",
  "有魅力的",
  "独立的",
  "好奇的",
  "干净的",
  "宽容的",
  "尊重他人的",
  "体贴的",
  "守信的",
  "有耐性的",
  "有责任心的",
  "有担当的",
  "有远见的",
  "有智慧的",
  "有眼光的",
  "有冒险精神的",
  "有爱心的",
  "有同情心的",
  "喜欢思考的",
  "喜欢学习的",
  "具有批判性思维的",
  "善于表达的",
  "善于沟通的",
  "善于合作的",
  "善于领导的",
  "有激情的",
  "有幽默感的",
  "有思想的",
  "有个性的",
  "有正义感的",
  "有责任感的",
  "有创造力的",
  "有想象力的",
  "有艺术细胞的",
  "有团队精神的",
  "有协调能力的",
  "有决策能力的",
  "有组织能力的",
  "有学习能力的",
  "有执行能力的",
  "有分析能力的",
  "有逻辑思维的",
  "有创新能力的",
  "有专业素养的",
  "有商业头脑的",
];

var vegetablesAndFruits = [
  "萝卜",
  "白菜",
  "芹菜",
  "生菜",
  "青椒",
  "辣椒",
  "茄子",
  "豆角",
  "黄瓜",
  "西红柿",
  "洋葱",
  "大蒜",
  "土豆",
  "南瓜",
  "豆腐",
  "韭菜",
  "花菜",
  "西兰花",
  "蘑菇",
  "金针菇",
  "苹果",
  "香蕉",
  "橙子",
  "柠檬",
  "猕猴桃",
  "草莓",
  "葡萄",
  "桃子",
  "杏子",
  "李子",
  "石榴",
  "西瓜",
  "哈密瓜",
  "蜜瓜",
  "樱桃",
  "蓝莓",
  "柿子",
  "橄榄",
  "柚子",
  "火龙果",
];

var noiseCSS = `
body:before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background-image: url(https://picbed.cloudchewie.com/blog/index/noise-blue.png);
  position: fixed;
  z-index: 10000;
  opacity: .036;
  pointer-events: none;
  touch-action: none;
}`;

var trailingUrl = "https://www.travellings.cn/go.html";
var pageHeaderEl = document.getElementById("page-header");
var navMusicEl = document.getElementById("nav-music");
var cloudMusicEl = document.getElementById("cloudMusic-page");
var musicVolume = 0.8;
/**
 * =================================================
 *
 * 辅助函数
 *
 * =================================================
 */
const utilsFn = {
  /**
   * =================================================
   *
   * 有关网页存储的函数
   *
   * =================================================
   */
  /**
   * 操作LocalStorage
   */
  setLocalStorage: function (name, data) {
    localStorage.setItem(
      name,
      JSON.stringify({ time: Date.now(), data: data })
    );
  },
  getLocalStorage: function (name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    if (d) {
      let t = Date.now() - d.time;
      if (t < time * 60 * 1000 && t > -1) return d.data;
    }
    return d ? d.data : undefined;
  },
  removeLocalStorage: function (name) {
    localStorage.removeItem(name);
  },
  /**
   * 操作Cookie
   */
  setCookie: (cname, cvalue, exdays = 365) => {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 10000);
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },
  getCookie: (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  removeCookie: (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  /**
   * =================================================
   *
   * 有关页面判断的函数
   *
   * =================================================
   */
  /**
   * 是否为首页
   */
  isHome: function () {
    return window.location.pathname == "/";
  },
  /**
   * 是否为空白页
   */
  isBlank: function () {
    return window.location.pathname == "/blank/";
  },
  /**
   * 是否为音乐页
   */
  isMusic: function () {
    return window.location.pathname == "/music/";
  },
  /**
   * 是否为即刻页
   */
  isMemos: function () {
    return window.location.pathname == "/memos/";
  },
  /**
   * 是否为最新评论页
   */
  isRecentComments: function () {
    return window.location.pathname == "/recentcomments/";
  },
  /**
   * 是否为帖子页
   */
  isPost: function () {
    return window.location.pathname.indexOf("/posts/") != -1;
  },
  /**
   * 是否包含评论
   */
  containCommentDom: function () {
    return document.querySelector("#post-comment") != undefined;
  },
  /**
   * 是否为留言板页
   */
  isGuestbook: function () {
    return window.location.pathname == "/guestbook/";
  },
  /**
   * =================================================
   *
   * 其他辅助函数
   *
   * =================================================
   */
  /**
   * 是否为空
   */
  isEmpty: (e) => {
    return e == undefined || e == null || e === "";
  },
  isNotEmpty: (e) => {
    return !utilsFn.isEmpty(e);
  },
  /**
   * 是否为全屏
   */
  isFullScreen: () => {
    var isFull = document.fullScreen || document.fullscreenElement !== null;
    if (isFull === undefined) isFull = false;
    return isFull;
  },
  /**
   * 添加脚本
   */
  addScript: (e, t, n) => {
    if (document.getElementById(e)) return n ? n() : void 0;
    let a = document.createElement("script");
    (a.src = t), (a.id = e), n && (a.onload = n), document.head.appendChild(a);
  },
  /**
   * 复制内容
   */
  copy: function (obj, text) {
    var clipboard = new ClipboardJS(obj, {
      text: function (trigger) {
        return text;
      },
    });
    clipboard.on("success", function (e) {
      e.clearSelection();
    });
    clipboard.on("error", function (e) {});
  },
  /**
   * 复制选择的内容
   */
  copySelect: () => {
    document.execCommand("Copy", false, null);
    utilsFn.snack(GLOBAL_CONFIG.Snackbar.copy_success);
  },
  /**
   * 消息弹窗
   */
  snackbarShow: (text, showAction = false, duration = 2000) => {
    const { position, bgLight, bgDark } = GLOBAL_CONFIG.Snackbar;
    const bg =
      document.documentElement.getAttribute("data-theme") === "light"
        ? bgLight
        : bgDark;
    Snackbar.show({
      text: text,
      backgroundColor: bg,
      showAction: showAction,
      duration: duration,
      pos: position,
      customClass: "snackbar-css",
    });
  },
  /**
   * 长时间消息弹窗
   */
  snackbarShowLong: (text, showAction = false, duration = 10000) => {
    const { position, bgLight, bgDark } = GLOBAL_CONFIG.Snackbar;
    const bg =
      document.documentElement.getAttribute("data-theme") === "light"
        ? bgLight
        : bgDark;
    Snackbar.show({
      text: text,
      backgroundColor: bg,
      showAction: showAction,
      duration: duration,
      pos: position,
      customClass: "snackbar-css",
    });
  },
  /**
   * 消息弹窗
   */
  snack: (str) => {
    GLOBAL_CONFIG.Snackbar !== undefined && utilsFn.snackbarShow(str);
  },
  /**
   * 消息弹窗
   */
  snackLong: (str) => {
    GLOBAL_CONFIG.Snackbar !== undefined && utilsFn.snackbarShowLong(str);
  },
  /**
   * 超时事件
   */
  withTimeout: (millis, promise) => {
    const timeout = new Promise((resolve, reject) =>
      setTimeout(() => reject(`Timed out after ms.`), millis)
    );
    return Promise.race([promise, timeout]);
  },
  /**
   * 比较两者
   */
  compare: (p) => {
    return function (m, n) {
      var a = m[p];
      var b = n[p];
      return b - a;
    };
  },
  /**
   * =================================================
   *
   * 有关防抖节流的函数
   *
   * =================================================
   */
  /**
   * 防抖
   */
  debounce: function (func, wait, immediate) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },
  /**
   * 节流
   */
  throttle: function (func, wait, options) {
    let timeout, context, args;
    let previous = 0;
    if (!options) options = {};

    const later = function () {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
    };

    const throttled = function () {
      const now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      const remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
    };

    return throttled;
  },
  /**
   * =================================================
   *
   * 有关动画的函数
   *
   * =================================================
   */
  /**
   * 淡入
   */
  fadeIn: (ele, time) => {
    ele.style.cssText = `display:block;animation: to_show ${time}s`;
  },
  /**
   * 淡出
   */
  fadeOut: (ele, time) => {
    ele.addEventListener("animationend", function f() {
      ele.style.cssText = "display: none; animation: '' ";
      ele.removeEventListener("animationend", f);
    });
    ele.style.animation = `to_hide ${time}s`;
  },
  /**
   * 动画进入
   */
  animateIn: (ele, text) => {
    ele.style.display = "block";
    ele.style.animation = text;
  },
  /**
   * 动画离开
   */
  animateOut: (ele, text) => {
    ele.addEventListener("animationend", function f() {
      ele.style.display = "";
      ele.style.animation = "";
      ele.removeEventListener("animationend", f);
    });
    ele.style.animation = text;
  },
  /**
   *  日期之差
   */
  diffDate: (d, more = false) => {
    const dateNow = new Date();
    const datePost = new Date(d);
    const dateDiff = dateNow.getTime() - datePost.getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;

    let result;
    if (more) {
      const monthCount = dateDiff / month;
      const dayCount = dateDiff / day;
      const hourCount = dateDiff / hour;
      const minuteCount = dateDiff / minute;

      if (monthCount > 12) {
        result = datePost.toLocaleDateString().replace(/\//g, "-");
      } else if (monthCount >= 1) {
        result = parseInt(monthCount) + " " + GLOBAL_CONFIG.date_suffix.month;
      } else if (dayCount >= 1) {
        result = parseInt(dayCount) + " " + GLOBAL_CONFIG.date_suffix.day;
      } else if (hourCount >= 1) {
        result = parseInt(hourCount) + " " + GLOBAL_CONFIG.date_suffix.hour;
      } else if (minuteCount >= 1) {
        result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.date_suffix.min;
      } else {
        result = GLOBAL_CONFIG.date_suffix.just;
      }
    } else {
      result = parseInt(dateDiff / day);
    }
    return result;
  },
};

const cloudchewieFn = {
  day_night_count: 0,
  isReadMode: false,
  typing: false,
  downloadimging: false,
  keyUpEvent_timeoutId: null,
  keyUpShiftDelayEvent_timeoutId: null,
  /**
   * 显示帧率
   */
  initFPS: () => {
    var rAF = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    })();

    var frame = 0;
    var allFrameCount = 0;
    var lastTime = Date.now();
    var lastFameTime = Date.now();

    var loop = function () {
      var now = Date.now();
      var fs = now - lastFameTime;
      var fps = Math.round(1000 / fs);

      lastFameTime = now;
      allFrameCount++;
      frame++;

      if (now > 1000 + lastTime) {
        var fps = Math.round((frame * 1000) / (now - lastTime));
        if (fps <= 6) {
          var kd = `<span style="color:#bd0000">卡成ppt</span>`;
        } else if (fps <= 10) {
          var kd = `<span style="color:red">电竞级帧率</span>`;
        } else if (fps <= 14) {
          var kd = `<span style="color:#FFbb00">难受</span>`;
        } else if (fps < 24) {
          var kd = `<span style="color:orange">卡</span>`;
        } else if (fps <= 40) {
          var kd = `<span style="color:green">有点卡</span>`;
        } else {
          var kd = `<span style="color:#425aef">正常</span>`;
        }
        document.getElementById("fps").innerHTML = `FPS:${fps} ${kd}`;
        frame = 0;
        lastTime = now;
      }
      rAF(loop);
    };

    loop();
  },
  /**
   * 引用至评论
   */
  referToComment: (selectedText) => {
    cloudchewieFn.moveToComments();
    if (selectedText == "undefined" || selectedText == "null")
      selectedText = "好棒！";

    function replaceAll(string, search, replace) {
      return string.split(search).join(replace);
    }

    function setText() {
      setTimeout(() => {
        var input = document.getElementsByClassName("el-textarea__inner")[0];
        if (!input) setText();
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("input", true, true);
        let inputValue = replaceAll(selectedText, "\n", "\n> ");
        input.value = "> " + inputValue + "\n\n";
        input.dispatchEvent(evt);
        input.focus();
        input.setSelectionRange(-1, -1);
        if (document.getElementById("comment-tips")) {
          document.getElementById("comment-tips").classList.add("show");
        }
      }, 100);
    }

    setText();
  },
  /**
   * 在光标处插入
   */
  insertAtCursor: (myField, myValue) => {
    if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      sel.select();
    } else if (myField.selectionStart || myField.selectionStart == "0") {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      var restoreTop = myField.scrollTop;
      myField.value =
        myField.value.substring(0, startPos) +
        myValue +
        myField.value.substring(endPos, myField.value.length);

      if (restoreTop > 0) {
        myField.scrollTop = restoreTop;
      }
      myField.focus();
      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
    } else {
      myField.value += myValue;
      myField.focus();
    }
  },
  /**
   * 跳转到某页
   */
  goToPage: () => {
    let e = document.querySelector("#textnumer");
    e &&
      (e.addEventListener("input", () => {
        let t = document.querySelectorAll(".page-number"),
          n = t[t.length - 1].innerHTML;
        Number(e.value) > n && (e.value = n);
      }),
      e.addEventListener("keyup", (t) => {
        "Enter" == t.key &&
          "" != e.value &&
          "0" != e.value &&
          pjax.loadUrl("1" == e.value ? "/" : `/page/${e.value}/`);
      }));
  },
  /**
   * 侧边栏移出页面
   */
  sidebarPaddingR: () => {
    const innerWidth = window.innerWidth;
    const clientWidth = document.body.clientWidth;
    const paddingRight = innerWidth - clientWidth;
    if (innerWidth !== clientWidth) {
      document.body.style.paddingRight = paddingRight + "px";
    }
  },
  /**
   * 加载评论
   */
  loadComment: (dom, callback) => {
    if ("IntersectionObserver" in window) {
      const observerItem = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            callback();
            observerItem.disconnect();
          }
        },
        { threshold: [0] }
      );
      observerItem.observe(dom);
    } else {
      callback();
    }
  },
  /**
   * 滑动至某处
   */
  scrollToDest: (pos, time = 500) => {
    const currentPos = window.scrollY;
    if (currentPos > pos) pos = pos - 70;

    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        top: pos,
        behavior: "smooth",
      });
      return;
    }

    let start = null;
    pos = +pos;
    window.requestAnimationFrame(function step(currentTime) {
      start = !start ? currentTime : start;
      const progress = currentTime - start;
      if (currentPos < pos) {
        window.scrollTo(0, ((pos - currentPos) * progress) / time + currentPos);
      } else {
        window.scrollTo(0, currentPos - ((currentPos - pos) * progress) / time);
      }
      if (progress < time) {
        window.requestAnimationFrame(step);
      } else {
        window.scrollTo(0, pos);
      }
    });
  },
  scrollToTop: () => {
    cloudchewieFn.scrollToDest(0, 500);
  },
  scrollToBottom: () => {
    cloudchewieFn.scrollToDest(document.body.scrollHeight, 500);
  },
  /**
   * 获取父元素
   */
  getParents: (elem, selector) => {
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;
  },
  /**
   * 获取兄弟元素
   */
  siblings: (ele, selector) => {
    return [...ele.parentNode.children].filter((child) => {
      if (selector) {
        return child !== ele && child.matches(selector);
      }
      return child !== ele;
    });
  },
  /**
   * @param {*} selector
   * @param {*} eleType the type of create element
   * @param {*} options object key: value
   */
  wrap: (selector, eleType, options) => {
    const creatEle = document.createElement(eleType);
    for (const [key, value] of Object.entries(options)) {
      creatEle.setAttribute(key, value);
    }
    selector.parentNode.insertBefore(creatEle, selector);
    creatEle.appendChild(selector);
  },
  unwrap: (el) => {
    const elParentNode = el.parentNode;
    if (elParentNode !== document.body) {
      elParentNode.parentNode.insertBefore(el, elParentNode);
      elParentNode.parentNode.removeChild(elParentNode);
    }
  },
  /**
   * 元素是否隐藏
   */
  isHidden: (ele) => ele.offsetHeight === 0 && ele.offsetWidth === 0,
  /**
   * 获取元素顶部
   */
  getEleTop: (ele) => {
    let actualTop = ele.offsetTop;
    let current = ele.offsetParent;
    while (current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  },
  /**
   * 加载大图查看
   */
  loadLightbox: (ele) => {
    const service = GLOBAL_CONFIG.lightbox;
    if (service === "mediumZoom") {
      const zoom = mediumZoom(ele);
      zoom.on("open", (e) => {
        const photoBg =
          document.documentElement.getAttribute("data-theme") === "dark"
            ? "#121212"
            : "#fff";
        zoom.update({
          background: photoBg,
        });
      });
    }
    if (service === "fancybox") {
      ele.forEach((i) => {
        if (i.parentNode.tagName !== "A") {
          const dataSrc = i.dataset.lazySrc || i.src;
          const dataCaption = i.title || i.alt || "";
          cloudchewieFn.wrap(i, "a", {
            href: dataSrc,
            "data-fancybox": "gallery",
            "data-caption": dataCaption,
            "data-thumb": dataSrc,
            "data-download-src": dataSrc,
          });
        }
      });
      if (!window.fancyboxRun) {
        Fancybox.bind("[data-fancybox]", {
          Hash: false,
          Thumbs: {
            autoStart: false,
          },
          helpers: {
            overlay: {
              locked: false,
            },
          },
          Toolbar: {
            display: {
              left: ["infobar"],
              middle: [
                "zoomIn",
                "zoomOut",
                "toggle1to1",
                "rotateCCW",
                "rotateCW",
                "flipX",
                "flipY",
              ],
              right: ["slideshow", "thumbs", "fullscreen", "close"],
            },
          },
        });
        window.fancyboxRun = true;
      }
    }
  },
  /**
   * 初始化图库排版
   */
  initJustifiedGallery: function (selector) {
    selector.forEach(function (i) {
      if (!cloudchewieFn.isHidden(i)) {
        fjGallery(i, {
          itemSelector: ".fj-gallery-item",
          rowHeight: 220,
          gutter: 4,
          onJustify: function () {
            this.$container.style.opacity = "1";
          },
        });
      }
    });
  },
  /**
   * 更新文章锚点
   */
  updateAnchor: (anchor) => {
    if (anchor !== window.location.hash) {
      if (!anchor) anchor = location.pathname;
      const title = GLOBAL_CONFIG_SITE.title;
      window.history.replaceState(
        {
          url: location.href,
          title: title,
        },
        title,
        anchor
      );
    }
  },
  /**
   * 获取样式
   */
  getStyle: (obj, name) => {
    if (window.getComputedStyle) {
      return getComputedStyle(obj, null)[name];
    } else {
      return obj.currentStyle[name];
    }
  },
  /**
   * 重新计算顶栏大小
   */
  resizeTop: () => {
    if (document.getElementById("content-inner") == null) return;
    var clientWidth =
      document.getElementById("content-inner") != null
        ? document.getElementById("content-inner").clientWidth
        : 0;
    var paddingLeft = Number(
      cloudchewieFn
        .getStyle(document.getElementById("content-inner"), "paddingLeft")
        .replace(/\s+|px/gi, "")
    );
    var paddingRight = Number(
      cloudchewieFn
        .getStyle(document.getElementById("content-inner"), "paddingRight")
        .replace(/\s+|px/gi, "")
    );
    var width = clientWidth - paddingLeft - paddingRight;
    try {
      document
        .getElementById("top")
        .setAttribute("style", "width:" + width.toString() + "px");
    } catch (e) {}
  },
  /**
   * 固定导航栏
   */
  fixNav: () => {
    if (utilsFn.getLocalStorage("enableFixedNav") == "true") {
      $("#name-container").show();
      var position = $(window).scrollTop();
      $(window).scroll(function () {
        if (utilsFn.getLocalStorage("enableFixedNav") == "true") {
          var scroll = $(window).scrollTop();
          if (scroll > position) {
            $("#page-header").addClass("nav-down");
          } else {
            $("#page-header").removeClass("nav-down");
          }
          position = scroll;
        } else {
          $("#page-header").removeClass("nav-down");
        }
      });
      if (document.title.split(" | Cloudchewie")[0] != "Cloudchewie")
        document.getElementById("page-name").innerText =
          document.title.split(" | Cloudchewie")[0];
      else document.getElementById("page-name").innerText = "首页";
    } else {
      $("#name-container").hide();
    }
  },
  /**
   * 元素是否在视野中
   */
  isInViewPortOfOne: (el) => {
    if (el == null) return false;
    if (window.getComputedStyle(el).getPropertyValue("display") == "none")
      return false;
    const viewPortHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    const offsetTop = el.offsetTop;
    const scrollTop = document.documentElement.scrollTop;
    const top = offsetTop - scrollTop;
    return top <= viewPortHeight;
  },
  changeDataType: () => {
    var t = window.location.pathname.split("/");
    $("body").attr("data-type", t[1]);
    if (t[1] == "tags" && t.length > 3)
      $("body").attr("data-type", "cloudchewie");
  },
  /**
   * =================================================
   *
   * 检查浏览器版本
   *
   * =================================================
   */
  alertTooLow: () => {
    utilsFn.snack(GLOBAL_CONFIG.Snackbar.browser_version_low);
  },
  browserVersion: () => {
    var userAgent = navigator.userAgent;
    var isIE =
      userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
    var isIE11 =
      userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
    var isFirefox = userAgent.indexOf("Firefox") > -1;
    var isOpera =
      userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1;
    var isChrome =
      userAgent.indexOf("Chrome") > -1 &&
      userAgent.indexOf("Safari") > -1 &&
      userAgent.indexOf("Edge") == -1 &&
      userAgent.indexOf("OPR") == -1;
    var isSafari =
      userAgent.indexOf("Safari") > -1 &&
      userAgent.indexOf("Chrome") == -1 &&
      userAgent.indexOf("Edge") == -1 &&
      userAgent.indexOf("OPR") == -1;
    if (isEdge) {
      if (userAgent.split("Edge/")[1].split(".")[0] < 90) {
        cloudchewieFn.alertTooLow();
      }
    } else if (isFirefox) {
      if (userAgent.split("Firefox/")[1].split(".")[0] < 90) {
        cloudchewieFn.alertTooLow();
      }
    } else if (isOpera) {
      if (userAgent.split("OPR/")[1].split(".")[0] < 80) {
        cloudchewieFn.alertTooLow();
      }
    } else if (isChrome) {
      if (userAgent.split("Chrome/")[1].split(".")[0] < 90) {
        cloudchewieFn.alertTooLow();
      }
    } else if (isSafari) {
    }
  },
  checkVersion: () => {
    if (utilsFn.getCookie("browser_version_checked") != true) {
      cloudchewieFn.browserVersion();
      utilsFn.setCookie("browser_version_checked", true, 1);
    }
  },
  getHostname: (str) => {
    var durl = /https?:\/\/([^\/]+)\//i;
    domain = str.match(durl);
    return domain[1].split(":")[0];
  },
  /**
   * =================================================
   *
   * 右键菜单
   *
   * =================================================
   */
  /**
   * 绑定右键菜单事件
   */
  bindContextMenu: (enable, tip) => {
    if (enable && document.body.clientWidth > 900) {
      if (tip) {
        utilsFn.snack(
          "已启用自定义右键菜单,可使用Ctrl+右键单击呼出默认右键菜单"
        );
      }
      window.oncontextmenu = function (event) {
        if (event.ctrlKey || document.body.clientWidth < 900) return true;
        //隐藏所有菜单项
        document.querySelectorAll(".rightMenu-line").forEach((item) => {
          $(item).hide();
        });
        //如果有文字选中，则显示文字选中相关的菜单项
        if (document.getSelection().toString()) {
          $("#menu-text").show();
          if (!utilsFn.containCommentDom()) {
            $("#refer-to-comment").hide();
          }
        }
        //如果是文章，则显示文章相关的菜单项
        if (document.getElementById("post")) {
          $("#menu-post").show();
          $("#menu-other").show();
        }
        $("#menu-global").show();
        var el = window.document.body;
        el = event.target;
        var a =
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
        //如果是链接，则显示链接相关的菜单项
        if (el.tagName == "A") {
          $("#menu-to").show();
          cloudchewieFn.open = function () {
            if (
              cloudchewieFn.getHostname(el.href) == window.location.hostname
            ) {
              pjax.loadUrl(el.href);
            } else {
              location.href = el.href;
            }
          };
          cloudchewieFn.openWithNewTab = function () {
            window.open(el.href);
          };
          cloudchewieFn.copyLink = function () {
            let url = el.href;
            let txa = document.createElement("textarea");
            txa.value = url;
            document.body.appendChild(txa);
            txa.select();
            document.execCommand("Copy");
            document.body.removeChild(txa);
            GLOBAL_CONFIG.Snackbar !== undefined &&
              utilsFn.snack(GLOBAL_CONFIG.Snackbar.copy_success);
          };
        }
        //如果是图片
        if (el.tagName == "IMG") {
          $("#menu-img").show();
          if (
            $(el).parent().attr("class") == undefined ||
            $(el).parent().attr("class").indexOf("fj-gallery-item") == -1
          ) {
            $("#fullscreen-image").hide();
          }
          cloudchewieFn.openWithNewTab = function () {
            window.open(el.src);
          };
          cloudchewieFn.downloadImage = function () {
            if (cloudchewieFn.downloadimging == false) {
              cloudchewieFn.downloadimging = true;
              utilsFn.snack("正在下载中，请稍后", false, 10000);
              setTimeout(function () {
                let image = new Image();
                image.setAttribute("crossOrigin", "anonymous");
                image.onload = function () {
                  let canvas = document.createElement("canvas");
                  canvas.width = image.width;
                  canvas.height = image.height;
                  let context = canvas.getContext("2d");
                  context.drawImage(image, 0, 0, image.width, image.height);
                  let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
                  let a = document.createElement("a"); // 生成一个a元素
                  let event = new MouseEvent("click"); // 创建一个单击事件
                  a.download = name || "photo"; // 设置图片名称
                  a.href = url; // 将生成的URL设置为a.href属性
                  a.dispatchEvent(event); // 触发a的单击事件
                };
                image.src = el.src;
                utilsFn.snack("图片已添加盲水印，请遵守版权协议");
                cloudchewieFn.downloadimging = false;
              }, "10000");
            } else {
              utilsFn.snack("有正在进行中的下载，请稍后再试");
            }
          };
          cloudchewieFn.fullScreenImage = function () {
            if ($(el).parent().attr("class").indexOf("fj-gallery-item") != -1)
              el.click();
          };
          cloudchewieFn.copyLink = function () {
            let url = el.src;
            let txa = document.createElement("textarea");
            txa.value = url;
            document.body.appendChild(txa);
            txa.select();
            document.execCommand("Copy");
            document.body.removeChild(txa);
            GLOBAL_CONFIG.Snackbar !== undefined &&
              utilsFn.snack(GLOBAL_CONFIG.Snackbar.copy_success);
          };
        } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
          //如果是输入框/文本框
          $("#menu-paste").show();
          cloudchewieFn.paste = function () {
            navigator.permissions
              .query({
                name: "clipboard-read",
              })
              .then((result) => {
                if (result.state == "granted" || result.state == "prompt") {
                  navigator.clipboard.readText().then((text) => {
                    cloudchewieFn.insertAtCursor(el, text);
                  });
                } else {
                  alert("请允许读取剪贴板！");
                }
              });
          };
        }
        let pageX = event.clientX + 10;
        let pageY = event.clientY;
        let rmWidth = $("#rightMenu").width();
        let rmHeight = $("#rightMenu").height();
        if (pageX + rmWidth > window.innerWidth) {
          pageX -= rmWidth + 10;
        }
        if (pageY + rmHeight > window.innerHeight) {
          pageY -= pageY + rmHeight - window.innerHeight;
        }
        //判断是否只有小菜单，如果是则显示通用菜单项
        var isOnlySmall = true;
        document.querySelectorAll(".rightMenu-line").forEach((item) => {
          if ($(item).css("display") != "none") isOnlySmall = false;
        });
        if (isOnlySmall) $("#menu-general").show();
        //如果是阅读模式，则隐藏所有菜单项
        if (cloudchewieFn.isReadMode) {
          document.querySelectorAll(".rightMenu-line").forEach((item) => {
            $(item).hide();
          });
          return false;
        }
        cloudchewieFn.toggleRightMenu(true, pageY, pageX);
        return false;
      };
      window.addEventListener("click", function () {
        cloudchewieFn.toggleRightMenu(false);
      });
    } else {
      if (tip) {
        utilsFn.snack("已禁用自定义右键菜单");
      }
      window.oncontextmenu = function () {
        return true;
      };
    }
  },
  /**
   * 显示/隐藏右键菜单
   */
  toggleRightMenu: (isTrue, x = 0, y = 0) => {
    let $rightMenu = $("#rightMenu");
    $rightMenu.css("top", x + "px").css("left", y + "px");
    if (isTrue) {
      $rightMenu.show();
    } else {
      $rightMenu.hide();
    }
  },
  /**
   * 监测长按事件
   */
  addLongtabListener: (target, callback) => {
    let timer = 0;
    target.ontouchstart = () => {
      timer = 0;
      timer = setTimeout(() => {
        callback();
        timer = 0;
      }, 380);
    };
    target.ontouchmove = () => {
      clearTimeout(timer);
      timer = 0;
    };
    target.ontouchend = () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  },
  /**
   * =================================================
   *
   * 图片排版
   *
   * =================================================
   */
  /**
   * 操作文章中的图片
   */
  addPhotoFigcaption: () => {
    document
      .querySelectorAll("#article-container img:not(.memos-bar-avatar)")
      .forEach((item) => {
        const parentEle = item.parentNode;
        const altValue = item.title || item.alt;
        if (
          altValue &&
          !parentEle.parentNode.classList.contains("justified-gallery")
        ) {
          const ele = document.createElement("div");
          ele.className = "img-alt is-center";
          ele.textContent = altValue;
          parentEle.insertBefore(ele, item.nextSibling);
        }
      });
  },
  /**
   * 图片排版
   */
  runJustifiedGallery: (ele) => {
    ele.forEach((item) => {
      const $imgList = item.querySelectorAll("img:not(.memos-bar-avatar)");
      $imgList.forEach((i) => {
        const dataLazySrc = i.getAttribute("data-lazy-src");
        if (dataLazySrc) i.src = dataLazySrc;
        cloudchewieFn.wrap(i, "div", { class: "fj-gallery-item" });
      });
    });
    if (window.fjGallery) {
      setTimeout(() => {
        cloudchewieFn.initJustifiedGallery(ele);
      }, 100);
      return;
    }
    const newEle = document.createElement("link");
    newEle.rel = "stylesheet";
    newEle.href = GLOBAL_CONFIG.source.justifiedGallery.css;
    document.body.appendChild(newEle);
    getScript(`${GLOBAL_CONFIG.source.justifiedGallery.js}`).then(() => {
      cloudchewieFn.initJustifiedGallery(ele);
    });
  },
  /**
   * 挂载fancybox
   */
  runLightbox: () => {
    cloudchewieFn.loadLightbox(
      document.querySelectorAll(
        "#article-container img:not(.no-lightbox):not(.air-conditioner-main-content-bottom-logo):not(.memos-bar-avatar)"
      )
    );
  },
  /**
   * =================================================
   *
   * 文章页功能
   *
   * =================================================
   */
  /**
   * 切换阅读模式
   */
  toggleReadMode: () => {
    const clickFn = () => {
      $body.classList.remove("read-mode");
      document.getElementById("post").classList.remove("read-mode");
      newEle.remove();
      newEle.removeEventListener("click", clickFn);
      cloudchewieFn.isReadMode = false;
      $(".aplayer").show();
      $("#con-readmode").removeClass("checked");
      $("#post-meta").show();
      $("#post-firstinfo").show();
    };
    const $body = document.body;
    $body.classList.add("read-mode");
    document.getElementById("post").classList.add("read-mode");
    const newEle = document.createElement("button");
    newEle.type = "button";
    newEle.className = "fas fa-sign-out-alt exit-readmode";
    newEle.removeEventListener("click", clickFn);
    $body.appendChild(newEle);
    consoleFn.closeConsole();
    $("#post-meta").hide();
    $("#post-firstinfo").hide();
    cloudchewieFn.isReadMode = true;
    $("#con-readmode").addClass("checked");
    $(".aplayer").hide();
    newEle.addEventListener("click", clickFn);
  },
  /**
   * 切换深浅色模式
   */
  toggleDarkMode: (useTransition) => {
    const nowMode =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    if (nowMode === "light") {
      document.querySelector(".menu-toggleDarkMode-text").textContent =
        "浅色模式";
      $("#darkmode-button").attr("title", "切换为浅色模式");
      $("#con-mode").attr("title", "切换为浅色模式");
      !useTransition && activateDarkMode();
      saveToLocal.set("theme", "dark", 2);
      !useTransition &&
        GLOBAL_CONFIG.Snackbar !== undefined &&
        utilsFn.snack(GLOBAL_CONFIG.Snackbar.day_to_night);
    } else {
      document.querySelector(".menu-toggleDarkMode-text").textContent =
        "深色模式";
      $("#darkmode-button").attr("title", "切换为深色模式");
      $("#con-mode").attr("title", "切换为深色模式");
      !useTransition && activateLightMode();
      saveToLocal.set("theme", "light", 2);
      cloudchewieFn.day_night_count++;
      !useTransition &&
        GLOBAL_CONFIG.Snackbar !== undefined &&
        utilsFn.snack(GLOBAL_CONFIG.Snackbar.night_to_day);
    }
    typeof utterancesTheme === "function" && utterancesTheme();
    typeof FB === "object" && window.loadFBComment();
    window.DISQUS &&
      document.getElementById("disqus_thread").children.length &&
      setTimeout(() => window.disqusReset(), 200);
  },
  /**
   * 复制本文链接
   */
  copyArticleLink: function () {
    let url = window.location.href;
    let txa = document.createElement("textarea");
    txa.value = url;
    document.body.appendChild(txa);
    txa.select();
    document.execCommand("Copy");
    document.body.removeChild(txa);
    utilsFn.snack(GLOBAL_CONFIG.Snackbar.copy_success);
  },
  /**
   * 翻译
   */
  translate: () => {
    window.translateFn.translatePage();
  },
  /**
   * 显示/隐藏侧边按钮
   */
  toggleSideBtn: (e) => {
    const rightsideHideClassList = document.getElementById(
      "rightside-button-list"
    ).classList;
    rightsideHideClassList.toggle("show");
    if (e.classList.contains("show")) {
      rightsideHideClassList.add("status");
      setTimeout(() => {
        rightsideHideClassList.remove("status");
      }, 300);
    }
    e.classList.toggle("show");
  },
  /**
   * 显示/隐藏左/右侧栏
   */
  toggleAside: () => {
    if (!utilsFn.isHome()) {
      const $htmlDom = document.documentElement.classList;
      $htmlDom.contains("hide-aside")
        ? saveToLocal.set("enableAside", "show", 2)
        : saveToLocal.set("enableAside", "hide", 2);
      $htmlDom.toggle("hide-aside");
      if (saveToLocal.get("enableAside") == "hide") {
        $("#con-toggleaside").addClass("checked");
        document.querySelector(".menu-toggleAside-text").textContent =
          "切换为双栏";
      } else {
        $("#con-toggleaside").removeClass("checked");
        document.querySelector(".menu-toggleAside-text").textContent =
          "切换为单栏";
      }
    }
  },
  /**
   * 显示/隐藏移动端目录
   */
  toggleMobileToc: () => {
    if (
      window
        .getComputedStyle(document.getElementById("card-toc"))
        .getPropertyValue("opacity") === "0"
    ) {
      window.mobileToc.open();
      $("#mobile-toc-button").addClass("checked");
    } else {
      window.mobileToc.close();
      $("#mobile-toc-button").removeClass("checked");
    }
  },
  /**
   * 展开/收缩移动端侧边栏
   */
  toggleSidebar: () => {
    document
      .querySelectorAll("#sidebar-menus .site-page.group")
      .forEach((item) => {
        item.addEventListener("click", (e) => {
          e.target.classList.toggle("hide");
        });
      });
  },
  /**
   * 表情放大
   */
  enlargeEmoji: () => {
    let flag = 1,
      owo_time = "",
      m = 3;
    let div = document.createElement("div"),
      body = document.querySelector("body");
    div.id = "owo-big";
    body.appendChild(div);
    let observer = new MutationObserver((mutations) => {
      for (let i = 0; i < mutations.length; i++) {
        let dom = mutations[i].addedNodes,
          owo_body = "";
        if (dom.length == 2 && dom[1].className == "OwO-body")
          owo_body = dom[1];
        else if (dom.length == 1 && dom[0].className == "tk-comment")
          owo_body = dom[0];
        else continue;
        if (document.body.clientWidth <= 768)
          owo_body.addEventListener("contextmenu", (e) => e.preventDefault());
        // 鼠标移入
        owo_body.onmouseover = (e) => {
          if (flag && e.target.tagName == "IMG") {
            flag = 0;
            owo_time = setTimeout(() => {
              let height = e.target.clientHeight * m,
                width = e.target.clientWidth * m,
                left = e.x - e.offsetX - (width - e.target.clientWidth) / 2,
                top = e.y - e.offsetY;
              if (left + width > body.clientWidth)
                left -= left + width - body.clientWidth + 10;
              if (left < 0) left = 10;
              div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
              div.innerHTML = `<img src="${e.target.src}">`;
            }, 300);
          }
        };
        // 鼠标移出
        owo_body.onmouseout = () => {
          (div.style.display = "none"), (flag = 1), clearTimeout(owo_time);
        };
      }
    });
    observer.observe(document.getElementById("post-comment"), {
      subtree: true,
      childList: true,
    });
  },
  /**
   * 增强Twikoo评论
   */
  enhanceTwikoo: () => {
    if (
      document.getElementById("site-title") &&
      document.getElementById("site-title").innerHTML.trim() ==
        document
          .querySelector(
            "#menus > div.menus_items > div:nth-child(5) > a > span"
          )
          .innerHTML.trim()
    ) {
      document.querySelector(
        "#post-comment > div.comment-head > div > span"
      ).innerHTML = "  留言板  ";
      var commentInterval = setInterval(() => {
        document.querySelectorAll(".el-textarea__inner").forEach((item) => {
          if (item.getAttribute("placeholder") != "请输入您的留言")
            item.setAttribute("placeholder", "请输入您的留言");
        });
        document
          .querySelectorAll(
            "#twikoo > div.tk-comments > div.tk-comments-container > div.tk-comments-no > span"
          )
          .forEach((item) => {
            if (item.innerHTML == "没有评论") item.innerHTML = "没有留言";
          });
        document
          .querySelectorAll(
            "#twikoo > div.tk-comments > div.tk-comments-container > div.tk-comments-title > span.tk-comments-count > span:nth-child(2)"
          )
          .forEach((item) => {
            if (item.innerHTML == " 条评论") item.innerHTML = " 条留言";
          });
      }, 300);
    }
    if (document.getElementById("post-comment")) {
      setInterval(() => {
        if (document.getElementById("CommentaryRegulations")) {
          var element = document.createElement("div");
          element.id = "CommentaryRegulations";
          element.classList.add("tk-submit-action-icon");
          element.innerHTML =
            "<a href='/term/' target='_blank' title='评论条例'></a>";
          if (document.querySelector(".tk-row-actions-start"))
            document
              .querySelector(".tk-row-actions-start")
              .appendChild(element);
        }
      }, 300);
    }
  },
  /**
   * 匿名评论
   */
  addRandomCommentInfo: function () {
    // 从形容词数组中随机取一个值
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];

    // 从蔬菜水果动物名字数组中随机取一个值
    const randomName =
      vegetablesAndFruits[
        Math.floor(Math.random() * vegetablesAndFruits.length)
      ];

    // 将两个值组合成一个字符串
    const name = `${randomAdjective}${randomName}`;

    function dr_js_autofill_commentinfos() {
      var lauthor = [
          "#author",
          "input[name='comname']",
          "#inpName",
          "input[name='author']",
          "#ds-dialog-name",
          "#name",
          "input[name='nick']",
          "#comment_author",
        ],
        lmail = [
          "#mail",
          "#email",
          "input[name='commail']",
          "#inpEmail",
          "input[name='email']",
          "#ds-dialog-email",
          "input[name='mail']",
          "#comment_email",
        ],
        lurl = [
          "#url",
          "input[name='comurl']",
          "#inpHomePage",
          "#ds-dialog-url",
          "input[name='url']",
          "input[name='website']",
          "#website",
          "input[name='link']",
          "#comment_url",
        ];
      for (var i = 0; i < lauthor.length; i++) {
        var author = document.querySelector(lauthor[i]);
        if (author != null) {
          author.value = name;
          author.dispatchEvent(new Event("input"));
          author.dispatchEvent(new Event("change"));
          break;
        }
      }
      for (var j = 0; j < lmail.length; j++) {
        var mail = document.querySelector(lmail[j]);
        if (mail != null) {
          mail.value = visitorMail;
          mail.dispatchEvent(new Event("input"));
          mail.dispatchEvent(new Event("change"));
          break;
        }
      }
      return !1;
    }

    dr_js_autofill_commentinfos();
    var input = document.getElementsByClassName("el-textarea__inner")[0];
    input.focus();
    input.setSelectionRange(-1, -1);
  },
  /**
   * =================================================
   *
   * categorybar事件
   *
   * =================================================
   */
  // CategoryBar滚动
  scrollCategoryBarToRight: function () {
    // 获取需要操作的元素
    const items = document.getElementById("catalog-list");
    const nextButton = document.getElementById("category-bar-next");

    // 检查元素是否存在
    if (items && nextButton) {
      const itemsWidth = items.clientWidth;

      // 判断是否已经滚动到最右侧
      if (items.scrollLeft + items.clientWidth + 1 >= items.scrollWidth) {
        // 滚动到初始位置并更新按钮内容
        items.scroll({
          left: 0,
          behavior: "smooth",
        });
        nextButton.innerHTML =
          '<i class="cloudchewiefont cloudchewie-icon-angle-double-right"></i>';
      } else {
        // 滚动到下一个视图
        items.scrollBy({
          left: itemsWidth,
          behavior: "smooth",
        });
      }
    } else {
    }
  },
  // 分类条
  categoriesBarActive: function () {
    const urlinfo = decodeURIComponent(window.location.pathname);
    const $categoryBar = document.getElementById("category-bar");
    if (!$categoryBar) return;

    if (urlinfo === "/") {
      $categoryBar.querySelector("#首页").classList.add("select");
    } else {
      const pattern = /\/categories\/.*?\//;
      const patbool = pattern.test(urlinfo);
      if (!patbool) return;

      const nowCategories = urlinfo.split("/")[2];
      $categoryBar.querySelector(`#${nowCategories}`).classList.add("select");
    }
  },
  topCategoriesBarScroll: function () {
    const $categoryBarItems = document.getElementById("category-bar-items");
    if (!$categoryBarItems) return;

    $categoryBarItems.addEventListener("mousewheel", function (e) {
      const v = -e.wheelDelta / 2;
      this.scrollLeft += v;
      e.preventDefault();
    });
  },
  scrollByMouseWheel: function ($list, $target) {
    const scrollHandler = function (e) {
      $list.scrollLeft -= e.wheelDelta / 2;
      e.preventDefault();
    };
    $list.addEventListener("mousewheel", scrollHandler, { passive: false });
    if ($target) {
      $target.classList.add("selected");
      $list.scrollLeft =
        $target.offsetLeft -
        $list.offsetLeft -
        ($list.offsetWidth - $target.offsetWidth) / 2;
    }
  },
  // catalog激活
  catalogActive: function () {
    const $list = document.getElementById("catalog-list");
    if ($list) {
      const $catalog = document.getElementById(
        decodeURIComponent(window.location.pathname)
      );
      cloudchewieFn.scrollByMouseWheel($list, $catalog);
    }
  },
  // Page Tag 激活
  tagsPageActive: function () {
    const $list = document.getElementById("tag-page-tags");
    if ($list) {
      const $tagPageTags = document.getElementById(
        decodeURIComponent(window.location.pathname)
      );
      cloudchewieFn.scrollByMouseWheel($list, $tagPageTags);
    }
  },
  /**
   * =================================================
   *
   * 滑动事件
   *
   * =================================================
   */
  scrollFunction: () => {
    const $rightside = document.getElementById("rightside");
    const innerHeight = window.innerHeight + 56;
    // 当滚动条小于56时
    if (
      document.body.scrollHeight <= innerHeight &&
      utilsFn.isMemos() &&
      utilsFn.isGuestbook()
    ) {
      $rightside.style.cssText = "opacity: 1; transform: translateX(-60px)";
      return;
    }
    //返回滑动方向
    function scrollDirection(currentTop) {
      const result = currentTop > initTop; // true is down & false is up
      initTop = currentTop;
      return result;
    }

    let initTop = 0;
    let isChatShow = true;
    const $header = document.getElementById("page-header");
    const isChatBtnHide = typeof chatBtnHide === "function";
    const isChatBtnShow = typeof chatBtnShow === "function";

    window.scrollCollect = () => {
      return utilsFn.throttle((e) => {
        const currentTop = window.scrollY || document.documentElement.scrollTop;
        const isDown = scrollDirection(currentTop);
        if (currentTop < 10) {
          $("#page-header").addClass("nav-top");
        } else {
          $("#page-header").removeClass("nav-top");
        }
        if (currentTop > 56) {
          if (utilsFn.getLocalStorage("enableFixedNav") == "false") {
            if (isDown) {
              if ($header.classList.contains("nav-visible"))
                $header.classList.remove("nav-visible");
              if (isChatBtnShow && isChatShow === true) {
                chatBtnHide();
                isChatShow = false;
              }
            } else {
              if (!$header.classList.contains("nav-visible"))
                $header.classList.add("nav-visible");
              if (isChatBtnHide && isChatShow === false) {
                chatBtnShow();
                isChatShow = true;
              }
            }
            $header.classList.add("nav-fixed");
          }
          if (
            window.getComputedStyle($rightside).getPropertyValue("opacity") ===
              "0" &&
            utilsFn.getLocalStorage("enableRightSide") == "true"
          ) {
            $rightside.style.cssText =
              "opacity: 0.8; transform: translateX(-60px)";
          }
        } else {
          if (currentTop === 0) {
            if (utilsFn.getLocalStorage("enableFixedNav") == "false") {
              $header.classList.remove("nav-fixed", "nav-visible");
            }
          }
          if (utilsFn.getLocalStorage("enableRightSide") == "true") {
            $rightside.style.cssText = "opacity: ''; transform: ''";
          }
        }

        if (
          document.body.scrollHeight <= innerHeight &&
          utilsFn.getLocalStorage("enableRightSide") == "true"
        ) {
          $rightside.style.cssText =
            "opacity: 0.8; transform: translateX(-60px)";
        }
      }, 200)();
    };
    window.addEventListener("scroll", window.scrollCollect);
  },
  scrollFunctionOfToc: () => {
    const isToc = GLOBAL_CONFIG_SITE.isToc;
    const isAnchor = GLOBAL_CONFIG.isAnchor;
    const $article = document.getElementById("article-container");

    if (!($article && (isToc || isAnchor))) return;

    let $tocLink, $cardToc, scrollPercent, autoScrollToc, isExpand;

    if (isToc) {
      const $cardTocLayout = document.getElementById("card-toc");
      $cardToc = $cardTocLayout.getElementsByClassName("toc-content")[0];
      $tocLink = $cardToc.querySelectorAll(".toc-link");
      const $tocPercentage = $cardTocLayout.querySelector(".toc-percentage");
      isExpand = $cardToc.classList.contains("is-expand");

      scrollPercent = (currentTop) => {
        const docHeight = $article.clientHeight;
        const winHeight = document.documentElement.clientHeight;
        const headerHeight = $article.offsetTop;
        const contentMath =
          docHeight > winHeight
            ? docHeight - winHeight
            : document.documentElement.scrollHeight - winHeight;
        const scrollPercent = (currentTop - headerHeight) / contentMath;
        const scrollPercentRounded = Math.round(scrollPercent * 100);
        const percentage =
          scrollPercentRounded > 100
            ? 100
            : scrollPercentRounded <= 0
            ? 0
            : scrollPercentRounded;
        $tocPercentage.textContent = percentage;
      };

      window.mobileToc = {
        open: () => {
          $cardTocLayout.style.cssText =
            "animation: toc-open .3s; opacity: 1; right: 55px";
        },

        close: () => {
          $cardTocLayout.style.animation = "toc-close .2s";
          setTimeout(() => {
            $cardTocLayout.style.cssText =
              "opacity:''; animation: ''; right: ''";
          }, 100);
        },
      };

      // toc元素点击
      $cardToc.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target.classList;
        if (target.contains("toc-content")) return;
        const $target = target.contains("toc-link")
          ? e.target
          : e.target.parentElement;
        cloudchewieFn.scrollToDest(
          cloudchewieFn.getEleTop(
            document.getElementById(
              decodeURI($target.getAttribute("href")).replace("#", "")
            )
          ),
          300
        );
        if (window.innerWidth < 900) {
          window.mobileToc.close();
          $("#mobile-toc-button").removeClass("checked");
        }
      });

      autoScrollToc = (item) => {
        const activePosition = item.getBoundingClientRect().top;
        const sidebarScrollTop = $cardToc.scrollTop;
        if (activePosition > document.documentElement.clientHeight - 100) {
          $cardToc.scrollTop = sidebarScrollTop + 150;
        }
        if (activePosition < 100) {
          $cardToc.scrollTop = sidebarScrollTop - 150;
        }
      };
    }

    const list = $article.querySelectorAll("h1,h2,h3,h4,h5,h6");
    let detectItem = "";
    const findHeadPosition = (top) => {
      if (top === 0) {
        return false;
      }

      let currentId = "";
      let currentIndex = "";

      list.forEach((ele, index) => {
        if (top > cloudchewieFn.getEleTop(ele) - 80) {
          const id = ele.id;
          currentId = id ? "#" + encodeURI(id) : "";
          currentIndex = index;
        }
      });

      if (detectItem === currentIndex) return;

      if (isAnchor) cloudchewieFn.updateAnchor(currentId);

      detectItem = currentIndex;

      if (isToc) {
        $cardToc.querySelectorAll(".active").forEach((i) => {
          i.classList.remove("active");
        });

        if (currentId === "") {
          return;
        }

        const currentActive = $tocLink[currentIndex];
        currentActive.classList.add("active");

        setTimeout(() => {
          autoScrollToc(currentActive);
        }, 0);

        if (isExpand) return;
        let parent = currentActive.parentNode;

        for (; !parent.matches(".toc"); parent = parent.parentNode) {
          if (parent.matches("li")) parent.classList.add("active");
        }
      }
    };

    window.resolveTocScrollFunction = () => {
      return utilsFn.throttle(() => {
        const currentTop = window.scrollY || document.documentElement.scrollTop;
        isToc && scrollPercent(currentTop);
        findHeadPosition(currentTop);
      }, 100)();
    };
    window.addEventListener("scroll", resolveTocScrollFunction);
  },
  /**
     浏览进度百分比
    **/
  browsingProgress: () => {
    window.addEventListener("scroll", () => {
      let a = document.documentElement.scrollTop || window.scrollY, // 卷去高度
        b =
          Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
          ) - document.documentElement.clientHeight, // 整个网页高度
        result = Math.round((a / b) * 100), // 计算百分比
        up = document.querySelector("#go-up"); // 获取按钮
      down = document.querySelector("#go-down"); // 获取按钮
      if (up != null) {
        if (result <= 95) {
          up.childNodes[0].style.display = "none";
          up.childNodes[1].style.display = "block";
          up.childNodes[1].childNodes[0].innerHTML = result;
        } else {
          up.childNodes[1].style.display = "none";
          up.childNodes[0].style.display = "block";
        }
      }
      if (result <= 95 && document.documentElement.scrollTop > 20) {
        down.style.display = "block";
      } else {
        down.style.display = "none";
      }
      if (
        cloudchewieFn.isInViewPortOfOne(document.getElementById("post-comment"))
      ) {
        $("#to_comment").hide();
        $("#switch_commentBarrage").hide();
        $("#con-barrage").hide();
        $("#menuCommentBarrage").hide();
      } else {
        $("#to_comment").show();
        $("#switch_commentBarrage").show();
        $("#con-barrage").show();
        $("#menuCommentBarrage").show();
      }
      cloudchewieFn.percentageScrollFn(a);
    });
    if (document.documentElement.scrollTop > 20) {
      document.querySelector("#go-down").style.display = "block";
    } else {
      document.querySelector("#go-down").style.display = "none";
    }
  },
  /**
   * 跳转到评论
   */
  moveToComments: () => {
    let switchDone = false;
    const $switchBtn = document.querySelector("#comment-switch > .switch-btn");
    $switchBtn &&
      $switchBtn.addEventListener("click", () => {
        this.classList.toggle("move");
        document
          .querySelectorAll("#post-comment > .comment-wrap > div")
          .forEach((item) => {
            if (cloudchewieFn.isHidden(item)) {
              item.style.cssText = "display: block;animation: tabshow .5s";
            } else {
              item.style.cssText = "display: none;animation: ''";
            }
          });

        if (!switchDone && typeof loadOtherComment === "function") {
          switchDone = true;
          loadOtherComment();
        }
      });
  },
  qrcodeCreate: function () {
    if (document.getElementById("qrcode")) {
      document.getElementById("qrcode").innerHTML = "";
      var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: window.location.href,
        width: 250,
        height: 250,
        colorDark: "#000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    }
  },
  percentageScrollFn: (currentTop) => {
    // 处理滚动百分比
    const $percentBtn = document.getElementById("percent"),
      $navTotop = document.getElementById("nav-totop"),
      $bodyWrap = document.getElementById("body-wrap");
    let docHeight = $bodyWrap.clientHeight;
    let pageBottomDomFlag =
      document.getElementById("post-comment") ||
      document.getElementById("footer");
    const winHeight = document.documentElement.clientHeight;
    const contentMath =
      docHeight > winHeight
        ? docHeight - winHeight
        : document.documentElement.scrollHeight - winHeight;
    const scrollPercent = currentTop / contentMath;
    const scrollPercentRounded = Math.round(scrollPercent * 100);
    const percentage =
      scrollPercentRounded > 100
        ? 100
        : scrollPercentRounded <= 0
        ? 1
        : scrollPercentRounded;
    $percentBtn.textContent = percentage;

    if (
      (cloudchewieFn.isInViewPortOfOne(pageBottomDomFlag) || percentage > 90) &&
      document.documentElement.scrollTop > 20
    ) {
      $navTotop.classList.add("long");
      $percentBtn.textContent = "回到顶部";
      if (document.body.clientWidth <= 768)
        document.getElementById("search-button").style.display = "none";
    } else {
      $navTotop.classList.remove("long");
      $percentBtn.textContent = percentage;
      setTimeout(() => {
        document.getElementById("search-button").style.display = "inline";
      }, 300);
    }
  },
  /**
   * =================================================
   *
   * 全局功能
   *
   * =================================================
   */
  /**
   * 复制加上版权信息
   */
  addCopyright: () => {
    const copyright = GLOBAL_CONFIG.copyright;
    document.body.oncopy = (e) => {
      e.preventDefault();
      let textFont;
      const copyFont = window.getSelection(0).toString();
      if (copyFont.length > copyright.limitCount) {
        textFont =
          copyFont +
          "\n" +
          "\n" +
          "\n" +
          copyright.languages.author +
          "\n" +
          copyright.languages.link +
          window.location.href +
          "\n" +
          copyright.languages.source +
          "\n" +
          copyright.languages.info;
      } else {
        textFont = copyFont;
      }
      if (e.clipboardData) {
        return e.clipboardData.setData("text", textFont);
      } else {
        return window.clipboardData.setData("text", textFont);
      }
    };
  },
  /**
   * 网页运行时间
   */
  addRuntime: () => {
    const $runtimeCount = document.getElementById("runtimeshow");
    if ($runtimeCount) {
      const publishDate = $runtimeCount.getAttribute("data-publishDate");
      $runtimeCount.innerText =
        utilsFn.diffDate(publishDate) + " " + GLOBAL_CONFIG.runtime;
    }
  },
  /**
   * 最后更新时间
   */
  addLastPushDate: () => {
    const $lastPushDateItem = document.getElementById("last-push-date");
    if ($lastPushDateItem) {
      const lastPushDate = $lastPushDateItem.getAttribute("data-lastPushDate");
      $lastPushDateItem.innerText = utilsFn.diffDate(lastPushDate, true);
    }
  },
  /**
   * 表格Overflow
   */
  addTableWrap: () => {
    const $table = document.querySelectorAll(
      "#article-container :not(.highlight) > table, #article-container > table"
    );
    if ($table.length) {
      $table.forEach((item) => {
        cloudchewieFn.wrap(item, "div", { class: "table-wrap" });
      });
    }
  },
  /**
   * tag-hide
   */
  clickFnOfTagHide: () => {
    const $hideInline = document.querySelectorAll(
      "#article-container .hide-button"
    );
    if ($hideInline.length) {
      $hideInline.forEach((item) => {
        item.addEventListener("click", (e) => {
          const $this = e.target;
          $this.classList.add("open");
          const $fjGallery =
            $this.nextElementSibling.querySelectorAll(".fj-gallery");
          $fjGallery.length && cloudchewieFn.initJustifiedGallery($fjGallery);
        });
      });
    }
  },
  /**
   * 分栏控件点击事件
   */
  clickFnOfTabs: () => {
    document
      .querySelectorAll("#article-container .tab > button")
      .forEach((item) => {
        item.addEventListener("click", (e) => {
          const $this = e.target;
          const $tabItem = $this.parentNode;

          if (!$tabItem.classList.contains("active")) {
            const $tabContent = $tabItem.parentNode.nextElementSibling;
            const $siblings = cloudchewieFn.siblings($tabItem, ".active")[0];
            $siblings && $siblings.classList.remove("active");
            $tabItem.classList.add("active");
            const tabId = $this.getAttribute("data-href").replace("#", "");
            const childList = [...$tabContent.children];
            childList.forEach((item) => {
              if (item.id === tabId) item.classList.add("active");
              else item.classList.remove("active");
            });
            const $isTabJustifiedGallery = $tabContent.querySelectorAll(
              `#${tabId} .fj-gallery`
            );
            if ($isTabJustifiedGallery.length > 0) {
              cloudchewieFn.initJustifiedGallery($isTabJustifiedGallery);
            }
          }
        });
      });
  },
  /**
   * 分栏控件返回顶部
   */
  tabToTop: () => {
    document
      .querySelectorAll("#article-container .tabs .tab-to-top")
      .forEach((item) => {
        item.addEventListener("click", (e) => {
          cloudchewieFn.scrollToDest(
            cloudchewieFn.getEleTop(
              cloudchewieFn.getParents(e.target, ".tabs")
            ),
            300
          );
        });
      });
  },
  /**
   * 显示/隐藏侧栏专栏卡片
   */
  toggleCardCategory: () => {
    const $cardCategory = document.querySelectorAll(
      "#aside-cat-list .card-category-list-item.parent i"
    );
    if ($cardCategory.length) {
      $cardCategory.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          const $this = e.target;
          $this.classList.toggle("expand");
          const $parentEle = $this.parentNode.nextElementSibling;
          if (cloudchewieFn.isHidden($parentEle)) {
            $parentEle.style.display = "block";
          } else {
            $parentEle.style.display = "none";
          }
        });
      });
    }
  },
  /**
   * 文章过期提醒
   */
  addPostOutdateNotice: () => {
    const data = GLOBAL_CONFIG.noticeOutdate;
    const diffDay = utilsFn.diffDate(GLOBAL_CONFIG_SITE.postUpdate);
    if (diffDay >= data.limitDay) {
      const ele = document.createElement("div");
      ele.className = "post-outdate-notice";
      ele.textContent =
        data.messagePrev + " " + diffDay + " " + data.messageNext;
      const $targetEle = document.getElementById("article-container");
      if (data.position === "top") {
        $targetEle.insertBefore(ele, $targetEle.firstChild);
      } else {
        $targetEle.appendChild(ele);
      }
    }
  },
  /**
   * 懒加载图片
   */
  lazyloadImg: () => {
    window.lazyLoadInstance = new LazyLoad({
      elements_selector: "img",
      threshold: 0,
      data_src: "lazy-src",
    });
  },
  /**
   * 相对日期
   */
  relativeDate: (selector) => {
    selector.forEach((item) => {
      const $this = item;
      const timeVal = $this.getAttribute("datetime");
      $this.innerText = utilsFn.diffDate(timeVal, true);
      $this.style.display = "inline";
    });
  },
  /**
   * 跳转到随机文章
   */
  randomPost: () => {
    var randomIndex = Math.floor(Math.random() * posts.length);
    while (
      posts[randomIndex].url != window.location.pathname &&
      posts[randomIndex].url.startsWith("/posts/")==false
    ) {
      randomIndex = Math.floor(Math.random() * posts.length);
    }
    pjax.loadUrl(posts[randomIndex].url);
  },
  randomPostDeprecated: () => {
    let e = saveToLocal.get("postLinks");
    if (e) {
      for (;;) {
        let t = e[Math.floor(Math.random() * e.length)];
        if (
          t != "/" &&
          t != "/404.html" &&
          t.indexOf("/posts/") != -1 &&
          t != window.location.pathname
        )
          return void pjax.loadUrl(t);
      }
    } else {
      fetch("/sitemap.xml")
        .then((e) => e.text())
        .then((e) => new window.DOMParser().parseFromString(e, "text/xml"))
        .then((e) => {
          let t = e.querySelectorAll("url loc"),
            n = [];
          t.forEach((e) => {
            let t = e.innerHTML.split("/");
            let url = "/";
            for (var i = 3; i < t.length; i++) {
              if (i == t.length - 1) url += t[i];
              else url += t[i] + "/";
            }
            n.push(url);
          }),
            saveToLocal.set("postLinks", n, 0.02),
            cloudchewieFn.randomPost();
        });
    }
  },
  /**
   * 跳转到开往
   */
  trailingBlog: () => {
    window.open(trailingUrl);
  },
  /**
   * 彩蛋
   */
  sweetSnack: () => {
    if (utilsFn.getCookie("daynight") == "NaN")
      cloudchewieFn.day_night_count = 0;
    else
      cloudchewieFn.day_night_count = new Number(utilsFn.getCookie("daynight"));
    setInterval(() => {
      var initDay = -3;
      if (cloudchewieFn.day_night_count + initDay == 0)
        GLOBAL_CONFIG.Snackbar !== undefined &&
          utilsFn.snackLong(
            "冬至·伊始:我的心与爱是不是能够这般纯粹，经受住时空的考验"
          ),
          cloudchewieFn.day_night_count++;
      if (cloudchewieFn.day_night_count + initDay == 20)
        GLOBAL_CONFIG.Snackbar !== undefined &&
          utilsFn.snackLong(
            "交替·新生:月徊而霜凝兮，良人伴我侧；月斜而影绰兮，明镜照我心"
          ),
          cloudchewieFn.day_night_count++;
      if (cloudchewieFn.day_night_count + initDay == 60)
        GLOBAL_CONFIG.Snackbar !== undefined &&
          utilsFn.snackLong(
            "风起·渴盼:桐絮扰动着尘世，恋人缔造着世界；细腻不语的青苔，是我对你的爱恋"
          ),
          cloudchewieFn.day_night_count++;
      if (cloudchewieFn.day_night_count + initDay == 120)
        GLOBAL_CONFIG.Snackbar !== undefined &&
          utilsFn.snackLong(
            "雾霭·探索:越来越浓的雾霭模糊着彼此的视线，越来越厚的障壁阻隔着彼此的心儿"
          ),
          cloudchewieFn.day_night_count++;
      if (cloudchewieFn.day_night_count + initDay == 200)
        GLOBAL_CONFIG.Snackbar !== undefined &&
          utilsFn.snackLong("拨云·成长:生活不全都是恋爱，恋爱却全都是生活"),
          cloudchewieFn.day_night_count++;
      utilsFn.setCookie("daynight", cloudchewieFn.day_night_count.toString());
    }, 500);
  },
  /**
   * 文章统计
   */
  switchPostChart: () => {
    let color =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "#4C4948"
        : "rgba(255,255,255,0.7)";
    if (document.getElementById("posts-chart") && postsOption) {
      try {
        let postsOptionNew = postsOption;
        postsOptionNew.title.textStyle.color = color;
        postsOptionNew.xAxis.nameTextStyle.color = color;
        postsOptionNew.yAxis.nameTextStyle.color = color;
        postsOptionNew.xAxis.axisLabel.color = color;
        postsOptionNew.yAxis.axisLabel.color = color;
        postsOptionNew.xAxis.axisLine.lineStyle.color = color;
        postsOptionNew.yAxis.axisLine.lineStyle.color = color;
        postsOptionNew.series[0].markLine.data[0].label.color = color;
        postsChart.setOption(postsOptionNew);
      } catch (error) {}
    }
    if (document.getElementById("tags-chart") && tagsOption) {
      try {
        let tagsOptionNew = tagsOption;
        tagsOptionNew.title.textStyle.color = color;
        tagsOptionNew.xAxis.nameTextStyle.color = color;
        tagsOptionNew.yAxis.nameTextStyle.color = color;
        tagsOptionNew.xAxis.axisLabel.color = color;
        tagsOptionNew.yAxis.axisLabel.color = color;
        tagsOptionNew.xAxis.axisLine.lineStyle.color = color;
        tagsOptionNew.yAxis.axisLine.lineStyle.color = color;
        tagsOptionNew.series[0].markLine.data[0].label.color = color;
        tagsChart.setOption(tagsOptionNew);
      } catch (error) {}
    }
    if (document.getElementById("categories-chart") && categoriesOption) {
      try {
        let categoriesOptionNew = categoriesOption;
        categoriesOptionNew.title.textStyle.color = color;
        categoriesOptionNew.legend.textStyle.color = color;
        if (!categoryParentFlag) {
          categoriesOptionNew.series[0].label.color = color;
        }
        categoriesChart.setOption(categoriesOptionNew);
      } catch (error) {}
    }
  },
  switchCommentBarrage: function () {
    let commentBarrage = document.querySelector(".comment-barrage");
    if (commentBarrage) {
      if (window.getComputedStyle(commentBarrage).display === "flex") {
        commentBarrage.style.display = "none";
        utilsFn.snack("已关闭评论弹幕");
        document.querySelector(".menu-commentBarrage-text").textContent =
          "显示弹幕";
        document.getElementById("con-barrage") &&
          document.getElementById("con-barrage").classList.remove("checked");
        document.getElementById("switch_commentBarrage") &&
          document
            .getElementById("switch_commentBarrage")
            .classList.remove("checked");
        utilsFn.setLocalStorage("enableCommentBarrage", "false");
      } else {
        commentBarrage.style.display = "flex";
        document.querySelector(".menu-commentBarrage-text").textContent =
          "关闭弹幕";
        document.getElementById("con-barrage") &&
          document.getElementById("con-barrage").classList.add("checked");
        document.getElementById("switch_commentBarrage") &&
          document
            .getElementById("switch_commentBarrage")
            .classList.add("checked");
        utilsFn.snack("已开启评论弹幕");
        utilsFn.setLocalStorage("enableCommentBarrage", "true");
      }
    }
    cloudchewieFn.toggleRightMenu(false);
  },
  // 切换菜单显示热评
  switchRightClickMenuHotReview: function () {
    const postComment = document.getElementById("post-comment");
    const menuCommentBarrageDom = document.getElementById(
      "menu-commentBarrage"
    );
    if (postComment) {
      menuCommentBarrageDom.style.display = "flex";
    } else {
      menuCommentBarrageDom.style.display = "none";
    }
  },
  loadDownloadList: () => {
    const dataDom = $("#download-list-data");
    const listDom = $("#download div.download-list:last-child");
    if (!dataDom || !listDom) return;
    let items = JSON.parse(dataDom.html());
    let html = "";
    items.forEach((element) => {
      html += `<a class="download-list-item-button" target="_blank" rel="noopener" href="${element.href}" title="${element.title}"><span>${element.title}</span></a>`;
    });
    listDom.html(html);
  },
  /**
   * 留言板全屏弹幕
   */
  loadDamaku: () => {
    const e = new EasyDanmaku({
      el: "#danmu",
      line: 10,
      speed: 20,
      hover: !0,
      loop: !0,
    });
    let t = saveToLocal.get("danmu");
    if (t) e.batchSend(t, !0);
    else {
      let n = [];
      function a(e) {
        if (!e) return "";
        return (e = (e = (e = (e = (e = e.replace(
          /<\/*br>|[\s\uFEFF\xA0]+/g,
          ""
        )).replace(/<img.*?>/g, "[图片]")).replace(
          /<a.*?>.*?<\/a>/g,
          "[链接]"
        )).replace(/<pre.*?>.*?<\/pre>/g, "[代码块]")).replace(/<.*?>/g, ""));
      }
      fetch("https://twikoo.api.cloudchewie.com/", {
        method: "POST",
        body: JSON.stringify({
          event: "GET_RECENT_COMMENTS",
          accessToken: "ac9a92b959dc9fc6dda6974ced6759fc",
          includeReply: !1,
          pageSize: 100,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((e) => e.json())
        .then(({ data: t }) => {
          t.forEach((e) => {
            null == e.avatar &&
              (e.avatar =
                "https://cravatar.cn/avatar/d615d5793929e8c7d70eab5f00f7f5f1?d=mp");
            if (e.comment) {
              n.push({
                avatar: e.avatar,
                content: e.nick + "：" + a(e.comment),
              });
            }
          }),
            e.batchSend(n, !0),
            saveToLocal.set("danmu", n, 0.02);
        })
        .catch((e) => {
          utilsFn.snack("评论系统过载,请稍后访问");
        });
    }
    document.getElementById("danmuBtn").innerHTML =
      "<button class=\"hideBtn\" onclick=\"document.getElementById('danmu').classList.remove('hidedanmu')\">显示弹幕</button> <button class=\"hideBtn\" onclick=\"document.getElementById('danmu').classList.add('hidedanmu')\">隐藏弹幕</button>";
  },
  /**
   * 空白页
   */
  waitBlank: () => {
    let blankTextEle = $("#blank-text");
    if (utilsFn.isBlank() && blankTextEle) {
      setTimeout(function () {
        blankTextEle.html("你找到了我，等一等吧");
      }, 30000);
      setTimeout(function () {
        blankTextEle.html("空白下是什么？");
      }, 60000);
      setTimeout(function () {
        blankTextEle.html("你在等待什么？");
      }, 90000);
      setTimeout(function () {
        blankTextEle.html("你希望看到什么？");
      }, 120000);
      setTimeout(function () {
        blankTextEle.html("平静的水面下是什么？");
      }, 150000);
      setTimeout(function () {
        blankTextEle.html("你的心里有答案了吗？");
      }, 180000);
      setTimeout(function () {
        blankTextEle.html("去寻找吧，不要回头！");
      }, 210000);
      setTimeout(function () {
        blankTextEle.html("不要回头！！");
      }, 240000);
      setTimeout(function () {
        blankTextEle.html("不要回头！！！");
      }, 270000);
      setTimeout(function () {
        blankTextEle.html("");
      }, 300000);
    }
  },
  /**
   * =================================================
   *
   * 音乐播放
   *
   * =================================================
   */
  /**
   * 播放/暂停音乐
   */
  toggleMusic: function (changePlay = true) {
    if (!utilsFn.isMusic()) {
      if (!cloudchewie_musicFirst) {
        cloudchewieFn.musicBindEvent();
        cloudchewie_musicFirst = true;
      }
      let msgPlay = '<i class="fas fa-play"></i><span>播放音乐</span>';
      let msgPause = '<i class="fas fa-pause"></i><span>暂停音乐</span>';
      if (cloudchewie_musicPlaying) {
        navMusicEl.classList.remove("playing");
        document.getElementById("menuMusic").innerHTML = msgPlay;
        document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
        document.querySelector("#con-music i").classList = "fas fa-play";
        cloudchewie_musicPlaying = false;
        navMusicEl.classList.remove("stretch");
      } else {
        navMusicEl.classList.add("playing");
        document.getElementById("menuMusic").innerHTML = msgPause;
        document.querySelector("#con-music").classList.add("on");
        document.querySelector("#con-music i").classList = "fas fa-pause";
        cloudchewie_musicPlaying = true;
        navMusicEl.classList.add("stretch");
      }
      if (changePlay)
        document.querySelector("#nav-music meting-js").aplayer.toggle();
    } else {
      let msgPlay = '<i class="fas fa-play"></i><span>播放音乐</span>';
      let msgPause = '<i class="fas fa-pause"></i><span>暂停音乐</span>';
      if (cloudchewie_musicPlaying) {
        document.getElementById("menuMusic").innerHTML = msgPlay;
        document.querySelector("#con-music i").classList = "fas fa-play";
        cloudchewie_musicPlaying = false;
      } else {
        document.getElementById("menuMusic").innerHTML = msgPause;
        document.querySelector("#con-music").classList.add("on");
        document.querySelector("#con-music i").classList = "fas fa-pause";
        cloudchewie_musicPlaying = true;
      }
      if (changePlay)
        cloudMusicEl &&
          cloudMusicEl.querySelector("meting-js").aplayer.toggle();
    }
  },
  /**
   * 左下角播放器切换长度
   */
  musicTelescopic: function () {
    if (navMusicEl.classList.contains("stretch")) {
      navMusicEl.classList.remove("stretch");
    } else {
      navMusicEl.classList.add("stretch");
    }
  },
  /**
   * 上一首
   */
  musicSkipBack: function () {
    navMusicEl.querySelector("meting-js").aplayer.skipBack();
    cloudchewieFn.toggleRightMenu(false);
  },
  /**
   * 下一首
   */
  musicSkipForward: function () {
    navMusicEl.querySelector("meting-js").aplayer.skipForward();
    cloudchewieFn.toggleRightMenu(false);
  },
  /**
   * 获取音乐名称
   */
  musicGetName: function () {
    var x = document.querySelector(".aplayer-title");
    var arr = [];
    for (var i = x.length - 1; i >= 0; i--) {
      arr[i] = x[i].innerText;
    }
    return arr[0];
  },
  /**
   * 绑定左下角播放器事件
   */
  musicBindEvent: function () {
    document
      .querySelector("#nav-music .aplayer-music")
      .addEventListener("click", function () {
        cloudchewieFn.musicTelescopic();
      });
    document
      .querySelector("#nav-music .aplayer-button")
      .addEventListener("click", function () {
        cloudchewieFn.toggleMusic(false);
      });
  },
  /**
   * 左下角播放器事件
   */
  listenNavMusicPause: function () {
    const timer = setInterval(() => {
      if (navMusicEl.querySelector("#nav-music meting-js").aplayer) {
        clearInterval(timer);
        let msgPlay = '<i class="fas fa-play"></i><span>播放音乐</span>';
        let msgPause = '<i class="fas fa-pause"></i><span>暂停音乐</span>';
        navMusicEl
          .querySelector("#nav-music meting-js")
          .aplayer.on("pause", function () {
            navMusicEl.classList.remove("playing");
            document.getElementById("menuMusic").innerHTML = msgPlay;
            document.getElementById("nav-music-hoverTips").innerHTML =
              "音乐已暂停";
            document.querySelector("#con-music i").classList = "fas fa-play";
            cloudchewie_musicPlaying = false;
            navMusicEl.classList.remove("stretch");
          });
        navMusicEl
          .querySelector("#nav-music meting-js")
          .aplayer.on("play", function () {
            navMusicEl.classList.add("playing");
            document.getElementById("menuMusic").innerHTML = msgPause;
            document.querySelector("#con-music i").classList = "fas fa-pause";
            cloudchewie_musicPlaying = true;
            // navMusicEl.classList.add("stretch");
          });
      }
    }, 16);
  },
  /**
   * 播放音乐
   */
  playMusic() {
    if (!utilsFn.isMusic()) {
      const navMusic = document.getElementById("nav-music");
      const navMetingAplayer = navMusic.querySelector("meting-js").aplayer;
      navMetingAplayer.play();
    } else {
      const cloudMusicPage = document.getElementById("cloudMusic-page");
      const metingAplayer = cloudMusicPage.querySelector("meting-js").aplayer;
      metingAplayer.play();
    }
  },
  /**
   * 天籁界面更改背景
   */
  changeMusicBg: function (isChangeBg = true) {
    const cloudMusicBg = document.getElementById("cloud_music_bg");
    if (isChangeBg) {
      const musiccover = document.querySelector(
        "#cloudMusic-page .aplayer-pic"
      );
      if (musiccover)
        cloudMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
      $web_container.style.background = "none";
    } else {
      let timer = setInterval(() => {
        const musiccover = document.querySelector(
          "#cloudMusic-page .aplayer-pic"
        );
        if (musiccover) {
          clearInterval(timer);
          cloudchewieFn.addEventListenerMusic();
          cloudchewieFn.changeMusicBg();
          if (
            document.querySelector("#nav-music meting-js").aplayer &&
            !document.querySelector("#nav-music meting-js").aplayer.audio.paused
          ) {
            cloudchewieFn.toggleMusic();
          }
        }
      }, 100);
    }
    if (
      document.querySelector("#cloudMusic-page .aplayer-title") != null &&
      utilsFn.isNotEmpty(
        document.querySelector("#cloudMusic-page .aplayer-title").innerHTML
      )
    ) {
      document.title =
        document.querySelector("#cloudMusic-page .aplayer-title").innerHTML +
        " - 天籁 | Cloudchewie";
    }
  },
  /**
   * 天籁界面播放器初始化
   */
  initCloudPlayer: function () {
    if (!utilsFn.isMusic()) {
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    var userId = "9516481572";
    var userServer = "netease";
    if (utilsFn.getLocalStorage("playlist") != undefined) {
      var json = JSON.parse(utilsFn.getLocalStorage("playlist"));
      userId = json.id;
      userServer = json.server;
    }
    const cloudMusicPageMeting = document.getElementById(
      "cloudMusic-page-meting"
    );
    if (urlParams.get("id") && urlParams.get("server")) {
      const id = urlParams.get("id");
      const server = urlParams.get("server");
      cloudMusicPageMeting.innerHTML = `<meting-js id="${id}" server=${server} type="playlist" type="playlist" mutex="true" preload="auto" theme="var(--cloudchewie-theme)" order="list" lrc-margin="20" list-max-height="calc(100vh - 169px)!important"></meting-js>`;
    } else {
      cloudMusicPageMeting.innerHTML = `<meting-js id="${userId}" server="${userServer}" type="playlist" mutex="true" preload="auto" theme="var(--cloudchewie-theme)" order="list" lrc-margin="20" list-max-height="calc(100vh - 169px)!important"></meting-js>`;
    }
    cloudchewieFn.changeMusicBg(false);
  },
  /**
   * 天籁界面播放器事件
   */
  addEventListenerMusic: function () {
    const cloudMusicPage = document.getElementById("cloudMusic-page");
    const aplayerIconMenu = cloudMusicPage.querySelector(
      ".aplayer-info .aplayer-time .aplayer-icon-menu"
    );
    const metingAplayer = cloudMusicPage.querySelector("meting-js").aplayer;
    //初始化音量
    metingAplayer.volume(0.8, true);
    metingAplayer.on("loadeddata", function () {
      cloudchewieFn.changeMusicBg();
    });
    aplayerIconMenu.addEventListener("click", function () {
      document.getElementById("menu-mask").style.display = "block";
      document.getElementById("menu-mask").style.animation =
        "0.5s ease 0s 1 normal none running to_show";
      cloudMusicPage.querySelector(
        ".aplayer.aplayer-withlist .aplayer-list"
      ).style.opacity = "1";
    });

    function cloudMusicPageMenuMask() {
      if (!utilsFn.isMusic()) {
        document
          .getElementById("menu-mask")
          .removeEventListener("click", cloudMusicPageMenuMask);
        return;
      }
      cloudMusicPage.querySelector(".aplayer-list") != null &&
        cloudMusicPage
          .querySelector(".aplayer-list")
          .classList.remove("aplayer-list-hide");
    }

    document
      .getElementById("menu-mask")
      .addEventListener("click", cloudMusicPageMenuMask);

    document.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        event.preventDefault();
        metingAplayer.toggle();
      }
      if (event.keyCode === 39) {
        event.preventDefault();
        metingAplayer.skipForward();
      }
      if (event.keyCode === 37) {
        event.preventDefault();
        metingAplayer.skipBack();
      }
      if (event.keyCode === 38) {
        if (musicVolume <= 1) {
          musicVolume += 0.1;
          metingAplayer.volume(musicVolume, true);
        }
      }
      if (event.keyCode === 40) {
        if (musicVolume >= 0) {
          musicVolume += -0.1;
          metingAplayer.volume(musicVolume, true);
        }
      }
    });
  },
  /**
   * 切换歌单
   */
  changeMusicList: async function (
    server,
    id,
    reload = true,
    type = "playlist"
  ) {
    if (!utilsFn.isMusic()) {
      const navMusic = document.getElementById("nav-music");
      if (navMusic == null || navMusic.querySelector("meting-js") == null)
        return;
      const navMetingAplayer = navMusic.querySelector("meting-js").aplayer;
      if (!navMetingAplayer)
        navMusic.querySelector("meting-js").connectedCallback();
      if (reload) {
        navMusic
          .querySelector("meting-js")
          ._fetchSongs(server, id, type)
          .then((songs) => {
            if (navMetingAplayer != null) {
              let isPaused = navMetingAplayer.audio.paused;
              navMetingAplayer.list.clear();
              navMetingAplayer.list.add(songs);
              if (!isPaused) {
                cloudchewieFn.playMusic();
              }
            }
          });
      }
    } else {
      const cloudMusicPage = document.getElementById("cloudMusic-page");
      if (
        cloudMusicPage == null ||
        cloudMusicPage.querySelector("meting-js") == null
      )
        return;
      const metingAplayer = cloudMusicPage.querySelector("meting-js").aplayer;
      if (!metingAplayer) {
        cloudMusicPage.querySelector("meting-js").connectedCallback();
      }
      if (reload) {
        cloudMusicPage
          .querySelector("meting-js")
          ._fetchSongs(server, id, type)
          .then((songs) => {
            if (metingAplayer != null) {
              let isPaused = metingAplayer.audio.paused;
              metingAplayer.list.clear();
              metingAplayer.list.add(songs);
              if (!isPaused) {
                cloudchewieFn.playMusic();
              }
            }
          });
      }
    }
  },
  /**
   * 绑定侧边栏按钮事件
   */
  bindRightSideBtn: () => {
    document.getElementById("rightside").addEventListener("click", (e) => {
      const $target = e.target.id ? e.target : e.target.parentNode;
      switch ($target.id) {
        case "go-up":
          cloudchewieFn.scrollToTop();
          break;
        case "go-down":
          cloudchewieFn.scrollToBottom();
          break;
        case "rightside_config":
          cloudchewieFn.toggleSideBtn($target);
          break;
        case "mobile-toc-button":
          cloudchewieFn.toggleMobileToc();
          break;
        case "readmode":
          cloudchewieFn.toggleReadMode();
          break;
        case "toggle-dark-mode":
          cloudchewieFn.toggleDarkMode();
          break;
        case "hide-aside-btn":
          cloudchewieFn.toggleAside();
          break;
        default:
          break;
      }
    });
  },
  /**
   * =================================================
   *
   * CloudGPT
   *
   * =================================================
   */
  /**
   * 插入挂载DOM
   */
  insertAIDiv: (selector) => {
    // 首先移除现有的 "post-cloudGPT" 类元素（如果有的话）
    cloudchewieFn.removeExistingAIDiv();
    // 获取目标元素
    const targetElement = document.querySelector(selector);
    // 如果没有找到目标元素，不执行任何操作
    if (!targetElement) {
      return;
    }
    // 创建要插入的HTML元素
    const aiDiv = document.createElement("div");
    aiDiv.className = "post-cloudGPT";

    const aiTitleDiv = document.createElement("div");
    aiTitleDiv.className = "cloudGPT-title";
    aiDiv.appendChild(aiTitleDiv);

    const aiIcon = document.createElement("i");
    aiIcon.className = "cloudGPT-title-icon";
    aiTitleDiv.appendChild(aiIcon);

    // 插入 SVG 图标
    aiIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="48px" viewBox="0 0 48 48">
      <title>机器人</title>
      <g id="&#x673A;&#x5668;&#x4EBA;" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d="M34.717885,5.03561087 C36.12744,5.27055371 37.079755,6.60373651 36.84481,8.0132786 L35.7944,14.3153359 L38.375,14.3153359 C43.138415,14.3153359 47,18.1768855 47,22.9402569 L47,34.4401516 C47,39.203523 43.138415,43.0650727 38.375,43.0650727 L9.625,43.0650727 C4.861585,43.0650727 1,39.203523 1,34.4401516 L1,22.9402569 C1,18.1768855 4.861585,14.3153359 9.625,14.3153359 L12.2056,14.3153359 L11.15519,8.0132786 C10.920245,6.60373651 11.87256,5.27055371 13.282115,5.03561087 C14.69167,4.80066802 16.024865,5.7529743 16.25981,7.16251639 L17.40981,14.0624532 C17.423955,14.1470924 17.43373,14.2315017 17.43948,14.3153359 L30.56052,14.3153359 C30.56627,14.2313867 30.576045,14.1470924 30.59019,14.0624532 L31.74019,7.16251639 C31.975135,5.7529743 33.30833,4.80066802 34.717885,5.03561087 Z M38.375,19.4902885 L9.625,19.4902885 C7.719565,19.4902885 6.175,21.0348394 6.175,22.9402569 L6.175,34.4401516 C6.175,36.3455692 7.719565,37.89012 9.625,37.89012 L38.375,37.89012 C40.280435,37.89012 41.825,36.3455692 41.825,34.4401516 L41.825,22.9402569 C41.825,21.0348394 40.280435,19.4902885 38.375,19.4902885 Z M14.8575,23.802749 C16.28649,23.802749 17.445,24.9612484 17.445,26.3902253 L17.445,28.6902043 C17.445,30.1191812 16.28649,31.2776806 14.8575,31.2776806 C13.42851,31.2776806 12.27,30.1191812 12.27,28.6902043 L12.27,26.3902253 C12.27,24.9612484 13.42851,23.802749 14.8575,23.802749 Z M33.1425,23.802749 C34.57149,23.802749 35.73,24.9612484 35.73,26.3902253 L35.73,28.6902043 C35.73,30.1191812 34.57149,31.2776806 33.1425,31.2776806 C31.71351,31.2776806 30.555,30.1191812 30.555,28.6902043 L30.555,26.3902253 C30.555,24.9612484 31.71351,23.802749 33.1425,23.802749 Z" id="&#x5F62;&#x72B6;&#x7ED3;&#x5408;" fill="#444444" fill-rule="nonzero"></path>
      </g>
      </svg>`;

    const aiTitleTextDiv = document.createElement("div");
    aiTitleTextDiv.className = "cloudGPT-title-text";
    aiTitleTextDiv.textContent = "AI摘要";
    aiTitleDiv.appendChild(aiTitleTextDiv);

    const aiTagDiv = document.createElement("div");
    aiTagDiv.className = "cloudGPT-tag";
    aiTagDiv.id = "cloudGPT-tag";
    aiTagDiv.textContent = "CloudGPT";
    aiTitleDiv.appendChild(aiTagDiv);

    const aiExplanationDiv = document.createElement("div");
    aiExplanationDiv.className = "cloudGPT-explanation";
    aiExplanationDiv.innerHTML =
      "生成中..." + '<span class="blinking-cursor"></span>';
    aiDiv.appendChild(aiExplanationDiv); // 将 cloudGPT-explanation 插入到 aiDiv，而不是 aiTitleDiv

    // 将创建的元素插入到目标元素的顶部
    targetElement.insertBefore(aiDiv, targetElement.firstChild);
  },
  /**
   * 移除已有DOM
   */
  removeExistingAIDiv: () => {
    // 查找具有 "post-cloudGPT" 类的元素
    const existingAIDiv = document.querySelector(".post-cloudGPT");
    // 如果找到了这个元素，就从其父元素中删除它
    if (existingAIDiv) {
      existingAIDiv.parentElement.removeChild(existingAIDiv);
    }
  },
  /**
   * 读取文章中的所有文本
   */
  getTitleAndContent: function () {
    try {
      const title = document.title;
      const container = document.querySelector(cloudGPT_postSelector);
      if (!container) {
        return "";
      }
      const paragraphs = container.getElementsByTagName("p");
      const headings = container.querySelectorAll("h1, h2, h3, h4, h5");
      let content = "";

      for (let h of headings) {
        content += h.innerText + " ";
      }

      for (let p of paragraphs) {
        // 移除包含'http'的链接
        const filteredText = p.innerText.replace(/https?:\/\/[^\s]+/g, "");
        content += filteredText;
      }

      const combinedText = title + " " + content;
      let wordLimit = 1000;
      if (typeof cloudGPT_wordLimit !== "undefined") {
        wordLimit = cloudGPT_wordLimit;
      }
      const truncatedText = combinedText.slice(0, wordLimit);
      return truncatedText;
    } catch (e) {
      //   console.error('cloudGPT错误：可能由于一个或多个错误导致没有正常运行，原因出在获取文章容器中的内容失败，或者可能是在文章转换过程中失败。', e);
      return "";
    }
  },
  /**
   * 获取数据
   */
  fetchcloudGPT: async function (content) {
    if (!cloudGPT_key) {
      return "没有获取到key，代码可能没有安装正确。如果你需要在cloudchewieCPT文件引用前定义cloudGPT_key变量。详细请查看文档。";
    }

    if (cloudGPT_key === "5Q5mpqRK5DkwT1X9Gi5e") {
      return "请购买 key 使用，如果你能看到此条内容，则说明代码安装正确。";
    }

    const apiUrl = `https://summary.tianli0.top/?content=${encodeURIComponent(
      content
    )}&key=${encodeURIComponent(cloudGPT_key)}`;
    const timeout = 20000;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(apiUrl, { signal: controller.signal });
      if (response.ok) {
        const data = await response.json();
        return data.summary;
      } else {
        if (response.status === 402) {
          document.querySelectorAll(".post-cloudGPT").forEach((el) => {
            el.style.display = "none";
          });
        }
        throw new Error("CloudGPT：余额不足，请充值后请求新的文章");
      }
    } catch (error) {
      if (error.name === "AbortError") {
        if (window.location.hostname === "localhost") {
          return "获取文章摘要超时。请勿在本地主机上测试 API 密钥。";
        } else {
          return "获取文章摘要超时。当你出现这个问题时，可能是key或者绑定的域名不正确。也可能是因为文章过长导致的 AI 运算量过大，您可以稍等一下然后刷新页面重试。";
        }
      } else {
        return "获取文章摘要失败，请稍后再试。";
      }
    }
  },
  /**
   * 内容展示动画
   */
  aiShowAnimation: function (text) {
    const element = document.querySelector(".cloudGPT-explanation");
    if (!element) {
      return;
    }

    if (cloudGPTIsRunning) {
      return;
    }
    cloudGPTIsRunning = true;
    const typingDelay = 25;
    const waitingTime = 1000;
    const punctuationDelayMultiplier = 6;

    element.style.display = "block";
    element.innerHTML = "生成中..." + '<span class="blinking-cursor"></span>';

    let animationRunning = false;
    let currentIndex = 0;
    let initialAnimation = true;

    function isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    let lastUpdateTime = performance.now();

    function type() {
      if (currentIndex < text.length && animationRunning) {
        const currentTime = performance.now();
        const timeDiff = currentTime - lastUpdateTime;

        const letter = text.slice(currentIndex, currentIndex + 1);
        const isPunctuation = /[，。！、？,.!?]/.test(letter);
        const delay = isPunctuation
          ? typingDelay * punctuationDelayMultiplier
          : typingDelay;

        if (timeDiff >= delay) {
          element.innerText = text.slice(0, currentIndex + 1);
          lastUpdateTime = currentTime;
          currentIndex++;

          if (currentIndex < text.length) {
            element.innerHTML =
              text.slice(0, currentIndex) +
              '<span class="blinking-cursor"></span>';
          } else {
            element.innerHTML = text;
            element.style.display = "block";
            cloudGPTIsRunning = false;
          }
        }
        requestAnimationFrame(type);
      }
    }

    function checkVisibility() {
      if (isInViewport(element)) {
        if (!animationRunning) {
          animationRunning = true;
          if (initialAnimation) {
            setTimeout(() => {
              type();
              initialAnimation = false;
            }, waitingTime);
          } else {
            type();
          }
        }
      } else {
        animationRunning = false;
      }
    }

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);

    function checkVisibility() {
      if (isInViewport(element)) {
        if (!animationRunning) {
          animationRunning = true;
          if (initialAnimation) {
            setTimeout(() => {
              type();
              initialAnimation = false;
            }, waitingTime);
          } else {
            type();
          }
        }
      } else {
        animationRunning = false;
      }
    }

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);

    // 使用 setInterval 添加定时器，周期性检查元素可见性
    const visibilityCheckInterval = setInterval(checkVisibility, 500);

    // 当动画完成后，清除定时器
    if (!cloudGPTIsRunning) {
      clearInterval(visibilityCheckInterval);
    }

    // Trigger initial visibility check
    checkVisibility();
  },
  /**
   * 运行CloudGPT
   */
  runcloudGPT: () => {
    if (!enableGPT) return;
    cloudchewieFn.insertAIDiv(cloudGPT_postSelector);
    const content = cloudchewieFn.getTitleAndContent();
    cloudchewieFn.fetchcloudGPT(content).then((res) => {
      var metaDescription = document.querySelector('meta[name="description"]');
      var summary = "";
      if (metaDescription) {
        summary = `文章简介：${metaDescription.getAttribute(
          "content"
        )}<br/>文章摘要：`;
      }
      summary += res;
      cloudchewieFn.aiShowAnimation(res);
    });
  },
  /**
   * 检查并运行CloudGPT
   */
  checkURLAndRunGPT: () => {
    if (typeof cloudGPT_postURL === "undefined") {
      cloudchewieFn.runcloudGPT();
      return;
    }
    try {
      const wildcardToRegExp = (s) => {
        return new RegExp(
          "^" + s.split(/\*+/).map(regExpEscape).join(".*") + "$"
        );
      };

      const regExpEscape = (s) => {
        return s.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
      };

      const urlPattern = wildcardToRegExp(cloudGPT_postURL);
      const currentURL = window.location.href;

      if (urlPattern.test(currentURL)) {
        cloudchewieFn.runcloudGPT();
      }
    } catch (error) {}
  },
  toggleSearch: () => {
    if ($("#algolia-search .search-dialog").css("display") == "none") {
      document.addEventListener("keydown", function f(event) {
        if (event.code === "Escape") {
          if ($("#algolia-search .search-dialog").css("display") != "none") {
            $("#algolia-search .search-dialog").fadeToggle("fast");
            $("#search-mask").fadeToggle("fast");
          }
          document.removeEventListener("keydown", f);
        }
      });
      setTimeout(() => {
        document.querySelector("#algolia-search .ais-SearchBox-input").focus();
      }, 100);
    }
    $("#algolia-search .search-dialog").fadeToggle("fast");
    $("#search-mask").fadeToggle("fast");
  },
  shortcutKeyDownEvent: (event) => {
    const isEscapeKeyPressed = event.keyCode === 27;
    const isShiftKeyPressed = event.shiftKey;
    const isKeyboardEnabled =
      utilsFn.getLocalStorage("enableShortcut") == "true";
    const isInInputField = cloudchewieFn.typing;

    if (isEscapeKeyPressed) {
      consoleFn.closeConsole();
      cloudchewieFn.toggleRightMenu(false);
    }
    const shortcutKeyDelay = GLOBAL_CONFIG.shortcut.delay
      ? GLOBAL_CONFIG.shortcut.delay
      : 100;
    const shortcutKeyShiftDelay = GLOBAL_CONFIG.shortcut.shiftDelay
      ? GLOBAL_CONFIG.shortcut.shiftDelay
      : 200;
    if (isKeyboardEnabled && isShiftKeyPressed && !isInInputField) {
      cloudchewieFn.keyUpShiftDelayEvent_timeoutId = setTimeout(() => {
        switch (event.keyCode) {
          case 16:
            cloudchewieFn.keyUpEvent_timeoutId = setTimeout(() => {
              document.querySelector("#keyboard-tips").classList.add("show");
            }, shortcutKeyShiftDelay);
            break;
          case 67:
            consoleFn.toggleConsole();
            break;
          case 80:
            if (utilsFn.getLocalStorage("enableAPlayer") == true) {
              cloudchewieFn.toggleMusic();
            } else {
              utilsFn.snack("已禁用APlayer，该快捷键不生效");
            }
            break;
          // case 75:
          //   consoleFn.toggleShortcut();
          //   const keyboardTips = document.querySelector("#keyboard-tips");
          //   keyboardTips.classList.remove("show");
          //   break;
          case 76:
            pjax.loadUrl("/love");
            break;
          case 82:
            cloudchewieFn.randomPost();
            break;
          case 83:
            cloudchewieFn.toggleSearch();
            break;
          case 72:
            pjax.loadUrl("/");
            break;
          case 68:
            cloudchewieFn.toggleDarkMode();
            break;
          case 69:
            pjax.loadUrl("/memos/");
            break;
          case 71:
            pjax.loadUrl("/gallery/");
            break;
          case 84:
            pjax.loadUrl("/treasure/");
            break;
          case 77:
            pjax.loadUrl("/music/");
            break;
          case 65:
            pjax.loadUrl("/about/");
            break;
          default:
            break;
        }
        event.preventDefault();
      }, shortcutKeyDelay);
    }
  },
  shortcutKeyUpEvent: (event) => {
    cloudchewieFn.keyUpEvent_timeoutId &&
      clearTimeout(cloudchewieFn.keyUpEvent_timeoutId);
    cloudchewieFn.keyUpShiftDelayEvent_timeoutId &&
      clearTimeout(cloudchewieFn.keyUpShiftDelayEvent_timeoutId);
    if (event.keyCode === 16) {
      const keyboardTips = document.querySelector("#keyboard-tips");
      keyboardTips.classList.remove("show");
    }
  },
  // 是否开启快捷键
  executeShortcutKeyFunction: () => {
    if (utilsFn.getLocalStorage("enableShortcut") == undefined) {
      utilsFn.setLocalStorage("enableShortcut", "false");
    }
    function changeShortcutListener() {
      window.removeEventListener("keydown", cloudchewieFn.shortcutKeyDownEvent);
      window.removeEventListener("keyup", cloudchewieFn.shortcutKeyUpEvent);
      if (utilsFn.getLocalStorage("enableShortcut") == "true") {
        window.addEventListener("keydown", cloudchewieFn.shortcutKeyDownEvent);
        window.addEventListener("keyup", cloudchewieFn.shortcutKeyUpEvent);
      }
    }

    window.onfocus = function () {
      document.getElementById("keyboard-tips").classList.remove("show");
    };

    changeShortcutListener();
  },
  // 注入辅助功能按键
  injectAccessKey: (doc, win) => {
    // 操作系统和浏览器设备检测
    var ua = navigator.userAgent;

    var system = "windows";

    if (/Mac\sOS\sX/i.test(ua)) {
      system = "mac";
    }

    // 浏览器判断
    var browser = "chrome";
    if (typeof doc.mozFullScreen != "undefined") {
      browser = "moz";
    } else if (
      typeof doc.msHidden != "undefined" ||
      typeof doc.hidden == "undefined"
    ) {
      browser = "ie";
    }

    // 快捷键组合
    var keyPrefix = {
      windows:
        browser == "moz"
          ? {
              ctrlKey: false,
              altKey: true,
              shiftKey: true,
            }
          : {
              ctrlKey: false,
              altKey: true,
              shiftKey: false,
            },
      mac: {
        ctrlKey: true,
        altKey: true,
        shiftKey: false,
      },
    }[system];

    // 获取字符Unicode值方法
    var U = function (a, b) {
      if (!a) return "";
      for (var b = b || "x", c = "", d = 0, e; d < a.length; d += 1)
        a.charCodeAt(d) >= 55296 && a.charCodeAt(d) <= 56319
          ? ((e = (
              65536 +
              1024 * (Number(a.charCodeAt(d)) - 55296) +
              Number(a.charCodeAt(d + 1)) -
              56320
            ).toString(16)),
            (d += 1))
          : (e = a.charCodeAt(d).toString(16)),
          (c += b + e);
      return c.substr(b.length);
    };

    // 提示当前元素快捷键的方法
    var timerTips = null;
    var tips = function (arrEles) {
      // 已经显示中，忽略
      if (doc.hasTipsShow) {
        return;
      }
      // 页面的滚动高度
      var scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
      var scrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft;

      // 遍历创建提示元素
      arrEles.forEach(function (ele) {
        // 如果元素隐藏，也忽略
        if (ele.clientHeight * ele.clientWidth == 0) {
          return;
        }

        var accesskey = ele.getAttribute("accesskey");
        var arrAccesskey = [];
        for (var key in keyPrefix) {
          if (keyPrefix[key]) {
            arrAccesskey.push(key);
          }
        }
        arrAccesskey.push(accesskey);

        // 当前元素相对于文档的偏移
        var bounding = ele.getBoundingClientRect();

        // 创建tips提示元素
        var div = document.createElement("div");
        div.className = "AK_Tips";
        div.setAttribute(
          "style",
          "position:fixed;top:" +
            bounding.top +
            "px;left:" +
            (bounding.left + scrollLeft) +
            'px;z-index:9999;font-family:consolas,"Liberation Mono",courier,monospace;font-size:12px;border-radius:8px;color:#fff;background:rgba(0,0,0,.75);opacity:0.8;line-height:13px;padding:3px 3px;user-select: none;pointer-events: none;'
        );
        div.innerHTML = arrAccesskey
          .map(function (key) {
            return (
              '<kbd style="font-family:inherit;">' +
              key.replace("Key", "") +
              "</kbd>"
            );
          })
          .join("+");

        document.body.appendChild(div);

        div.fromTarget = ele;
      });

      // 标记，避免重复生成
      doc.hasTipsShow = true;

      // 一段时间隐藏
      timerTips = setTimeout(function () {
        removeTips();
      }, 3000);
    };
    // 隐藏tips
    var removeTips = function () {
      clearTimeout(timerTips);
      // 移除所有的快捷键提示
      var elesTips = doc.querySelectorAll(".AK_Tips");
      [].slice.call(elesTips).forEach(function (ele) {
        if (ele.fromTarget) {
          ele.fromTarget.hasTipsShow = null;
        }
        doc.body.removeChild(ele);
      });
      doc.hasTipsShow = null;
    };

    if (doc.addEventListener) {
      // IE9+
      doc.addEventListener("keydown", function (event) {
        // 当前元素是否是可输入的input或者textarea
        var isTargetInputable = false;
        var eleTarget = event.target || doc.activeElement;
        var tagName = eleTarget.tagName.toLowerCase();
        if (
          tagName == "textarea" ||
          (tagName == "input" &&
            /checkbox|radio|select|file|button|image|hidden/.test(
              eleTarget.type
            ) == false)
        ) {
          isTargetInputable = true;
        }

        // 遍历所有设置了accesskey的符合HTML4.0.1规范的元素
        // 包括<a>, <area>, <button>, <input>, <label>, <legend>以及<textarea>
        var elesOwnAccesskey = doc.querySelectorAll(
          "a[accesskey],area[accesskey],button[accesskey],input[accesskey],label[accesskey],legend[accesskey],textarea[accesskey]"
        );
        if (elesOwnAccesskey.length == 0) {
          return;
        }
        // 对象列表转换成数组
        var arrElesOwnAccesskey = [].slice.call(elesOwnAccesskey);
        // 进行遍历
        var arrAcceeekey = arrElesOwnAccesskey.map(function (ele) {
          return ele.getAttribute("accesskey");
        });
        // windows下图下直接event.key就是按下的键对于的内容，但OS X系统却没有key属性，有的是event.keyIdentifier，表示字符的Unicode值
        // 根据这个判断按键是否有对应的匹配
        var indexMatch = -1;
        arrAcceeekey.forEach(function (accesskey, index) {
          if (
            (event.key && event.key == accesskey) ||
            (event.keyIdentifier &&
              parseInt(
                event.keyIdentifier.toLowerCase().replace("u+", ""),
                16
              ) == parseInt(U(accesskey), 16))
          ) {
            indexMatch = index;
            return false;
          }
        });

        // 1. 单独按下某个键的匹配支持
        if (
          event.altKey == false &&
          event.shiftKey == false &&
          event.ctrlKey == false
        ) {
          if (isTargetInputable) {
            return;
          }
          // focus高亮
          if (arrElesOwnAccesskey[indexMatch]) {
            arrElesOwnAccesskey[indexMatch].focus();
            // 阻止内容输入
            event.preventDefault();
          }
          // 2. shift + '?'(keyCode=191)键的提示行为支持
        } else if (
          event.altKey == false &&
          event.shiftKey == true &&
          event.ctrlKey == false
        ) {
          if (event.keyCode == 191 && !isTargetInputable) {
            doc.hasTipsShow ? removeTips() : tips(arrElesOwnAccesskey);
          }
          // 3. 增加accesskey生效的前置键按下的提示行为
        } else if (
          event.altKey == keyPrefix.altKey &&
          event.shiftKey == keyPrefix.shiftKey &&
          event.ctrlKey == keyPrefix.ctrlKey
        ) {
          if (indexMatch == -1) {
            event.preventDefault();
            doc.hasTipsShow ? removeTips() : tips(arrElesOwnAccesskey);
          } else {
            removeTips();
          }

          // 4. IE浏览器和其他浏览器行为一致的处理
          if (
            browser == "ie" &&
            arrElesOwnAccesskey[indexMatch] &&
            !isTargetInputable
          ) {
            // click行为触发
            arrElesOwnAccesskey[indexMatch].click();
          }
        }
      });
      doc.addEventListener("mousedown", function (event) {
        removeTips();
      });
    }
  },
};
/**
 * =================================================
 *
 * 代码高亮
 *
 * =================================================
 */
const addHighlight = function () {
  const highLight = GLOBAL_CONFIG.highlight;
  if (!highLight) return;

  const isHighlightCopy = highLight.highlightCopy;
  const isHighlightLang = highLight.highlightLang;
  const isHighlightShrink = GLOBAL_CONFIG_SITE.isHighlightShrink;
  const highlightHeightLimit = highLight.highlightHeightLimit;
  const isShowTool =
    isHighlightCopy || isHighlightLang || isHighlightShrink !== undefined;
  const $figureHighlight =
    highLight.plugin === "highlighjs"
      ? document.querySelectorAll("figure.highlight")
      : document.querySelectorAll('pre[class*="language-"]');

  if (!((isShowTool || highlightHeightLimit) && $figureHighlight.length))
    return;

  const isPrismjs = highLight.plugin === "prismjs";

  let highlightShrinkEle = "";
  let highlightCopyEle = "";
  const highlightShrinkClass = isHighlightShrink === true ? "closed" : "";

  if (isHighlightShrink !== undefined) {
    highlightShrinkEle = `<i class="fas fa-angle-down expand ${highlightShrinkClass}"></i>`;
  }

  if (isHighlightCopy) {
    highlightCopyEle =
      '<div class="copy-notice"></div><i class="fas fa-paste copy-button"></i>';
  }

  const copy = (text, ctx) => {
    if (
      document.queryCommandSupported &&
      document.queryCommandSupported("copy")
    ) {
      document.execCommand("copy");
      if (GLOBAL_CONFIG.Snackbar !== undefined) {
        utilsFn.snack(GLOBAL_CONFIG.copy.success);
      } else {
        const prevEle = ctx.previousElementSibling;
        prevEle.innerText = GLOBAL_CONFIG.copy.success;
        prevEle.style.opacity = 1;
        setTimeout(() => {
          prevEle.style.opacity = 0;
        }, 700);
      }
    } else {
      if (GLOBAL_CONFIG.Snackbar !== undefined) {
        utilsFn.snack(GLOBAL_CONFIG.copy.noSupport);
      } else {
        ctx.previousElementSibling.innerText = GLOBAL_CONFIG.copy.noSupport;
      }
    }
  };
  // click events
  const highlightCopyFn = (ele) => {
    const $buttonParent = ele.parentNode;
    $buttonParent.classList.add("copy-true");
    const selection = window.getSelection();
    const range = document.createRange();
    if (isPrismjs)
      range.selectNodeContents($buttonParent.querySelectorAll("pre code")[0]);
    else
      range.selectNodeContents(
        $buttonParent.querySelectorAll("table .code pre")[0]
      );
    selection.removeAllRanges();
    selection.addRange(range);
    const text = selection.toString();
    copy(text, ele.lastChild);
    selection.removeAllRanges();
    $buttonParent.classList.remove("copy-true");
  };
  const highlightShrinkFn = (ele) => {
    ele.classList.toggle("closed");
  };

  const highlightToolsFn = function (e) {
    const $target = e.target.classList;
    if ($target.contains("expand")) highlightShrinkFn(this);
    else if ($target.contains("copy-button")) highlightCopyFn(this);
  };

  const expandCode = function () {
    this.classList.toggle("expand-done");
  };

  function createEle(lang, item, service) {
    const fragment = document.createDocumentFragment();

    if (isShowTool) {
      const hlTools = document.createElement("div");
      hlTools.className = `highlight-tools ${highlightShrinkClass}`;
      hlTools.innerHTML = highlightShrinkEle + lang + highlightCopyEle;
      hlTools.addEventListener("click", highlightToolsFn);
      fragment.appendChild(hlTools);
    }

    if (highlightHeightLimit && item.offsetHeight > highlightHeightLimit + 30) {
      const ele = document.createElement("div");
      ele.className = "code-expand-btn";
      ele.innerHTML = '<i class="fas fa-angle-double-down"></i>';
      ele.addEventListener("click", expandCode);
      fragment.appendChild(ele);
    }

    if (service === "hl") {
      item.insertBefore(fragment, item.firstChild);
    } else {
      item.parentNode.insertBefore(fragment, item);
    }
  }

  if (isHighlightLang) {
    if (isPrismjs) {
      $figureHighlight.forEach(function (item) {
        const langName = item.getAttribute("data-language")
          ? item.getAttribute("data-language")
          : "Code";
        const highlightLangEle = `<div class="code-lang">${langName}</div>`;
        cloudchewieFn.wrap(item, "figure", { class: "highlight" });
        createEle(highlightLangEle, item);
      });
    } else {
      $figureHighlight.forEach(function (item) {
        let langName = item.getAttribute("class").split(" ")[1];
        if (langName === "plain" || langName === undefined) langName = "Code";
        const highlightLangEle = `<div class="code-lang">${langName}</div>`;
        createEle(highlightLangEle, item, "hl");
      });
    }
  } else {
    if (isPrismjs) {
      $figureHighlight.forEach(function (item) {
        cloudchewieFn.wrap(item, "figure", { class: "highlight" });
        createEle("", item);
      });
    } else {
      $figureHighlight.forEach(function (item) {
        createEle("", item, "hl");
      });
    }
  }
};
/**
 * =================================================
 *
 * 移动端侧栏事件
 *
 * =================================================
 */
const mobileSidebarFn = {
  dragStartX: 0,
  mobileSidebarOpen: false,
  onDragStart: (event) => {
    // event.preventDefault();
    mobileSidebarFn.dragStartX = mobileSidebarFn.getEventX(event);
    $web_box.style.transition = "all .3s";
    mobileSidebarFn.addMoveEndListeners(
      mobileSidebarFn.onDragMove,
      mobileSidebarFn.onDragEnd
    );
  },
  onDragMove: (event) => {
    const deltaX =
      mobileSidebarFn.getEventX(event) - mobileSidebarFn.dragStartX;
    if (deltaX < 0) {
      const screenWidth = window.innerWidth;
      const translateX = Math.min(-300, ((-1 * deltaX) / screenWidth) * 300);
      const scale = Math.min(1, 0.86 + (deltaX / screenWidth) * (1 - 0.86));
      $web_box.style.transform = `translate3d(-${translateX}px, 0px, 0px) scale3d(${scale}, ${scale}, 1)`;
    }
  },
  onDragMove: (event) => {
    const deltaX =
      mobileSidebarFn.getEventX(event) - mobileSidebarFn.dragStartX;
    if (deltaX < 0) {
      const screenWidth = window.innerWidth;
      const translateX = Math.min(-300, ((-1 * deltaX) / screenWidth) * 300);
      const scale = Math.min(1, 0.86 + (deltaX / screenWidth) * (1 - 0.86));
      $web_box.style.transform = `translate3d(-${translateX}px, 0px, 0px) scale3d(${scale}, ${scale}, 1)`;
    }
  },
  onDragEnd: (event) => {
    const screenWidth = window.innerWidth;
    if (mobileSidebarFn.getEventX(event) <= screenWidth / 1.5) {
      mobileSidebarFn.completeTransition();
    } else {
      mobileSidebarFn.resetTransition();
    }
    mobileSidebarFn.removeMoveEndListeners(
      mobileSidebarFn.onDragMove,
      mobileSidebarFn.onDragEnd
    );
  },
  completeTransition: () => {
    $web_box.style.transition = "all 0.3s ease-out";
    $web_box.style.transform = "none";
    mobileSidebarFn.close();
    mobileSidebarFn.removeMoveEndListeners(
      mobileSidebarFn.onDragMove,
      mobileSidebarFn.onDragEnd
    );
  },
  resetTransition: () => {
    $web_box.style.transition = "";
    $web_box.style.transform = "";
  },
  getEventX: (event) => {
    return event.type.startsWith("touch")
      ? event.changedTouches[0].clientX
      : event.clientX;
  },
  addMoveEndListeners: (moveHandler, endHandler) => {
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", endHandler);
    document.addEventListener("touchmove", moveHandler, { passive: false });
    document.addEventListener("touchend", endHandler);
  },
  removeMoveEndListeners: (moveHandler, endHandler) => {
    document.removeEventListener("mousemove", moveHandler);
    document.removeEventListener("mouseup", endHandler);
    document.removeEventListener("touchmove", moveHandler);
    document.removeEventListener("touchend", endHandler);
  },
  open: () => {
    cloudchewieFn.sidebarPaddingR();
    $sidebarMenus.classList.add("open");
    $rightside.classList.add("hide");
    document.body.style.overflow = "hidden";
    utilsFn.animateIn(document.getElementById("menu-mask"), "to_show 0.5s");
    document.getElementById("sidebar-menus").classList.add("open");
    mobileSidebarFn.mobileSidebarOpen = true;
    $web_box.classList.add("open");
    $web_box.addEventListener("mousedown", mobileSidebarFn.onDragStart);
    $web_box.addEventListener("touchstart", mobileSidebarFn.onDragStart, {
      passive: false,
    });
    if (utilsFn.isMusic()) {
      $web_container.style.background = "rgb(255 255 255 / 20%)";
    } else {
      $web_container.style.background = "var(--cloudchewie-background)";
    }
  },
  close: () => {
    $sidebarMenus.classList.remove("open");
    const $body = document.body;
    $body.style.overflow = "";
    $rightside.classList.remove("hide");
    $body.style.paddingRight = "";
    utilsFn.animateOut(document.getElementById("menu-mask"), "to_hide 0.5s");
    document.getElementById("sidebar-menus").classList.remove("open");
    mobileSidebarFn.mobileSidebarOpen = false;
    $web_box.classList.remove("open");
    $web_container.style.background = "none";
    document.getElementById("nav-totop").classList.remove("long");
    // $web_box.removeEventListener("mousedown", mobileSidebarFn.onDragStart);
    // $web_box.removeEventListener("touchstart", mobileSidebarFn.onDragStart, {
    //   passive: false,
    // });
  },
};
/**
 * =================================================
 *
 * 控制台相关
 *
 * =================================================
 */
const consoleFn = {
  /**
   * 打开/关闭功能
   */
  toggleConsole: () => {
    $("#consoleWindow").fadeToggle("fast");
    $("#console-mask").fadeToggle("fast");
    if ($("#consoleWindow").css("display") != "none")
      $("#consoleWindow").css("display", "flex");
    if ($("#consoleWindow").css("display") == "none") {
      //取消模糊效果
      document.getElementById("settingStyle").innerText = `
    *,*:not(.card-info)::before,*::after{
        -webkit-backdrop-filter: none!important;
        backdrop-filter: none!important;
        -webkit-filter: none!important;
        filter: none!important;
    }`;
    } else {
      document.getElementById("settingStyle").innerText = "";
    }
  },
  showConsole: () => {
    $("#consoleWindow").fadeIn("fast");
    $("#console-mask").fadeIn("fast");
    if ($("#consoleWindow").css("display") != "none")
      $("#consoleWindow").css("display", "flex");
    if ($("#consoleWindow").css("display") == "none") {
      //取消模糊效果
      document.getElementById("settingStyle").innerText = `
  *,*:not(.card-info)::before,*::after{
      -webkit-backdrop-filter: none!important;
      backdrop-filter: none!important;
      -webkit-filter: none!important;
      filter: none!important;
  }`;
    } else {
      document.getElementById("settingStyle").innerText = "";
    }
  },
  closeConsole: () => {
    $("#consoleWindow").fadeOut("fast");
    $("#console-mask").fadeOut("fast");
    if ($("#consoleWindow").css("display") != "none")
      $("#consoleWindow").css("display", "flex");
    if ($("#consoleWindow").css("display") == "none") {
      //取消模糊效果
      document.getElementById("settingStyle").innerText = `
  *,*:not(.card-info)::before,*::after{
      -webkit-backdrop-filter: none!important;
      backdrop-filter: none!important;
      -webkit-filter: none!important;
      filter: none!important;
  }`;
    } else {
      document.getElementById("settingStyle").innerText = "";
    }
  },
  /**
   * 加载设置
   */
  // 加载设置
  loadSetting: () => {
    $("#consoleBackButton").css("visibility", "hidden");
    $(".consoleSetting").hide();
    $("#consoleWindow").hide();
    //加载是否适应文章封面颜色
    if (utilsFn.getLocalStorage("enableAutoColor") == undefined) {
      utilsFn.setLocalStorage("enableAutoColor", "false");
    }
    if (utilsFn.getLocalStorage("enableAutoColor") == "true") {
      document.getElementById("con-toggleAutoColor").checked = true;
      if (GLOBAL_CONFIG_SITE.isPost) {
        consoleFn.changeAutoColor(true);
      }
    }
    if (!GLOBAL_CONFIG_SITE.isPost) {
      consoleFn.setDefaultThemeColor();
    }
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
    //侧栏居左
    if (utilsFn.getLocalStorage("asideLeft") == undefined) {
      utilsFn.setLocalStorage("asideLeft", "true");
    }
    if (utilsFn.getLocalStorage("asideLeft") == "false") {
      document.documentElement.setAttribute("aside-position", "right");
    } else {
      document.documentElement.setAttribute("aside-position", "left");
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
    //加载是否显示弹幕
    if (utilsFn.getLocalStorage("enableCommentBarrage") == undefined) {
      utilsFn.setLocalStorage("enableCommentBarrage", "true");
    }
    if (utilsFn.getLocalStorage("enableCommentBarrage") == "false") {
    } else {
      document.getElementById("con-barrage") &&
        document.getElementById("con-barrage").classList.add("checked");
      document.getElementById("switch_commentBarrage") &&
        document
          .getElementById("switch_commentBarrage")
          .classList.add("checked");
    }
    // 加载网页背景
    try {
      let data = utilsFn.getLocalStorage("blogBackground", 1440);
      if (data) consoleFn.changeBackground(data, 1);
      else utilsFn.removeLocalStorage("blogBackground");
    } catch (error) {
      utilsFn.removeLocalStorage("blogBackground");
    }
    // 自动主题色
    if (utilsFn.getLocalStorage("enableAutoTheme") == "true") {
      document.getElementById("con-toggleAutoTheme").checked = true;
      $("#con-mode,.rightMenu-item:has(.fa-adjust)").hide();
      var time = new Date();
      if (time.getHours() <= 7 || time.getHours() >= 19) {
        activateDarkMode();
        utilsFn.removeLocalStorage("theme");
      } else {
        activateLightMode();
        utilsFn.removeLocalStorage("theme");
      }
    }
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
    //加载是否显示帧率
    if (utilsFn.getLocalStorage("enableFPS") == undefined) {
      utilsFn.setLocalStorage("enableFPS", "true");
    }
    if (utilsFn.getLocalStorage("enableFPS") == "true") {
      document.getElementById("con-toggleFPS").checked = true;
      document.getElementById("fps").style.display = "block";
    } else {
      document.getElementById("con-toggleFPS").checked = false;
      document.getElementById("fps").style.display = "none";
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
    if (utilsFn.getLocalStorage("playlist") != undefined) {
      var json = JSON.parse(utilsFn.getLocalStorage("playlist"));
      consoleFn.changeAPlayerList(json.id, json.server, false, false);
    }
    consoleFn.loadCustomPlaylists();
    document
      .getElementById("console-mask")
      .addEventListener("click", consoleFn.closeConsole);
    document
      .getElementById("console-button")
      .addEventListener("click", consoleFn.showConsole);
    // document
    //   .getElementById("darkmode-button")
    //   .addEventListener("click", cloudchewieFn.toggleDarkMode);
    window.onresize = () => {
      if (!utilsFn.isFullScreen()) {
        $("#con-fullscreen").removeClass("checked");
      }
    };
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
    $(document).ready(function () {
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.attributeName === "data-theme") {
            if (GLOBAL_CONFIG_SITE.isPost) {
              consoleFn.changeAutoColor(false);
            }
          }
        });
      });
      observer.observe($("html")[0], { attributes: true });
    });
  },
  /**
   * 重置设置
   */
  resetSettings: () => {
    utilsFn.removeLocalStorage("blogBackground");
    utilsFn.removeLocalStorage("enableStarBackground");
    utilsFn.removeLocalStorage("isLeftAside");
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
    utilsFn.removeLocalStorage("blogBackground");
    window.location.reload();
  },
  /**
   * 切换背景
   */
  changeBackground: (s, flag) => {
    let bg = document.getElementById("web_bg");
    let wave4 = document.querySelector(".parallax > use:nth-child(4)");
    if (s.charAt(0) == "#") {
      bg.style.background = "none";
      bg.style.backgroundColor = s;
      if (wave4) wave4.style.fill = s;
    } else {
      bg.style.background = s;
    }
    if (!flag) {
      utilsFn.setLocalStorage("blogBackground", s);
    }
  },
  /**
   * 设置默认主题色
   */
  setDefaultThemeColor: () => {
    document.getElementById("themeColor").innerText = "";
  },
  /**
   * 设置主题色
   */
  setThemeColor: (r, g, b) => {
    document.getElementById(
      "themeColor"
    ).innerText = `:root{--cloudchewie-theme:rgb(${r}, ${g}, ${b})!important;--btn-bg:rgb(${r}, ${g}, ${b})!important;--btn-hover-color:rgba(${r}, ${g}, ${b},0.8)!important;--text-bg-hover:rgba(${r}, ${g}, ${b},0.5)!important;--km-toc-active:rgba(${r}, ${g}, ${b},0.8)!important;--km-toc-hover:rgba(${r}, ${g}, ${b},0.6)!important;}`;
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
  },
  /**
   * 保存自定义歌单
   */
  saveCustomPlaylist: (id, server) => {
    var raw = utilsFn.getLocalStorage("customPlaylists");
    var customPlayLists = raw ? JSON.parse(raw) : [];
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
      $(`.playlist-container > div:nth-child(${delete_index + 4})`).remove();
      utilsFn.setLocalStorage(
        "customPlaylists",
        JSON.stringify(customPlayLists)
      );
      GLOBAL_CONFIG.Snackbar !== undefined && utilsFn.snack("歌单删除成功");
    }
  },
  /**
   * 加载自定义歌单
   */
  loadCustomPlaylists: (id, server) => {
    var raw = utilsFn.getLocalStorage("customPlaylists");
    var customPlayLists = raw ? JSON.parse(raw) : [];
    customPlayLists.forEach((e, index) => {
      consoleFn.appendPlaylist(e.id, e.server, index + 1);
    });
  },
  appendPlaylist(id, server, index) {
    $(".playlist-container").append(
      `<div class="custom-playlist-item-wrapper"><div class="playlist-item custom-playlist-item" style="background-image:url(https://picbed.cloudchewie.com/blog/other/archives.jpg!mini)" onclick="consoleFn.changeAPlayerList(${id},&quot;${server}&quot;,true)" data-pjax-state=""><span>歌单${id}</span></div><a href="javascript:;" onclick="consoleFn.removeCustomPlaylist(${id},&quot;${server}&quot;)"><i class="cloudchewiefont cloudchewie-icon-xmark custom-playlist-item-close"></i></a></div>`
    );
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
      $("#rightside").hide();
    } else {
      utilsFn.setLocalStorage("enableRightSide", "true");
      $("#rightside").show();
    }
  },
  /**
   * 设置深浅色跟随系统模式
   */
  toggleAutoTheme: () => {
    if (utilsFn.getLocalStorage("enableAutoTheme") == "true") {
      utilsFn.setLocalStorage("enableAutoTheme", "false");
      $("#con-mode,.rightMenu-item:has(.fa-adjust)").show();
    } else {
      utilsFn.setLocalStorage("enableAutoTheme", "true");
      var time = new Date();
      if (time.getHours() <= 7 || time.getHours() >= 19) {
        activateDarkMode();
        localStorage.removeItem("theme");
      } else {
        activateLightMode();
        localStorage.removeItem("theme");
      }
      $("#con-mode,.rightMenu-item:has(.fa-adjust)").hide();
    }
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
   * 是否侧栏居左
   */
  toggleAsidePosition: () => {
    if (utilsFn.getLocalStorage("asideLeft") == "false") {
      utilsFn.setLocalStorage("asideLeft", "true");
      document.documentElement.setAttribute("aside-position", "left");
    } else {
      utilsFn.setLocalStorage("asideLeft", "false");
      document.documentElement.setAttribute("aside-position", "right");
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
   * 是否显示帧率
   */
  toggleFPS: () => {
    if (utilsFn.getLocalStorage("enableFPS") == "true")
      utilsFn.setLocalStorage("enableFPS", "false");
    else utilsFn.setLocalStorage("enableFPS", "true");
    consoleFn.changeFPS(false);
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
  changeFPS: () => {
    if (utilsFn.getLocalStorage("enableFPS") == "true") {
      document.getElementById("fps").style.display = "block";
    } else {
      document.getElementById("fps").style.display = "none";
    }
  },
  changeAutoColor: async (first) => {
    if (
      utilsFn.getLocalStorage("enableAutoColor") == "true" &&
      document.querySelector("#page-header") != null &&
      document.querySelector("#page-header").style.backgroundImage != null &&
      document
        .querySelector("#page-header")
        .style.backgroundImage.split('url("')[1] != null
    ) {
      var url = document
        .querySelector("#page-header")
        .style.backgroundImage.split('url("')[1]
        .split('")')[0];
      try {
        const t = await fetch(url + "?imageAve");
        if (t.ok) {
          var hex = (await t.json()).RGB.slice(2);
          consoleFn.setThemeColor(
            parseInt("0x" + hex.slice(0, 2)),
            parseInt("0x" + hex.slice(2, 4)),
            parseInt("0x" + hex.slice(4, 6))
          );
        }
      } catch (e) {}
    } else {
      if (!first) consoleFn.setDefaultThemeColor();
    }
  },
};
/**
 * =================================================
 *
 * 杂乱功能
 *
 * =================================================
 */
function runOne() {
  document.getElementById("con-mode").addEventListener("click", function () {
    setTimeout(cloudchewieFn.switchPostChart, 100);
  });
  document.onkeydown = function (event) {
    event = event || window.event;
    if (event.keyCode == 17) {
      return;
    }
  };
  if (
    !navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    cloudchewieFn.bindContextMenu(true);
  }
  cloudchewieFn.addLongtabListener(document.documentElement, () =>
    cloudchewieFn.bindContextMenu(true)
  );
  cloudchewieFn.resizeTop();
  cloudchewieFn.categoriesBarActive();
  cloudchewieFn.topCategoriesBarScroll();
  cloudchewieFn.injectAccessKey(document, window);
}
/**
 * =================================================
 *
 * 深浅色模式过渡动画
 *
 * =================================================
 */
class ThemeToggle extends HTMLElement {
  button;
  constructor() {
    super(), (this.button = this.querySelector("button"));
    const i = (n) => {
      const o = !this.isDark();
      if (!document.startViewTransition || this.isReducedMotion()) {
        this.toggleTheme(o);
        return;
      }
      const a = document.startViewTransition(() => {
        this.toggleTheme(o);
      });
      let t, e;
      typeof n > "u"
        ? ((t = this.button.getBoundingClientRect().x),
          (e = this.button.getBoundingClientRect().y))
        : ((t = n.clientX), (e = n.clientY));
      const r = Math.hypot(
        Math.max(t, innerWidth - t),
        Math.max(e, innerHeight - e)
      );
      a.ready.then(() => {
        const s = [
          `circle(0px at ${t}px ${e}px)`,
          `circle(${r}px at ${t}px ${e}px)`,
        ];
        document.documentElement.animate(
          {
            clipPath: o ? s : [...s].reverse(),
          },
          {
            duration: 500,
            easing: "ease-in",
            pseudoElement: o
              ? "::view-transition-new(root)"
              : "::view-transition-old(root)",
          }
        );
      });
    };
    this.button.addEventListener("click", (n) => i(n));
  }
  toggleTheme(i) {
    document.documentElement.setAttribute("data-theme", i ? "dark" : "light");
    cloudchewieFn.toggleDarkMode(true);
    if (i) {
      saveToLocal.set("theme", "dark", 2);
    } else {
      saveToLocal.set("theme", "light", 2);
    }
  }
  isDark() {
    return document.documentElement.getAttribute("data-theme") == "dark";
  }
  isReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches === !0;
  }
}
customElements.define("theme-toggle", ThemeToggle);
document.startViewTransition();
/**
 * =================================================
 *
 * 最新评论
 *
 * =================================================
 */
async function fetchNewestComments() {
  fetch("https://twikoo.api.cloudchewie.com/", {
    method: "POST",
    body: JSON.stringify({
      event: "GET_RECENT_COMMENTS",
      accessToken: "ac9a92b959dc9fc6dda6974ced6759fc",
      includeReply: !1,
      pageSize: 100,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then(async ({ data }) => {
      try {
        renderNewestComments(data);
      } catch (error) {
        renderNewestComments(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function getTitle(url) {
  let a = posts.find((a) => a.url == url);
  if (a) return a.title;
  return "该文章/页面不存在";
}
function renderNewestComments(data) {
  function a(e) {
    if (!e) return "";
    return (e = (e = (e = (e = (e = e.replace(
      /<\/*br>|[\s\uFEFF\xA0]+/g,
      ""
    )).replace(/<img.*?>/g, "[图片]")).replace(
      /<a.*?>.*?<\/a>/g,
      "[链接]"
    )).replace(/<pre.*?>.*?<\/pre>/g, "[代码块]")).replace(/<.*?>/g, ""));
  }
  let html = "";
  data.forEach((item) => {
    var isBlogger = item.mailMd5 == "d64992490a4d916305acbbc7ff7eb59f";
    var title = item.commentText
      .replaceAll(/<.*?>/g, "")
      .replaceAll(/[\s\n]/g, "");
    var url = `${item.url}#${item.id}`;
    var bloggerHtml = isBlogger
      ? '<span class="comment_isBlogger">博主</span>'
      : "";
    var time = new Date(item.created).toLocaleString().split(" ")[0];
    var content = a(item.comment)
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
    html += `<div class="comment_item" title="${title}" onclick="pjax.loadUrl('${url}')">
          <div class="comment_meta">
                <img src="${
                  item.avatar
                }" class="no-lazyload no-fancybox comment_avatar" />
                <span class="comment_user">${item.nick}${bloggerHtml}</span>
              <span class="comment_time">${time}</span>
          </div>
          <div class="comment_spacer"></div>
          <div class="comment_content">${content}</div>
          <div class="comment_title">${getTitle(item.url)}</div>
      </div>`;
  });
  document.getElementById("comments-list").innerHTML = html;
  var times = 0;
  utilsFn.isRecentComments() &&
    (waterfall("#comments-list"),
    setTimeout(() => {
      waterfall("#comments-list");
    }, 300));
  var relayout = setInterval(function () {
    utilsFn.isRecentComments() &&
      (waterfall("#comments-list"),
      setTimeout(() => {
        waterfall("#comments-list");
      }, 300));
    times++;
    if (times > 5) clearInterval(relayout);
  }, 300);
}
/**
 * =================================================
 *
 * Memos
 *
 * =================================================
 */
const RANDOM_MEMO_SETTINGS = {
  memosApi: "https://memos.cloudchewie.com",
  // Amount of memos to cache
  memoAmount: 100,
  // Kinds of memos to cache: PUBLIC = visible to everyone, PROTECTED = logged in users, PRIVATE = only the creator
  memoKinds: ["PUBLIC", "PROTECTED", "PRIVATE"],//"PUBLIC", "PROTECTED", 
  // Time in minutes to cache the memos
  memoCacheTimeMinutes: 60,
  // Username of the memo creator to filter the memos
  memoCreatorUsername: "",
  // Button text
  buttonText: "Random",
  // Button tooltip
  buttonTooltip: "Show a random memo",
  // Local storage key to store the memo uids
  cacheKey: "randomMemoUuidCache",
  // Local storage key to store the last update timestamp
  cacheLastUpdateKey: "randomMemoUuidCacheLastUpdate",
  memos_logo: "https://picbed.cloudchewie.com/icon/memos.webp!mini",
  default_memos_avatar:
    "https://picbed.cloudchewie.com/icon/memos-user.webp!mini",
};
const MEMOS_QUERY = {
  userlist: [],
  current_option: 0, //0-total,1-user,2-randomuser
  current_uid: -1,
  query: [],
};
const MEMOS_REACTIONS = new Map([
  ["THUMBS_UP", "👍"],
  ["THUMBS_DOWN", "👎"],
  ["HEART", "💛"],
  ["FIRE", "🔥"],
  ["CLAPPING_HANDS", "👏"],
  ["LAUGH", "😂"],
  ["OK_HAND", "👌"],
  ["ROCKET", "🚀"],
  ["EYES", "👀"],
  ["THINKING_FACE", "🤔"],
  ["CLOWN_FACE", "🤡"],
  ["QUESTION_MARK", "❓"],
]);
const MEMOS_DOM = {
  $search_memos: undefined,
  $search_input: undefined,
  $total_memos: undefined,
  $mine_memos: undefined,
  $memos_button_list: undefined,
  $randomuser_memos: undefined,
  $userlist_memos: undefined,
  $memos_bar_avatar: undefined,
  $memos_bar_avatar_link: undefined,
  $memos_bar_name: undefined,
  $memos_userlist: undefined,
  $memos_query: undefined,
};
var blank_memos = {
  id: -1,
  creatorId: -1,
  content: "暂无Memos",
  creatorNickName: "暂无Memos",
  creatorUsername: "暂无Memos",
  avatar: RANDOM_MEMO_SETTINGS.default_memos_avatar,
  name: "",
};
const memosFn = {
  updateSelectMemosState: () => {
    MEMOS_DOM.$total_memos &&
      MEMOS_DOM.$total_memos.classList.remove("checked");
    MEMOS_DOM.$mine_memos && MEMOS_DOM.$mine_memos.classList.remove("checked");
    MEMOS_DOM.$randomuser_memos &&
      MEMOS_DOM.$randomuser_memos.classList.remove("checked");
    switch (MEMOS_QUERY.current_option) {
      case 0:
        MEMOS_DOM.$total_memos &&
          MEMOS_DOM.$total_memos.classList.add("checked");
        break;
      case 1:
        MEMOS_DOM.$mine_memos && MEMOS_DOM.$mine_memos.classList.add("checked");
        break;
      case 2:
        MEMOS_DOM.$randomuser_memos &&
          MEMOS_DOM.$randomuser_memos.classList.add("checked");
        break;
    }
  },
  updateMemosBarMeta: (avatar, nickname, username = "") => {
    $(MEMOS_DOM.$memos_bar_avatar).attr("src", avatar);
    if (username != "") {
      $(MEMOS_DOM.$memos_bar_avatar_link).attr(
        "href",
        `${RANDOM_MEMO_SETTINGS.memosApi}/u/${username}`
      );
    } else {
      $(MEMOS_DOM.$memos_bar_avatar_link).attr(
        "href",
        `${RANDOM_MEMO_SETTINGS.memosApi}/`
      );
    }
    $(MEMOS_DOM.$memos_bar_name).html(nickname);
  },
  onTotalMemosClicked: () => {
    if (MEMOS_QUERY.current_option == 0) return;
    MEMOS_QUERY.current_option = 0;
    memosFn.fetchMemos();
  },
  onMineMemosClicked: () => {
    if (MEMOS_QUERY.current_option == 1) return;
    MEMOS_QUERY.current_option = 1;
    MEMOS_QUERY.current_uid = 1;
    memosFn.fetchMemos();
  },
  onRandomUserMemosClicked: async () => {
    await memosFn.fetchUserList();
    MEMOS_QUERY.current_option = 2;
    var tmp = MEMOS_QUERY.current_uid;
    while (tmp == MEMOS_QUERY.current_uid) {
      var r =
        Math.round(Math.random() * MEMOS_QUERY.userlist.length) %
        MEMOS_QUERY.userlist.length;
      tmp = MEMOS_QUERY.userlist[r].id;
    }
    MEMOS_QUERY.current_uid = tmp;
    memosFn.fetchMemos();
  },
  onUserListMemosClicked: () => {
    $(MEMOS_DOM.$memos_userlist).toggle();
    MEMOS_DOM.$userlist_memos &&
      MEMOS_DOM.$userlist_memos.classList.toggle("checked");
  },
  onUserClicked: (user) => {
    window.open(
      `${RANDOM_MEMO_SETTINGS.memosApi}/u/${user.replace("users/", "")}`
    );
  },
  onTagClicked: (tag) => {
    if (!memosFn.pushQuery({ type: "tag", content: tag })) {
      utilsFn.snack(`筛选过标签「${tag}」啦`);
    }
    // window.open(`${RANDOM_MEMO_SETTINGS.memosApi}/?tag=${tag}`);
  },
  onTimeClicked: (name) => {
    hash = name.split("/")[1];
    window.open(`${RANDOM_MEMO_SETTINGS.memosApi}/m/${hash}`);
  },
  pushQuery: (n) => {
    var exist = false;
    MEMOS_QUERY.query.forEach((e) => {
      if (e.type == n.type && e.content == n.content) {
        exist = true;
      }
    });
    if (!exist) {
      MEMOS_QUERY.query.push(n);
      memosFn.performSearch();
    }
    return !exist;
  },
  removeQuery: (type, content) => {
    var index = -1;
    for (var i = 0; i < MEMOS_QUERY.query.length; i++) {
      var e = MEMOS_QUERY.query[i];
      if (e.type == type && e.content == content) {
        index = i;
      }
    }
    if (index != -1) {
      MEMOS_QUERY.query.splice(index, 1);
      memosFn.performSearch();
    }
  },
  performSearch: () => {
    if (MEMOS_QUERY.query.length <= 0) {
      ``;
      MEMOS_DOM.$memos_query.classList.add("no-query");
    } else {
      MEMOS_DOM.$memos_query.classList.remove("no-query");
      $(".memos-query-item").remove();
      MEMOS_QUERY.query.forEach((e) => {
        if (e.type == "content") {
          $(MEMOS_DOM.$memos_query).append(
            `<div class="memos-query-item memos-query-content" onclick="memosFn.removeQuery('${e.type}','${e.content}');"><i class="fas fa-search fa-fw"></i><span>${e.content}</span><i class="cloudchewiefont cloudchewie-icon-xmark"></i></div>`
          );
        } else if (e.type == "tag") {
          $(MEMOS_DOM.$memos_query).append(
            `<div class="memos-query-item memos-query-tag" onclick="memosFn.removeQuery('${e.type}','${e.content}');"><i class="cloudchewiefont cloudchewie-icon-hashtag"></i><span>${e.content}</span><i class="cloudchewiefont cloudchewie-icon-xmark"></i></div>`
          );
        }
      });
    }
    memosFn.fetchMemos();
  },
  onSearchMemosClicked: () => {
    function search() {
      if (MEMOS_DOM.$search_input.classList.contains("d-none")) {
        MEMOS_DOM.$memos_button_list.classList.add("d-none");
        MEMOS_DOM.$search_input.classList.remove("d-none");
        MEMOS_DOM.$search_input.focus();
      } else if (
        !MEMOS_DOM.$search_input.classList.contains("d-none") &&
        MEMOS_DOM.$search_input.value == ""
      ) {
        MEMOS_DOM.$search_input.classList.add("animate__fadeOutRight");
        setTimeout(function () {
          MEMOS_DOM.$memos_button_list.classList.remove("d-none");
          MEMOS_DOM.$search_input.classList.add("d-none");
          MEMOS_DOM.$search_input.classList.remove("animate__fadeOutRight");
        }, 500);
      } else if (MEMOS_DOM.$search_input.value !== "") {
        if (
          !memosFn.pushQuery({
            type: "content",
            content: MEMOS_DOM.$search_input.value,
          })
        ) {
          utilsFn.snack(`搜索过内容「${MEMOS_DOM.$search_input.value}」啦`);
        }
      }
    }
    search();
    MEMOS_DOM.$search_input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        search();
      }
    });
  },
  getUser: (uid, split = false) => {
    var find = {};
    if (split) {
      uid = uid.split("/")[1];
    }
    MEMOS_QUERY.userlist.forEach((user) => {
      if (user.id == uid) find = user;
    });
    return find;
  },
  fetchUserList: async () => {
    if (MEMOS_QUERY.userlist.length > 0) return;
    await fetch("/memos_user.json")
      .then((res) => res.json())
      .then(async (users) => {
        MEMOS_QUERY.userlist = users;
        var userlistDom = $(MEMOS_DOM.$memos_userlist);
        userlistDom.empty();
        users.forEach((user) => {
          userlistDom.append(
            `<div onclick="MEMOS_QUERY.current_option = 2;MEMOS_QUERY.current_uid = ${
              user.id
            };memosFn.fetchMemos();" class="item-avatar" style="background-image:url(${
              utilsFn.isNotEmpty(user.avatarUrl)
                ? user.avatarUrl
                : RANDOM_MEMO_SETTINGS.default_memos_avatar
            })"></div>`
          );
        });
      });
  },
  fetchMemos: async () => {
    memosFn.updateSelectMemosState();
    await memosFn.fetchUserList();
    switch (MEMOS_QUERY.current_option) {
      case 0:
        memosFn.updateMemosBarMeta(RANDOM_MEMO_SETTINGS.memos_logo, "Memos");
        memosFn.fetchUserMemos();
        break;
      case 1:
      case 2:
        var current_user = memosFn.getUser(MEMOS_QUERY.current_uid);
        memosFn.updateMemosBarMeta(
          utilsFn.isNotEmpty(current_user.avatarUrl)
            ? current_user.avatarUrl
            : RANDOM_MEMO_SETTINGS.default_memos_avatar,
          current_user.nickname,
          current_user.username
        );
        memosFn.fetchUserMemos(`users/${current_user.id}`);
        break;
    }
  },
  getApiUrl: (creator) => {
    const memoAmount = RANDOM_MEMO_SETTINGS.memoAmount || 100;
    const filters = [
        `visibility in [${RANDOM_MEMO_SETTINGS.memoKinds.filter(kind => kind !== "PRIVATE").map(kind => `"${kind}"`).join(", ")}]`
    ];

    const content_search_query = MEMOS_QUERY.query
        .filter(e => e.type === "content")
        .map(e => e.content);

    const tag_search_query = MEMOS_QUERY.query
        .filter(e => e.type === "tag")
        .map(e => e.content);

    if (content_search_query.length) {
        for (const query of content_search_query) {
          filters.push(`content.contains("${query}")`);
        }
    }

    if (tag_search_query.length) {
        filters.push(`tag in ${JSON.stringify(tag_search_query)}`);
    }

    let apiUrl = `${RANDOM_MEMO_SETTINGS.memosApi}/api/v1/memos?pageSize=${memoAmount}&state=NORMAL&filter=${encodeURIComponent(filters.join(" && "))}`;

    if (utilsFn.isNotEmpty(creator)) {
        apiUrl += `&parent=${creator}`;
    }

    return apiUrl;
  },
  fetchUserMemos: async (creator) => {
    var items = [],
      item = {};
    utilsFn
      .withTimeout(
        2000,
        fetch(memosFn.getApiUrl(creator))
          .then((response) => response.json())
          .then((resdata) => {
            return resdata;
          })
      )
      .then((resdata) => {
        var result_memos = resdata.memos;
        var nextPageToken = resdata.nextPageToken;
        if (result_memos.length <= 0) {
          items.push(blank_memos);
        } else {
          for (var j = 0; j < result_memos.length; j++) {
            var resValue = result_memos[j];
            var resCreateTs = Date.parse(resValue.createTime);
            var resReactions = new Map();
            var reactions = new Map();
            resValue.reactions.forEach((e) => {
              if (resReactions.get(e.reactionType) == undefined) {
                resReactions.set(e.reactionType, 0);
              }
              resReactions.set(
                e.reactionType,
                resReactions.get(e.reactionType) + 1
              );
            });
            var resUpdateTs = Date.parse(resValue.updateTime);
            var resDisplayTs = Date.parse(resValue.displayTime);
            var dayDiff = Math.floor(
              (new Date().getTime() - resCreateTs) / (24 * 3600 * 1000)
            );
            if (dayDiff < 365) {
              let current_user = memosFn.getUser(resValue.creator, true);
              item = {
                id: resValue.uid,
                avatar: utilsFn.isNotEmpty(current_user.avatarUrl)
                  ? current_user.avatarUrl
                  : RANDOM_MEMO_SETTINGS.default_memos_avatar,
                createTs: resCreateTs,
                creatorId: current_user.id,
                creatorNickname: current_user.nickname,
                creatorUsername: current_user.name,
                content: resValue.content,
                resourceList: resValue.resources,
                name: resValue.name,
                reactions: resReactions,
                location: resValue.location!=undefined?resValue.location.placeholder:resValue.location,
                pinned: resValue.pinned,
              };
              items.push(item);
            }
          }
          items.sort(utilsFn.compare("createTs"));
          items.sort(utilsFn.compare("pinned"));
        }
        memosFn.loadMemos(items);
      });
  },
  loadMemos: (data) => {
    let items = [],
      html = "";
    data.forEach((item) => {
      items.push(memosFn.formatMemo(item));
    });
    items.forEach((item) => {
      tagHtml = "";
      if (item.tags != null) {
        item.tags.forEach((e) => {
          tagHtml += `<div class="talk_meta_tag" onclick="memosFn.onTagClicked('${e.replaceAll(
            "#",
            ""
          )}')"><i class="cloudchewiefont cloudchewie-icon-hashtag"></i><span class="talk_tag">${e.replaceAll(
            "#",
            ""
          )}</span></div>`;
        });
      }
      reactionsHtml = "";
      if (item.reactions != null) {
        item.reactions.forEach((v, k, m) => {
          reactionsHtml += `<div class="talk_meta_reaction"><span class="talk_reaction_icon">${k}</span><span class="talk_reaction">${v}</span></div>`;
        });
      }
      locationHtml ="";
      if(item.location!=undefined){
        locationHtml=String.raw`
        <div class="talk_meta_date">
                <i class="fa fa-location"></i>
                <span class="talk_date" title="${item.location}">${item.location.split(",")[0]}</span>
              </div>
        `
      }
      pinnedHtml = item.pinned
        ? `<div class="talk_meta_pinned"><i class="fas fa-thumbtack"></i><span class="talk_pinned"/>置顶</div>`
        : "";
      dateString = item.date.split(" ")[0].replaceAll("/", "-");
      dateList = dateString.split("-");
      if (dateList.length == 3)
        dateString = dateList[0] + "/" + dateList[1] + "/" + dateList[2];
      if (item.name == "") {
        html += String.raw`
        <div class="talk_item">
          <div class="talk_content">${item.content}</div>
        </div>
        `;
      } else {
        html += String.raw`
        <div class="talk_item">
          <div class="talk_content">${item.content}</div>
          <div class="talk_spacer"></div>
          <div class="talk_bottom">
            <div class="talk_meta">
             ${pinnedHtml}
              <div class="talk_meta_user" onclick="memosFn.onUserClicked('${item.username}')">
                <img class="no-lightbox no-lazyload talk_avatar" src="${item.avatar}">
                <span class="talk_nick">${item.nickname}</span>
              </div>
              <div class="talk_meta_date" onclick="memosFn.onTimeClicked('${item.name}')">
                <i class="fa fa-clock"></i>
                <span class="talk_date">${dateString}</span>
              </div>
              ${locationHtml}
              ${tagHtml}
              ${reactionsHtml}
            </div>
            <span class="talk_reply" onclick="cloudchewieFn.referToComment('${item.raw_content}')"><i class="fas fa-message"></i></span>
          </div>
        </div>
        `;
      }
    });
    $("#talk").html(html);
    var times = 0;
    utilsFn.isMemos() &&
      (waterfall("#talk"),
      setTimeout(() => {
        waterfall("#talk");
      }, 300));
    var relayout = setInterval(function () {
      utilsFn.isMemos() &&
        (waterfall("#talk"),
        setTimeout(() => {
          waterfall("#talk");
        }, 300));
      times++;
      if (times > 5) clearInterval(relayout);
    }, 300);
  },
  formatMemo: (item) => {
    //正则式
    const TAG_REG = /#([^\s#]+)/g;
    const SPACE_REG = /\s+/g;
    const IMG_REG = /\!\[(.*?)\]\((.*?)\)/g;
    BILIBILI_REG =
      /<a.*?href="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?".*?>.*<\/a>/g;
    NETEASE_MUSIC_REG =
      /<a.*?href="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g;
    // QQMUSIC_REG = /<a.*?href="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g;
    QQMUSIC_REG =
      /<a.*?href="https\:\/\/y\.qq\.com\/n\/ryqq\/songDetail.*\/([0-9a-zA-Z]+)?".*?>.*?<\/a>/g;
    QQVIDEO_REG =
      /<a.*?href="https:\/\/v\.qq\.com\/.*\/([a-z|A-Z|0-9]+)\.html".*?>.*<\/a>/g;
    YOUKU_REG =
      /<a.*?href="https:\/\/v\.youku\.com\/.*\/id_([a-z|A-Z|0-9|==]+)\.html".*?>.*<\/a>/g;
    YOUTUBE_REG =
      /<a.*?href="https:\/\/www\.youtube\.com\/watch\?v\=([a-z|A-Z|0-9]{11})\".*?>.*<\/a>/g;
    marked.setOptions({
      breaks: true,
      smartypants: false,
      langPrefix: "language-",
      mangle: false,
      headerIds: false,
    });
    const renderer = new marked.Renderer();
    const linkRenderer = renderer.link;
    renderer.link = (href, title, text) => {
      const localLink = href.startsWith(
        `${location.protocol}//${location.hostname}`
      );
      const html = linkRenderer.call(renderer, href, title, text);
      return localLink
        ? html
        : html.replace(
            /^<a /,
            `<a target="_blank" rel="noreferrer noopener nofollow" `
          );
    };
    marked.use({ renderer });
    //处理内容
    let content = item.content,
      raw_content = item.content,
      text = item.content,
      imgsWithCaption = [],
      tags = content.match(TAG_REG);
    raw_content = raw_content
      .replaceAll("`", "\\`")
      .replaceAll("\n", "\\n")
      .replace(TAG_REG, "")
      .replace(IMG_REG, "")
      .replace(BILIBILI_REG, "")
      .replace(NETEASE_MUSIC_REG, "")
      .replace(QQMUSIC_REG, "")
      .replace(QQVIDEO_REG, "")
      .replace(YOUKU_REG, "")
      .replace(YOUTUBE_REG, "");
    text = text
      .replaceAll("`", "")
      .replaceAll("\n", "")
      .replace(TAG_REG, "")
      .replace(IMG_REG, "")
      .replace(BILIBILI_REG, "")
      .replace(NETEASE_MUSIC_REG, "")
      .replace(QQMUSIC_REG, "")
      .replace(QQVIDEO_REG, "")
      .replace(YOUKU_REG, "")
      .replace(YOUTUBE_REG, "");
    content = content
      .replace(TAG_REG, "")
      .replace(
        IMG_REG,
        `<a href="$2" data-fancybox="gallery" class="fancybox" data-thumb="$2"><img class="no-lazyload" src="$2"></a>`
      );
    content = marked
      .parse(content)
      .replace(
        BILIBILI_REG,
        "<div class='video-wrapper'><iframe src='//www.bilibili.com/blackboard/html5mobileplayer.html?bvid=$1&as_wide=1&high_quality=1&danmaku=1' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true'></iframe></div>"
      )
      .replace(
        NETEASE_MUSIC_REG,
        "<meting-js class='music-wrapper' auto='https://music.163.com/#/song?id=$1'></meting-js>"
      )
      .replace(
        QQMUSIC_REG,
        "<meting-js class='music-wrapper' auto='https://y.qq.com/n/yqq/song/$1.html'></meting-js>"
      )
      .replace(
        QQVIDEO_REG,
        "<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>"
      )
      .replace(
        YOUKU_REG,
        "<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>"
      )
      .replace(
        YOUTUBE_REG,
        "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>"
      );
    if (item.resourceList != undefined) {
      item.resourceList.forEach((e) => {
        if (utilsFn.isNotEmpty(e.externalLink)) {
          imgsWithCaption.push({ caption: text, url: e.externalLink });
        } else {
          imgsWithCaption.push({
            caption: text,
            url: `${RANDOM_MEMO_SETTINGS.memosApi}/o/r/${e.id}/${e.publicId}/${e.filename}`,
          });
        }
      });
    }
    if (imgsWithCaption.length > 0) {
      content += `<div class="zone_imgbox">`;
      imgsWithCaption
        .map((item) => {
          return {
            caption: item.caption,
            url: item.url.replace(/!\[.*\]\((.*?)\)/, "$1"),
          };
        })
        .forEach(
          (e) =>
            (content += `<a href="${e.url}" data-fancybox="gallery" class="fancybox" data-thumb="${e.url}" data-caption="${e.caption}"><img alt="${e.caption}" class="no-lazyload" src="${e.url}"></a>`)
        );
      content += "</div>";
    }
    return {
      content: content,
      tags: tags,
      reactions: item.reactions,
      raw_content: raw_content,
      date: new Date(item.createTs).toLocaleString(),
      text: text.replace(
        /\[(.*?)\]\((.*?)\)/g,
        "[链接]" + `${imgsWithCaption ? "[图片]" : ""}`
      ),
      nickname: item.creatorNickname,
      username: item.creatorUsername,
      avatar: item.avatar,
      location: item.location,
      name: item.name,
      pinned: item.pinned,
    };
  },
};
