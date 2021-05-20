<?php

/**
 * @file
 * Custom theme hooks.
 */

use Drupal\Core\Template\Attribute;
use Drupal\bs21_site\Controller\Bs21SiteController;

/**
 * Implements hook_preprocess_page().
 */
function bs21_preprocess_page(&$vars) {
  if ($vars['page']['#title'] == '' || is_project_page($vars)) {
    unset($vars['page']['header']);
  }
  $vars['keys'] = \Drupal::request()->query->get('keys') ?? '';
  $vars['header_attributes'] = new Attribute(['class' => 'page--header sticky-top']);
  $vars['main_attributes'] = new Attribute(['class' => 'pb-5 block--content']);
  $vars['main_header_attributes'] = new Attribute(['class' => 'page--header']);
  $vars['main_content_attributes'] = new Attribute(['class' => 'container-fluid p-0']);

  $current_path = \Drupal::service('path.current')->getPath();
  if (strpos($current_path, '/projects/browse') !== FALSE) {
    $vars['attributes']['class'][] = 'projects-browse';
    $vars['page']['content']['bs21_content']['#attributes']['class'][] = 'pt-0';
    $vars['main_attributes']['class'][] = 'pt-0';
    $vars['main_content_attributes']['class'][] = 'd-flex';
    $vars['main_header_attributes']['class'][] = 'd-none';
  }

  // 모바일 메뉴 콘텐츠 추가.
  // 1. 프로젝트 텍스트 목록.
  $vars['navbar_contents']['projects_list'] = [
    '#type' => 'view',
    '#name' => 'projects',
    '#display_id' => 'block_projects_browse_navbar',
  ];

  $vars['navbar_contents']['search'] = '';

  // 3. 소개 화면.
  $about_content = Bs21SiteController::aboutContent();
  $vars['navbar_contents']['about'] = $about_content;

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
