/* jsに別途以下を記載するか、ファイル名を変更してしかるべき記述を追加した上でインクルードさせてください */
/*--- loader ---*/
$(function () {
  id = $('body').attr('id');
  $('#loader-bg ,#loader').css('display', 'block');

  var bar = new ProgressBar.Line(loadingBar, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#CB6D51', // バーの色を変更
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: { width: '100%', height: '100%' }
  });

  bar.animate(1.0);

  $('#loader-bg').delay(750).fadeOut(800);
  $('#loader').delay(800).fadeOut(300);
});