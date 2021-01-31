import 'bootstrap/dist/js/bootstrap.bundle.js'

(function ($, Drupal) {
  'use strict';
  Drupal.behaviors.helloWorld = {
    attach: function (context) {
      console.log('Hello World');
    }
  };
  console.log('loaded!')

})(jQuery, Drupal);
