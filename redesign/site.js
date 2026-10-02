'use strict';
// Keep public visitors on the certificate-covered origin while Pages provisions both names.
if (typeof window !== 'undefined' && window.location.protocol === 'http:' && ['tnkg.com', 'www.tnkg.com'].includes(window.location.hostname)) {
  const secureUrl = new URL(window.location.href);
  secureUrl.protocol = 'https:';
  secureUrl.hostname = 'www.tnkg.com';
  window.location.replace(secureUrl.href);
}
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
function closeMenu() { navigation?.classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false'); }
menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
navigation?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const archive = document.querySelector('#news-results');
if (archive) {
  const records = JSON.parse(document.querySelector('#news-records').textContent);
  const search = document.querySelector('#news-search');
  const year = document.querySelector('#news-year');
  const filters = [...document.querySelectorAll('[data-category]')];
  const status = document.querySelector('#results-status');
  const previous = document.querySelector('#page-previous');
  const next = document.querySelector('#page-next');
  const pageLabel = document.querySelector('#page-label');
  let category = '全部', page = 1;
  const pageSize = 12;
  function render() {
    const needle = search.value.trim().toLocaleLowerCase();
    const matches = records.filter(item => (!needle || (item.title + ' ' + item.category).toLocaleLowerCase().includes(needle)) && (!year.value || item.date.startsWith(year.value)) && (category === '全部' || item.category === category));
    const pages = Math.max(1, Math.ceil(matches.length / pageSize));
    page = Math.min(page, pages);
    archive.replaceChildren();
    for (const item of matches.slice((page - 1) * pageSize, page * pageSize)) {
      const link = document.createElement('a'); link.className = 'news-row'; link.href = item.path;
      const date = document.createElement('time'); date.dateTime = item.date; date.textContent = item.date;
      const title = document.createElement('h3'); title.textContent = item.title;
      const tag = document.createElement('span'); tag.className = 'tag'; tag.textContent = item.category;
      const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true');
      link.append(date, title, tag, arrow); archive.append(link);
    }
    if (!matches.length) { const empty = document.createElement('p'); empty.className = 'empty'; empty.textContent = '没有找到相关记录，请更换关键词或筛选条件。'; archive.append(empty); }
    status.textContent = `共 ${matches.length} 条记录 · 按原站发布日期排列`;
    pageLabel.textContent = `${page} / ${pages}`;
    previous.disabled = page <= 1; next.disabled = page >= pages;
  }
  search.addEventListener('input', () => { page = 1; render(); });
  year.addEventListener('change', () => { page = 1; render(); });
  filters.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category; page = 1;
    filters.forEach(other => other.setAttribute('aria-pressed', String(other === button))); render();
  }));
  previous.addEventListener('click', () => { page--; render(); document.querySelector('#archive').scrollIntoView(); });
  next.addEventListener('click', () => { page++; render(); document.querySelector('#archive').scrollIntoView(); });
  render();
}
