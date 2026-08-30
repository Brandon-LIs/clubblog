/**
 * 宜昌一中科创社团 · 交互脚本（政务风）
 * 功能：移动端菜单 / 当前日期 / 滚动浮现动效
 */
(function () {
  'use strict';

  // ---- 顶栏日期 ----
  var dateEl = document.getElementById('todayDate');
  if (dateEl) {
    var now = new Date();
    var week = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()];
    dateEl.textContent =
      now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' +
      '　星期' + week;
  }

  // ---- 移动端菜单 ----
  var toggle = document.getElementById('mobileToggle');
  var navList = document.getElementById('navList');
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      navList.classList.toggle('is-open');
    });
    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        navList.classList.remove('is-open');
      });
    });
  }

  // ---- 移动端侧栏折叠（下拉打开式） ----
  var foldMQ = window.matchMedia('(max-width: 720px)');
  var foldPanels = document.querySelectorAll('.side-panel[data-fold]');

  function setFold(panel, open) {
    panel.classList.toggle('is-open', open);
    var head = panel.querySelector('.panel-toggle');
    if (head) head.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  Array.prototype.forEach.call(foldPanels, function (panel) {
    var head = panel.querySelector('.panel-toggle');
    if (!head) return;
    head.addEventListener('click', function () {
      if (!foldMQ.matches) return; // 桌面端恒定展开，不响应折叠
      setFold(panel, !panel.classList.contains('is-open'));
    });
    setFold(panel, false);
  });

  // 视口切回桌面端时复位，避免残留折叠状态
  function resetFold() {
    if (foldMQ.matches) return;
    Array.prototype.forEach.call(foldPanels, function (p) { setFold(p, false); });
  }
  if (foldMQ.addEventListener) foldMQ.addEventListener('change', resetFold);
  else if (foldMQ.addListener) foldMQ.addListener(resetFold);

  // ---- 滚动浮现 ----
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
