<?php

/**
 * @file
 * Custom theme hooks.
 */
use Drupal\Component\Utility\Html;

/**
 * Implements hook_preprocess_page().
 */
function bs21_preprocess_page(&$vars) {
  if ($vars['page']['#title'] == '' || is_project_page($vars)) {
    // unset($vars['page']['header']);
  }
  $vars['keys'] = \Drupal::request()->query->get('keys') ?? '';
}

/**
 * Check if current page is project.
 */
function is_project_page($vars) {
  return (!empty($vars['node'])
    && $vars['node']->bundle() == 'project'
  );
}

/**
 * Implements template_preprocess_html().
 */
function bs21_preprocess_html(&$vars) {
  $path_args = explode('/', ltrim(\Drupal::service('path.current')->getPath(), '/'));
  $vars['attributes']['class'] = theme_get_suggestions($path_args, 'body', '--');
}

/**
 * Implements template_preprocess_search_result().
 */
function bs21_preprocess_search_result(&$vars) {
  // ksm($vars['result']);
}

/**
 * Implements template_preprocess_item_list().
 */
function bs21_preprocess_item_list(&$vars) {
  if ($vars['theme_hook_original'] == 'item_list__search_results') {
    $vars['list_type'] = 'ul';
    $vars['attributes']['class'][] = 'list-unstyled';
  }
}
