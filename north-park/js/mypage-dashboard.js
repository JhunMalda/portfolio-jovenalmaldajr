// =====================
// mypage-dashboard.js — Dashboard page only
// Include this script ONLY in your mypage/dashboard/index.njk template
// functions.js must be loaded before this file
// =====================

document.addEventListener('DOMContentLoaded', () => {
  // ---- Data ----
  const contractData = [
    { id: 1, parkingName: '札幌駅前パーキング A-15',        location: '札幌市中央区北5条西2丁目',   status: 'active',     statusLabel: '契約中',       startDate: '2024年4月1日',  endDate: '未定', price: '¥15,000/月', progress: 100 },
    { id: 2, parkingName: '大通公園サイドパーキング B-08',   location: '札幌市中央区大通西8丁目',   status: 'processing', statusLabel: '契約手続き中', startDate: '2025年3月1日',  endDate: '-',             price: '¥12,000/月', progress: 60  },
    { id: 3, parkingName: 'すすきの駅前パーキング C-22',     location: '札幌市中央区南4条西4丁目',  status: 'pending',    statusLabel: '申込中',       startDate: '-',             endDate: '-',             price: '¥18,000/月', progress: 30  },
  ];

  const newsData = [
    { id: 1, date: '2025年2月20日', title: '春の新規契約キャンペーン開始のお知らせ',  content: '3月1日から4月30日まで、新規契約の方に初月賃料50%OFFキャンペーンを実施します。' },
    { id: 2, date: '2025年2月15日', title: '札幌駅北口エリアに新規駐車場オープン',    content: '札幌駅から徒歩5分の好立地に屋内駐車場がオープンしました。' },
    { id: 3, date: '2025年2月10日', title: 'メンテナンス作業のお知らせ',              content: '2月28日深夜2:00〜4:00にシステムメンテナンスを実施いたします。' },
  ];

  const recommendedParkings = [
    { id: 1, name: '札幌駅前パーキング',      location: '札幌市中央区北5条西2丁目',  price: '¥15,000/月', status: '空車',    features: ['屋内', 'ハイルーフ可', '24時間出入可'],    image: '../img/parking/01.jpg', updateDate: '2025年2月20日' },
    { id: 2, name: '大通公園サイドパーキング', location: '札幌市中央区大通西8丁目',   price: '¥12,000/月', status: '空車',    features: ['屋外', 'ミドルルーフ可', 'セキュリティ完備'], image: '../img/parking/02.jpg', updateDate: '2025年2月18日' },
    { id: 3, name: 'すすきの駅前パーキング',  location: '札幌市中央区南4条西4丁目',  price: '¥18,000/月', status: '空車',    features: ['屋内', 'ハイルーフ可', '女性専用エリア'],  image: '../img/parking/03.jpg', updateDate: '2025年2月15日' },
    { id: 4, name: '円山公園パーキング',      location: '札幌市中央区北1条西25丁目', price: '¥10,000/月', status: '残り2台', features: ['屋外', 'ミドルルーフ可', '公園隣接'],      image: '../img/parking/04.jpg', updateDate: '2025年2月12日' },
  ];

  // ---- Favorite parkings — separate data with their own images ----
  const favoriteParkings = [
    { id: 1, name: '札幌駅前パーキング',      location: '札幌市中央区北5条西2丁目', price: '¥15,000/月', status: '空車', features: ['屋内', 'ハイルーフ可', '24時間出入可'],    image: '../img/parking/fav01.jpg', updateDate: '2025年2月20日' },
    { id: 2, name: '大通公園サイドパーキング', location: '札幌市中央区大通西8丁目',  price: '¥12,000/月', status: '空車', features: ['屋外', 'ミドルルーフ可', 'セキュリティ完備'], image: '../img/parking/fav02.jpg', updateDate: '2025年2月18日' },
  ];

  // ---- Render user info ----
  const nameEl = document.getElementById('user-name');
  const idEl   = document.getElementById('user-id');
  if (nameEl) nameEl.textContent = 'ゲストアカウント';
  if (idEl)   idEl.textContent   = '会員番号: 12345678';

  // ---- Status color helper ----
  function statusColor(status) {
    const map = { active: '#28a745', processing: '#0056b3', pending: '#f0ad4e', ending: '#e74c3c' };
    return map[status] || '#888';
  }

  // ---- Render contracts ----
  const contractsList = document.getElementById('contracts-list');
  if (contractsList) {
    contractData.forEach(c => {
      const color = statusColor(c.status);
      contractsList.innerHTML += `
        <div class="contract-card">
          <div class="top-row">
            <div>
              <div class="name-row">
                <h3>${c.parkingName}</h3>
                <span class="badge" style="background:${color};color:#fff;">${c.statusLabel}</span>
              </div>
              <p class="meta-row">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                ${c.location}
              </p>
              <div class="dates">
                <span>開始: ${c.startDate}</span>
                ${c.endDate !== '-' ? `<span>終了: ${c.endDate}</span>` : ''}
              </div>
            </div>
            <p class="price">${c.price}</p>
          </div>
          <div class="progress-wrap">
            <div class="progress-label"><span>契約進捗</span><span>${c.progress}%</span></div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width:${c.progress}%;background:${color};"></div>
            </div>
          </div>
          <div class="contract-actions">
            <button onclick="window.location.href='../mypage-details_contracted/index.html';" class="btn btn-primary">詳細を見る</button>
            ${c.status === 'active' ? `<button class="btn" style="background:#e5e7eb;color:var(--text-dark); max-width: fit-content;">契約書ダウンロード</button>` : ''}
          </div>
        </div>
      `;
    });
  }

  // ---- Render news ----
  const newsList = document.getElementById('news-list');
  if (newsList) {
    newsData.forEach(n => {
      newsList.innerHTML += `
        <div class="news-card">
          <div class="inner">
            <span class="date-badge">${n.date}</span>
            <div>
              <h3>${n.title}</h3>
              <p>${n.content}</p>
            </div>
          </div>
        </div>
      `;
    });
  }

  // ---- Render parking card ----
  function renderParkingCard(p, isFav) {
    const heartFillAttr = isFav ? 'fill="#ef4444"' : 'fill="none"';
    const tags = p.features.map(f => `<span>${f}</span>`).join('');
    const statusClass = p.status === '空車' ? 'badge-blue' : 'badge-orange';

    // Red outlined badges only for favorite card id 2
    const idBadge     = (isFav && p.id === 2)
      ? `<span class="badge" style="background:#e74c3c;color:#fff;">${p.id}</span>`
      : `<span class="badge badge-blue">${p.id}</span>`;
    const statusBadge = (isFav && p.id === 2)
      ? `<span class="badge" style="background:#e74c3c;color:#fff;">${p.status}</span>`
      : `<span class="badge ${statusClass}">${p.status}</span>`;
    return `
      <div class="rec-card">
        <div class="img-rel">
          <img src="${p.image}" alt="${p.name}" />
          <span class="update-badge">${p.updateDate}更新</span>
          <button class="fav-btn">
            <svg width="18" height="18" stroke="#ef4444" stroke-width="2" viewBox="0 0 24 24" ${heartFillAttr}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
        </div>
        <div class="body">
          <div class="badges">
            ${idBadge}
            ${statusBadge}
          </div>
          <h3>${p.name}</h3>
          <p class="loc">${p.location}</p>
          <p class="rec-price">${p.price}</p>
          <div class="feature-tags">${tags}</div>
          <button class="btn btn-primary btn-full">詳細を見る</button>
        </div>
      </div>
    `;
  }

  // ---- Render recommended ----
  const recGrid = document.getElementById('recommended');
  if (recGrid) {
    recommendedParkings.forEach(p => { recGrid.innerHTML += renderParkingCard(p, false); });
  }

  // ---- Render favorites — uses favoriteParkings with its own images ----
  const favGrid = document.getElementById('favorites');
  if (favGrid) {
    favoriteParkings.forEach(p => { favGrid.innerHTML += renderParkingCard(p, true); });
  }

});

