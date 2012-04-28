
/**
 * Easing from jQuery UI
 * Don't bundle entire jQuery UI, just easeInOutExpo quad
 */

$.extend($.easing, {
  easeInOutExpo: function (x, t, b, c, d) {
    if (t == 0) {
      return b;
    };
    if (t == d) {
      return b + c;
    };
    if ((t /= d / 2) < 1) {
      return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    };
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }
});

$.fn.notify = function() {
  // set text
  if ($('#flash').html() === '') {
    return;
  } else {
    var message = '';
    var infos = $('#flash').find('.info');
    if (infos.length !== 0) {
      $(infos).each(function(index, info) {
        message += $(info).html();
      });
    };
    var errors = $('#flash').find('.error');
    if (errors.length !== 0) {
      $(errors).each(function(index, error) {
        message += $(error).html();
      });
    };
  };
  console.log(message);
  // append content
  $('#notify p').html(message);
  $(this).css('display', 'block');
  // slide down
  $('#notify').animate({
    top : 0
  }, 750, 'easeInOutExpo', function() {
    setTimeout(function() {
      // slide up
      $('#notify').animate({
        top : -60
      }, 750, 'easeInOutExpo', function() {
        // clear text/styles
        $('#notify p').html('');
      });
    }, 3000);
  });
};

/* EOF */