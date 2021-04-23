import 'bootstrap/dist/js/bootstrap.bundle.js'

(function ($, Drupal) {
  'use strict';
  Drupal.behaviors.scrollToTop = {
    attach: function (context) {
      $('#btn-top', context).once('btn-top').on('click', () => {
        $("html, body").animate({ scrollTop: "10px" });
      })
    }
  };
  Drupal.behaviors.setWidthWorkTypeNav = {
    attach: function (context) {
      if ($('.project--full').length > 0) {
        let col = $('.project--full .col-lg-1');
        $('#nav-work-types').width(col.width());
      }
    }
  }

  $(function(){
    $('#try-search').on('click', e => {
      $('#search-block').removeClass('d-none').addClass('position-absolute');
    })
    $('#nav-work-types a').on('click', e => {
      $('#nav-work-types a').removeClass('active');
      $(e.currentTarget).addClass('active');
    });
  });

})(jQuery, Drupal);
