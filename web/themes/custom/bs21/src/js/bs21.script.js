import 'bootstrap/dist/js/bootstrap.bundle.js'
import vars from '../sass/bs21.style.scss'

console.log(vars);

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
        let col = $('.project--full .col-md-1');
        $('#nav-work-types').width(col.width());
      }
    }
  }

  Drupal.behaviors.fixByScreen = {
    attach: function (context) {
      console.log(Drupal);
    }
  };

  $(function () {
    $('#try-search').on('click', e => {
      $('#search-block').removeClass('d-none').addClass('position-absolute');
    });

    if ($('#nav-work-types').length > 0) {
      // 클릭 시 active.
      $('#nav-work-types a').on('click', e => {
        $('#nav-work-types a').removeClass('active');
        $(e.currentTarget).addClass('active');
        e.preventDefault();
        let target = $($(e.currentTarget).attr('href')).offset().top - $('#nav-work-types').offset().top;
        window.scrollTo(0, target);
      });
    }

    let footerBottom = window.screen.height - $('#site-footer').offset().top;
    if (footerBottom > 70) {
      $('#site-footer').css('marginTop', footerBottom - 250);
      $('#btn-top').addClass('d-none');
    }

  });

})(jQuery, Drupal);
