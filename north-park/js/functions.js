$(function () {
$(window).scroll(function () {
  const scrolled = $(this).scrollTop() > 0;
  $(".site-header").toggleClass("active", scrolled);
});
});

// ---- Auth helpers ----
const Auth = {
  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  },
  isGuest() {
    return localStorage.getItem('isGuest') === 'true';
  },
  getUserEmail() {
    return localStorage.getItem('userEmail') || '';
  },
  login(email, isGuest = false) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    if (isGuest) {
      localStorage.setItem('isGuest', 'true');
    } else {
      localStorage.removeItem('isGuest');
    }
  },
  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isGuest');
  },
};

// ---- Guard: call at top of any page that requires login ----
function requireAuth(redirectTo = '/mypage/login/') {
  if (!Auth.isLoggedIn()) {
    window.location.href = redirectTo;
  }
}

// ---- Mobile menu toggle ----
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
}

// ---- Parking lots data (shared across pages) ----
const parkingLots = [
  { id: 1, name: '札幌駅前パーキング',       img: './img/parking/01.png', price: '15,000円/月', location: '中央区北5条西2丁目',    features: ['屋内', '24時間', '防犯カメラ'] },
  { id: 2, name: '大通り駐車場',             img: './img/parking/02.png', price: '12,000円/月', location: '中央区大通西3丁目',      features: ['屋外', '24時間', '平面'] },
  { id: 3, name: 'すすきの月極パーキング',   img: './img/parking/03.png', price: '18,000円/月', location: '中央区南4条西4丁目',     features: ['屋内', '24時間', 'セキュリティ'] },
  { id: 4, name: '円山パーキング',           img: './img/parking/04.png', price: '10,000円/月', location: '中央区南1条西24丁目',    features: ['屋外', '平面', '広々'] },
  { id: 5, name: '白石区役所前駐車場',       img: './img/parking/05.png', price: '8,000円/月',  location: '白石区本郷通3丁目',      features: ['屋外', '24時間', '平面'] },
  { id: 6, name: '新さっぽろ駅前パーキング', img: './img/parking/06.png', price: '13,000円/月', location: '厚別区厚別中央2条5丁目', features: ['屋内', '駅近', '防犯カメラ'] },
  { id: 7, name: '琴似駅前月極駐車場',       img: './img/parking/07.png', price: '11,000円/月', location: '西区琴似1条1丁目',       features: ['屋外', '24時間', '駅近'] },
  { id: 8, name: '豊平駐車場',               img: './img/parking/08.png', price: '9,000円/月',  location: '豊平区豊平4条3丁目',     features: ['屋外', '平面', '広々'] },
  { id: 9, name: '麻生駅前パーキング',       img: './img/parking/09.png', price: '12,500円/月', location: '北区北39条西4丁目',      features: ['屋内', '駅近', '24時間'] },
];

// ---- Parking grid (index page only, no-ops on other pages) ----
function initParkingGrid() {
  const grid = document.getElementById('parking-grid');
  if (!grid) return;

  grid.innerHTML = parkingLots.map(lot => `
    <div class="parking-card">
      <div class="img-wrap">
        <img src="${lot.img}" alt="${lot.name}" loading="lazy" />
      </div>
      <div class="info">
        <h3>${lot.name}</h3>
        <p class="price">¥${lot.price}</p>
        <p class="location">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          ${lot.location}
        </p>
        <div class="tags">
          ${lot.features.map(f => `<span class="tag">${f}</span>`).join('')}
        </div>
        <a href="/parking/${lot.id}/" class="btn btn-primary btn-full">詳細を見る</a>
      </div>
    </div>
  `).join('');
}

// ---- Init shared features on every page ----
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initParkingGrid(); // no-ops if #parking-grid doesn't exist on the page
});

// ---- upload area in listing request ----
$(function () {
  const uploadArea = document.getElementById('uploadArea');
  const photoUpload = document.getElementById('photoUpload');

  uploadArea.addEventListener('click', () => photoUpload.click());

  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-dark)';
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#CED4DA';
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#CED4DA';
    photoUpload.files = e.dataTransfer.files;
  });
});

$(function () {
  var allItems = Array.from(document.querySelectorAll('.news-item'));
  var btns = document.querySelectorAll('.news-filter__btn');

  var countAllEl = document.querySelector('.js-count-all');
  if (countAllEl) countAllEl.textContent = allItems.length;

  document.querySelectorAll('.js-count').forEach(function (el) {
    var cat = el.dataset.cat;
    el.textContent = allItems.filter(function (i) {
      return i.dataset.category === cat;
    }).length;
  });

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var cat = btn.dataset.category;
      allItems.forEach(function (item) {
        if (cat === 'all' || item.dataset.category === cat) {
          item.classList.remove('is-hidden');
        } else {
          item.classList.add('is-hidden');
        }
      });
    });
  });
});
// ---- Area panel swap (その他のエリア toggle) ----
document.addEventListener('DOMContentLoaded', function () {
  var toggleBtn  = document.getElementById('area-toggle-btn');
  var backBtn    = document.getElementById('area-back-btn');
  var primary    = document.getElementById('area-panel-primary');
  var extra      = document.getElementById('area-panel-extra');
  if (!toggleBtn || !primary || !extra) return;

  function showExtra() {
    primary.classList.add('is-hidden');
    extra.classList.add('is-visible');
    extra.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function showPrimary() {
    primary.classList.remove('is-hidden');
    extra.classList.remove('is-visible');
    extra.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', showExtra);
  if (backBtn) backBtn.addEventListener('click', showPrimary);
});
