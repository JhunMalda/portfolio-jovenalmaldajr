// =====================
// mypage-login.js — Login page only
// Include this script ONLY in your mypage/login/index.njk template
// functions.js must be loaded before this file
// =====================

// document.addEventListener('DOMContentLoaded', () => {
//   if (Auth.isLoggedIn()) {
//     window.location.href = '../mypage-login/index.html';
//     return;
//   }

//   const guestBtn = document.getElementById('guest-btn');
//   if (guestBtn) {
//     guestBtn.addEventListener('click', function () {
//       Auth.login('ゲストユーザー', true);
//       window.location.href = '../mypage-login/index.html';
//     });
//   }
// });