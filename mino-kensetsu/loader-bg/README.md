# loader-bg

## 内容物
- loader_logo.jpg(任意の画像に差し替え)
- loader-bg.css(ローディングのロゴサイズの変更等)
- loader-bg.js(本体)
- progressbar.js(プログレスバー表示用)
- README.md (このファイル)

## 設置方法


1. footerの上の方に記述
  <!-- loader-bg -->
  <div id="loader-bg">
    <div id="loader">
      <img src="<?php echo get_template_directory_uri(); ?>/assets/loader-bg/loader_logo.jpg" alt="Loading..." />
      <div class="loadingBar" id="loadingBar"></div>
    </div>
  </div>
  <!-- //loader-bg -->


2. 別途　読み込み用のソースを記述
  <!-- jQuery本体読み込みも必須 -->
  <script src="<?php echo get_template_directory_uri(); ?>/assets/loader-bg/loader-bg.js"></script>
  <script src="<?php echo get_template_directory_uri(); ?>/assets/loader-bg/progressbar.js"></script>
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/loader-bg/loader-bg.css">