// =====================
// Profile / 登録情報変更 page logic
// =====================

(function initProfile() {
  const saveBtn    = document.getElementById('profile-save-btn');
  const cancelBtn  = document.getElementById('profile-cancel-btn');
  const toast      = document.getElementById('profile-toast');

  if (!saveBtn) return;

  const nameEl = document.getElementById('user-name');
  const idEl   = document.getElementById('user-id');
  if (nameEl) nameEl.textContent = 'ゲストアカウント';
  if (idEl)   idEl.textContent   = '会員番号: 12345678';

  function showToast(msg, isError) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.toggle('error', !!isError);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  function validate() {
    const name    = document.getElementById('field-name');
    const email   = document.getElementById('field-email');
    const phone   = document.getElementById('field-phone');
    const zip     = document.getElementById('field-zip');
    const address = document.getElementById('field-address');
    const pwCur   = document.getElementById('field-pw-current');
    const pwNew   = document.getElementById('field-pw-new');
    const pwConf  = document.getElementById('field-pw-confirm');

    if (!name || !name.value.trim())    { showToast('お名前を入力してください', true); return false; }
    if (!email || !email.value.trim())  { showToast('メールアドレスを入力してください', true); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showToast('正しいメールアドレスを入力してください', true); return false;
    }
    if (!phone || !phone.value.trim())  { showToast('電話番号を入力してください', true); return false; }
    if (!zip || !zip.value.trim())      { showToast('郵便番号を入力してください', true); return false; }
    if (!address || !address.value.trim()) { showToast('住所を入力してください', true); return false; }

    if (pwNew && pwNew.value) {
      if (!pwCur || !pwCur.value) { showToast('現在のパスワードを入力してください', true); return false; }
      if (pwNew.value.length < 8) { showToast('パスワードは8文字以上で入力してください', true); return false; }
      if (!pwConf || pwNew.value !== pwConf.value) {
        showToast('新しいパスワードが一致しません', true); return false;
      }
    }
    return true;
  }

  saveBtn.addEventListener('click', () => {
    if (!validate()) return;
    saveBtn.disabled = true;
    saveBtn.textContent = '保存中...';
    setTimeout(() => {
      saveBtn.disabled = false;
      saveBtn.textContent = '変更を保存';
      showToast('登録情報を保存しました ✓');
      ['field-pw-current', 'field-pw-new', 'field-pw-confirm'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
    }, 800);
  });

  const originalValues = {};
  ['field-name','field-email','field-phone','field-zip','field-address'].forEach(id => {
    const el = document.getElementById(id);
    if (el) originalValues[id] = el.value;
  });

  cancelBtn.addEventListener('click', () => {
    Object.entries(originalValues).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    });
    ['field-pw-current','field-pw-new','field-pw-confirm'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    showToast('変更をキャンセルしました');
  });

  const zipEl = document.getElementById('field-zip');
  if (zipEl) {
    zipEl.addEventListener('input', () => {
      let v = zipEl.value.replace(/\D/g, '').slice(0, 7);
      if (v.length > 3) v = v.slice(0,3) + '-' + v.slice(3);
      zipEl.value = v;
    });
  }

  const phoneEl = document.getElementById('field-phone');
  if (phoneEl) {
    phoneEl.addEventListener('input', () => {
      let v = phoneEl.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 7)      v = v.slice(0,3) + '-' + v.slice(3,7) + '-' + v.slice(7);
      else if (v.length > 3) v = v.slice(0,3) + '-' + v.slice(3);
      phoneEl.value = v;
    });
  }
})();


// =====================
// Mobile sidebar drawer toggle
// =====================

(function initSidebarDrawer() {
  const sidebar   = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  const closeBtn  = document.getElementById('sidebar-close-btn');
  const backdrop  = document.getElementById('sidebar-backdrop');

  if (!sidebar || !toggleBtn) return;

  function openSidebar() {
    sidebar.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (backdrop) backdrop.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSidebar();
  });

  sidebar.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) closeSidebar();
    });
  });
})();