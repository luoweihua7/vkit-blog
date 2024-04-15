(() => {
  const TITLES = {
    'podkit.cn': '深客小工具个人应用',
    'vkit.fun': '私人数据管理',
    'vkit.run': '前端JS学习',
  };

  const hostname = window.location.hostname;

  Object.keys(TITLES).some((t) => {
    if (hostname.includes(t)) {
      document.title = `${document.title} - ${TITLES[t] ?? 'Bofoi'}`;
      return true;
    }
  });
})();
