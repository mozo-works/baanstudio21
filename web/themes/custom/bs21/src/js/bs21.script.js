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
        $("html, body, #navbarSupportedContent").animate({ scrollTop: "0px" })
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
        if (mediaDown('lg')) {
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
            $('#nav-work-types').hide()
            $('.works__field-work-type')
              .removeClass('visually-hidden')
              .addClass('mb-1')
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
    $('#search-input').css('maxWidth', '140px')
    $('#global-nav .container-fluid, #global-nav .container-fluid .navbar-nav').removeClass('row');
    $('#navbarSupportedContent').removeClass('ps-2')
    $('#navbarSupportedContent li a').removeClass('ms-2')
    $('#navbarInner').css('minHeight', $(window).height() + 'px')
  }

  Drupal.behaviors.suffleFrontProjects = {
    attach: (context, settings) => {
      if (settings.path.isFront) {
        let container = $('.card--project').closest('.row').get(0);
        // https://stackoverflow.com/a/11972692
        for (var i = container.children.length; i >= 0; i--) {
          container.appendChild(container.children[Math.random() * i | 0]);
        }
      }
    }
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

    // 작업 유형 네비게이션
    if ($('#nav-work-types').length > 0) {
      // 클릭 시 active.
      $('#nav-work-types a').on('click', e => {
        $('#nav-work-types a').removeClass('active')
        $(e.currentTarget).addClass('active')
        e.preventDefault()
        let target = $($(e.currentTarget).attr('href')).offset().top - $('#nav-work-types').position().top
        window.scrollTo(0, target)
      })
    }

    let footerBottom = window.screen.height - $('#site-footer').offset().top
    if (footerBottom > 70 && footerBottom - 250 > 0) {
      $('#site-footer').css('marginTop', footerBottom - 250)
      $('#btn-top, #navbar--btn-top').addClass('d-none')
    }

    if (!mediaDown('lg')) {
      // bigPicture 용도로 이미지 마크업 수정
      $('#image-gallery img').each((index, image) => {
        $(image).attr('data-bp', image.src)
        let a = $('<a/>').attr('href', image.src)
        $(image).wrap(a)
      })

      // 프로젝트 상세 화면 이미지 클릭 시 bigPicture 띄우기.
      $('#image-gallery img').on('click', e => {
        e.preventDefault();
        BigPicture({
          el: e.target,
          gallery: '#image-gallery',
          noLoader: true,
          loop: true,
          animationStart: () => {
            $('#bp_container .bp-x').css({
              'width': '20px', 'height': '29px',
              'top': '43px', 'right': '42px'
            })
            if (mediaUp('xl')) {
              $('#bp_container .bp-x').css({
                'top': '21px', 'right': '20px'
              })
              $('#bp_container .bp-x svg').css({
                'width': '10px', 'height': '14px',
              })
              $('#bp_container .bp-lr svg').css('width', '15px')
            }
            $('#bp_aud, #bp_container img, #bp_sv, #bp_vid').css({
              'maxHeight': '100%', 'maxWidth': '100%',
            })
            $('#bp_container .bp-x svg').css({'fill': '#000'})
            if (mediaUp('xxl')) {
              $('#bp_container .bp-lr').css('width', '2.3%')
            }
            else {
              $('#bp_container .bp-lr').css('width', '4.3%')
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

      // 프로젝트 상세 화면 제목 고정.
      if ($('.project--full').length > 0) {
        $('#page--title').addClass('position-fixed')
          .css({
            'width': $('.project--description').width(),
            'backgroundColor': '#f8f8f8',
            'paddingBottom': '30px',
            'paddingTop': '70px',
            'marginTop': '-70px'
          })
        $('.project__field-info').css('marginTop', '40px')
      }
    }

    // 검색 화면
    if ($('#edit-keys').length > 0) {
      $('#edit-keys').get(0).focus();
      if (mediaDown('md')) {
        $('.js-form-type-search').addClass('w-100')
        $('#search-form').height('44px');
      }
      if (mediaUp('lg')) {
        $('#search-form').hide();
      }
    }

    // 비공개 노드 링크 제거
    if ($('.unpublished').length > 0) {
      $('.unpublished').each( (index, node) => {
        $(node).find('.field-content').html($(node).find('a').html());
      });
    }
  })

})(jQuery, Drupal)
