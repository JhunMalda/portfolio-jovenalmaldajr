const allParkings = [
    { id:1, name:'札幌駅前パーキング',  addr:'中央区北5条西2丁目',  price:15000, disp:'¥15,000', status:'空', features:['ミドルルーフ可','ハイルーフ可'], cta:true,  lat:43.0696, lng:141.3508, img:'../img/search_placeholder.jpg' },
    { id:2, name:'大通公園駐車場',       addr:'中央区大通西3丁目',    price:12000, disp:'¥12,000', status:'空', features:['ミドルルーフ可'],             cta:false, lat:43.0621, lng:141.3530, img:'../img/search_placeholder.jpg' },
    { id:3, name:'すすきのパーキング',   addr:'中央区南4条西4丁目',   price:18000, disp:'¥18,000', status:'満', features:['ハイルーフ可'],               cta:false, lat:43.0554, lng:141.3540, img:'../img/search_placeholder.jpg' },
    { id:4, name:'円山公園駐車場',       addr:'中央区南1条西24丁目',  price:10000, disp:'¥10,000', status:'空', features:['ミドルルーフ可','ハイルーフ可'], cta:false, lat:43.0590, lng:141.3168, img:'../img/search_placeholder.jpg' },
    { id:5, name:'北大前駐車場',         addr:'北区北8条西5丁目',     price:11000, disp:'¥11,000', status:'空', features:['屋外','24時間'],              cta:false, lat:43.0766, lng:141.3442, img:'../img/search_placeholder.jpg' },
    { id:6, name:'中島公園パーキング',   addr:'中央区南9条西4丁目',   price: 9500, disp:'¥9,500',  status:'空', features:['平面','防犯カメラ'],          cta:false, lat:43.0477, lng:141.3530, img:'../img/search_placeholder.jpg' },
  ];

  let selectedId  = null;
  let currentData = [...allParkings];

  const DEFAULT_MAP_URL = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d23108.45!2d141.344!3d43.062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sja!2sjp!4v1';

  function renderList(data) {
    const list = document.getElementById('parking-list');
    const cnt  = document.getElementById('list-count');
    if (cnt) cnt.textContent = data.length + '件の駐車場が見つかりました';
    list.innerHTML = '';

    data.forEach(p => {
      const isOpen = p.status === '空';
      const tags   = p.features.map(f => `<span class="p-tag">${f}</span>`).join('');
      const cta    = p.cta ? `<a href="../contact-search/index.html" class="p-cta">今すぐお問合せ（最短1分）</a>` : '';
      const item   = document.createElement('div');
      item.className = 'parking-item' + (selectedId === p.id ? ' selected' : '');
      item.dataset.id = p.id;
      item.innerHTML = `
        <div class="p-thumb"><img src="${p.img}" alt="${p.name}" /></div>
        <div class="p-meta">
          <div class="p-badges">
            <span class="badge-num">${p.id}</span>
            <span class="badge-avail ${isOpen ? 'open' : 'full'}">${p.status}</span>
          </div>
          <div class="p-name">${p.name}</div>
          <div class="p-addr">${p.addr}</div>
          <div class="p-price">${p.disp}</div>
          <div class="p-tags">${tags}<span class="p-detail">詳細</span></div>
          ${cta}
        </div>
      `;
      item.addEventListener('click', () => {
        selectedId = p.id;
        renderList(currentData);
        panMapTo(p);
      });
      list.appendChild(item);
    });
  }

  function panMapTo(p) {
    const iframe = document.getElementById('map-iframe');
    const searchUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886!2d${p.lng}!3d${p.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(p.name)}!5e0!3m2!1sja!2sjp!4v1`;
    iframe.src = searchUrl;
  }

  function resetMapView() {
    document.getElementById('map-iframe').src = DEFAULT_MAP_URL;
  }

  function applyFilters() {
    const price = [...document.querySelectorAll('.filter-price:checked')].map(e => e.value);
    const car   = [...document.querySelectorAll('.filter-car:checked')].map(e => e.value);
    const feat  = [...document.querySelectorAll('.filter-feat:checked')].map(e => e.value);
    currentData = allParkings.filter(p => {
      if (price.length && !price.some(r => { const [a,b]=r.split('-').map(Number); return p.price>=a&&p.price<=b; })) return false;
      if (car.length   && !car.some(c  => p.features.includes(c))) return false;
      if (feat.length  && !feat.some(f => p.features.includes(f))) return false;
      return true;
    });
    selectedId = null;
    renderList(currentData);
  }

  function resetFilters() {
    document.querySelectorAll('.filter-price,.filter-car,.filter-feat').forEach(e => e.checked = false);
    currentData = [...allParkings];
    selectedId  = null;
    resetMapView();
    renderList(currentData);
  }

  window.applyFilters = applyFilters;
  window.resetFilters = resetFilters;

  document.addEventListener('DOMContentLoaded', () => renderList(currentData));
// ---- Mobile filter drawer ----
document.addEventListener('DOMContentLoaded', function () {
  var toggleBtn = document.getElementById('filter-toggle-btn');
  var drawer    = document.getElementById('filter-drawer');
  var overlay   = document.getElementById('filter-overlay');
  var closeBtn  = document.getElementById('filter-drawer-close');
  var applyBtn  = document.getElementById('fd-apply');
  var resetBtn  = document.getElementById('fd-reset');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  closeBtn && closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Chip toggle
  document.querySelectorAll('.fd-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      chip.classList.toggle('fd-chip--active');
    });
  });

  // Apply: close drawer and run desktop applyFilters if available
  applyBtn && applyBtn.addEventListener('click', function () {
    if (typeof applyFilters === 'function') applyFilters();
    closeDrawer();
  });

  // Reset: clear all chips + inputs, run resetFilters
  resetBtn && resetBtn.addEventListener('click', function () {
    document.querySelectorAll('.fd-chip').forEach(function (c) {
      c.classList.remove('fd-chip--active');
    });
    var minEl = document.getElementById('fd-price-min');
    var maxEl = document.getElementById('fd-price-max');
    if (minEl) minEl.value = '';
    if (maxEl) maxEl.value = '';
    if (typeof resetFilters === 'function') resetFilters();
  });
});
