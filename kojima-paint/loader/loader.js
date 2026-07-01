/* jsに別途以下を記載するか、ファイル名を変更してしかるべき記述を追加した上でインクルードさせてください */
/*--- loader ---*/
$(function(){
  h = $(window).height();

  $('#loader-bg').height(h).show();
  $('#loader').height(h).show();

  var bar = new ProgressBar.Line(loadingBar, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#63BDEE',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: {width: '100%', height: '100%'}
  });
  bar.animate(1.0);

  $('#loader-bg').delay(3000).fadeOut(700);
  $('#loader').delay(1500).fadeOut(700);

});
