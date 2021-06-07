import 'bootstrap/dist/js/bootstrap.bundle.js'
import vars from '../sass/export.scss'

import BigPicture from 'bigpicture'

let mediaDown = (breakpoint) => {
  return window.matchMedia("(max-width:" + vars[breakpoint] + ")").matches
}
let mediaUp = (breakpoint) => {
  return window.matchMedia("(min-width:" + vars[breakpoint] + ")").matches
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
        let col = $('.project--full .col-lg-1')
        $('#nav-work-types').width(col.width())
      }
    }
  }
  Drupal.behaviors.fixByScreen = {
    attach: function (context, settings) {
      $('body', context).once('responsive').each(() => {
        if (mediaDown('mbp')) {
          $('#search-input').css('maxWidth', '130px')
        }
        if (mediaDown('xxl')) {
          $('.card--project .project--teaser span').css('marginTop', '9px')
          $('#search-input').css('maxWidth', '130px')
        }
        if (mediaDown('xl')) {
          $('#search-input').css('maxWidth', '70px')
        }
        if (mediaDown('md')) {
          initNavbar(settings)
          if ($('.projects-browse').length > 0) {
            $('.projects-browse .row.pe-3').hide()
          }
          $('.card--project .project--teaser span').css({
            'marginTop': '11px',
            'fontSize': '12px',
          })
          $('.card--project .project--teaser .project__field-info-list').css({'fontSize': '10px'})

          // 프로젝트 아카이브 텍스트 목록
          let projectBrowseNavbar = $('.block--views-block--projects-block-projects-browse-navbar')
          let projectTitles = projectBrowseNavbar.find('.project--title')
          if (projectTitles.length > 0) {
            projectTitles.each( (i, title) => {
              if ($(title).height() > 20) {
                $(title).siblings('.project--year').height($(title).height())
              }
            })
            $('.row header').css('padding', 0)
            $('.row.me-3').removeClass('me-3').addClass('me-1')
            $('.border-bottom.ms-3').removeClass('ms-3').addClass('ms-1')
          }

          // 프로젝트 상세
          let projectFull = $('.project--full');
          if (projectFull.length > 0) {
            $('#nav-work-types').removeClass('position-fixed')
              .addClass('float-end').css('marginBottom', '-36px')
              .prependTo($('#page--title'));
          }

          // about
          let aboutPage = $('.body--about')
          if (aboutPage.length >  0) {
            $('.block--bs21-page-title, .block--bs21-content p:first-of-type').hide()
          }
        }

        if (mediaUp('md')) {
          $('.card--project .project--teaser span').css({
            'marginTop': '16px',
            'fontSize': '13px',
          })
          $('.card--project .project--teaser .project__field-info-list').css({ 'fontSize': '12px' })
        }

        if (mediaUp('xl')) {
          $('#navbarSupportedContent').css({
            "marginLeft": "3px",
            "marginRight": "-25px"
          })
          let columnWidth = $('#search-input').closest('.col-lg-4').width() - (45 + 22)
          $('#search-input').addClass('w-100').css({
            'maxWidth': columnWidth + 'px',
            'position': 'absolute',
            'marginTop': '-14px',
          }).closest('.nav-item').addClass('pe-0')
          $('.card--project .project--teaser span').css({
            'marginTop': '15px',
            'lineHeight': '19px',
            'fontSize': '13px',
          })
          $('.card--project .project--teaser .project__field-info-list')
            .css({ 'fontSize': '11px' })
        }

        if (mediaUp('xxl')) {
          $('#navbarSupportedContent').css({
            "marginLeft": "9px",
            "marginRight": "-25px"
          })
          let columnWidth = $('#search-input').closest('.col-lg-4').width() - (58 + 8)
          $('#search-input').addClass('w-100').css({
            'maxWidth': columnWidth + 'px',
            'position': 'absolute',
            'marginTop': '-14px',
          }).closest('.nav-item').addClass('pe-0')
          $('.card--project .project--teaser').css('marginBottom', '2px')
          $('.card--project .project--teaser span').css({
            'marginTop': '18px',
            'lineHeight': '25px',
            'fontSize': '16px',
          })
          $('.card--project .project--teaser .project__field-info-list')
            .css({ 'fontSize': '14px' })
        }
      })
    }
  }
  function initNavbar(settings) {
    console.log('initNavbar')
    $('#search-input').css('maxWidth', '140px')
    $('#global-nav .container-fluid, #global-nav .container-fluid .navbar-nav').removeClass('row');
    $('#navbarSupportedContent').removeClass('ps-2')
    $('#navbarSupportedContent li a').removeClass('ms-2')
    $('#navbarInner').css('minHeight', $(window).height() + 'px')
  }

  function undoNavbar(settings) {
    $('#global-nav .container-fluid, #global-nav .container-fluid .navbar-nav').addClass('row');
    $('#navbarSupportedContent').addClass('ps-2')
    $('#navbarSupportedContent li a').addClass('ms-2')
  }

  $(function () {
    $('#try-search').on('click', e => {
      e.preventDefault()
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

    if (!mediaDown('sm')) {
      $('.project--full .works__field-media img').on('click', e => {
        e.preventDefault();
        let images = Array.from(
            document.querySelectorAll('.works__field-media img')
          ).map(img => {
          return { src: img.src.replace('thumbnail', 'x_large') }
        })
        console.log(images)
        BigPicture({
          el: e.target,
          gallery: images,
          noLoader: true,
          animationStart: () => {
            $('#bp_container .bp-x').css({
              'width': '20px', 'height': '29px',
              'top': '43px', 'right': '42px'
            })
            $('#bp_aud, #bp_container img, #bp_sv, #bp_vid').css({
              'maxHeight': '100%', 'maxWidth': '100%',
            })
            $('#bp_container .bp-x svg').css({'fill': '#000'})
            if (mediaUp('xxl')) {
              $('#bp_container .bp-lr').css('width', '2.3%')
            }
            else {
              $('#bp_container .bp-lr').css('width', '5.5%')
            }
            $('#bp_container .bp-lr svg')
              .attr('fill', '#000')
              .attr('height', '29px');
            $('.bp-lr').css('opacity', '1')
          },
          onChangeImage: () => {
            $('#bp_aud, #bp_container img, #bp_sv, #bp_vid').css({
              'maxHeight': '100%',
              'height': '100% !important'
            })
            if (mediaUp('xxl')) {
              $('#bp_container .bp-lr').css('width', '2.3%')
            }
          }
        })
        // Make available globally
        window.BigPicture = BigPicture
      })
    }

  })

})(jQuery, Drupal)
