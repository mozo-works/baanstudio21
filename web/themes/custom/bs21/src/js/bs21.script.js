import 'bootstrap/dist/js/bootstrap.bundle.js'
import vars from '../sass/export.scss'

import BigPicture from 'bigpicture'

let mediaDown = (breakpoint) => {
  return window.matchMedia("(max-width:" + vars[breakpoint] + ")").matches
}

(function ($, Drupal) {
  'use strict'
  Drupal.behaviors.scrollToTop = {
    attach: function (context) {
      $('#btn-top, #navbar--btn-top', context).once('btn-top').on('click', () => {
        $("html, body, #navbarSupportedContent").animate({ scrollTop: "10px" })
      })
    }
  }
  Drupal.behaviors.setWidthWorkTypeNav = {
    attach: function () {
      if ($('.project--full').length > 0) {
        let col = $('.project--full .col-md-1')
        $('#nav-work-types').width(col.width())
      }
    }
  }
  Drupal.behaviors.fixByScreen = {
    attach: function (context, settings) {
      $('body', context).once('responsive').each(() => {
        if (mediaDown('md')) {
          initNavbar(settings)
          $('.navbar-nav a').on('click', function(e){
            e.preventDefault()
            activeNavbarItem(e.target)
          })
          if ($('.projects-browse').length > 0) {
            $('.projects-browse .row.pe-3').hide()
          }
        }
        if (mediaDown('xl')) {
          $('#search-input').css('maxWidth', '70px')
        }
        if (mediaDown('xxl')) {
          $('.card--project .project--teaser span').css('marginTop', '9px')
          $('#search-input').css('maxWidth', '130px')
        }
        if (mediaDown('mbp')) {
          $('#search-input').css('maxWidth', '130px')
        }
      })
    }
  }
  function initNavbar(settings) {
    $('#search-input').css('maxWidth', '140px')
    $('#global-nav .container-fluid, #global-nav .container-fluid .navbar-nav').removeClass('row');
    $('#navbarSupportedContent').removeClass('ps-2')
    $('#navbarSupportedContent li a').removeClass('ms-2')
    $('#navbarInner').css('minHeight', $(window).height() + 'px')
    // 툴바있는 경우 하단 푸터 위치 조정.
    if (settings.toolbar) {
      $('#navbarFooter').css('bottom', '+=40')
    }
    $('#navbarInnerContainer').removeClass('d-none')
    $('#navbarInnerContainer .inner-content').addClass('d-none')
    $('#search-block form').on('submit', e => {
      e.preventDefault();
      let keyword = $('#search-input').val()
      $('#content--search').removeClass('d-none')
        .load('/search/node?keys=' + keyword + ' .page--content .list-unstyled')
      $('#navbarInner').css('minHeight', $(window).height() - 217 + 'px')
      if ($('#content--search').height() < 380) {
        $('#navbarInner').css('minHeight', $(window).height() - 215 + 'px')
        $('#navbarFooter').addClass('position-absolute').css('bottom', 0)
      }
    })
  }
  function resetNavbar() {
    $('body').removeClass('noscroll');
    let activeClass = 'text-dark border-bottom pb-1'
    $('#navbarSupportedContent li a').removeClass(activeClass)
      .closest('.nav-item').removeClass('text-start')
    $('#navbarFooter').addClass('position-absolute')
    $('#navbarInnerContent .inner-content').addClass('d-none')
    $('#search-block').addClass('d-none')
  }
  function activeNavbarItem(target) {
    resetNavbar()
    $('body').addClass('noscroll')
    $('#navbarSupportedContent').css({
      'height': $(window).height() - 39 + 'px',
      'overflowY': 'scroll'
    })
    let activeClass = 'text-dark border-bottom pb-1'
    let targetId = $(target).data('target');
    $(target).addClass(activeClass)
      .closest('.nav-item').addClass('text-start')
    $('#navbarFooter').removeClass('position-absolute')
    if (targetId) {
      $('#content--' + targetId).removeClass('d-none')
    }
    // 검색
    else {
      if ($('#content--search').height() < 380) {
        $('#navbarFooter').addClass('position-absolute')
      }
    }
  }

  $(function () {
    $('#try-search').on('click', e => {
      if ($('#search-block').hasClass('d-none')) {
        $('#search-block').removeClass('d-none')
      }
      else {
        $('#search-block').addClass('d-none')
      }
    })

    if ($('#nav-work-types').length > 0) {
      // 클릭 시 active.
      $('#nav-work-types a').on('click', e => {
        $('#nav-work-types a').removeClass('active')
        $(e.currentTarget).addClass('active')
        e.preventDefault()
        let target = $($(e.currentTarget).attr('href')).offset().top - $('#nav-work-types').offset().top
        window.scrollTo(0, target)
      })
    }

    let footerBottom = window.screen.height - $('#site-footer').offset().top
    if (footerBottom > 70 && footerBottom - 250 > 0) {
      $('#site-footer').css('marginTop', footerBottom - 250)
      $('#btn-top, #navbar--btn-top').addClass('d-none')
    }

    $('#navbarSupportedContent').on('hide.bs.collapse', e => {
      resetNavbar()
    })

    if (!mediaDown('sm')) {
      $('.project--full .works__field-media img').on('click', e => {
        e.preventDefault();
        let images = Array.from(
            document.querySelectorAll('.works__field-media img')
          ).map(img => {
          return { src: img.src.replace('thumbnail', 'x_large') }
        })
        BigPicture({
          el: e.target,
          gallery: images,
          noLoader: true,
          animationStart: () => {
            $('#bp_container .bp-x').css({
              'width': '20px', 'height': '29px',
              'top': '43px', 'right': '42px'
            })
            $('#bp_container .bp-x svg').css({'fill': '#000'})

            $('#bp_container img').css('maxHeight', '100%')

            $('#bp_container .bp-lr').css('width', '5.5%')
            $('#bp_container .bp-lr svg')
              .attr('fill', '#000')
              .attr('height', '29px');
            $('.bp-lr').css('opacity', '1')
          },
          onChangeImage: () => {
            $('#bp_container img').css('maxHeight', '100%')
          }
        })
        // Make available globally
        window.BigPicture = BigPicture
      })
    }

  })

})(jQuery, Drupal)
