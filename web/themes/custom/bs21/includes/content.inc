<?php
/**
 * @file
 * Theme and preprocess functions for nodes.
 */

use \Drupal\node\Entity\Node;

/**
 * Implements hook_preprocess_node().
 */
function bs21_preprocess_node(&$vars) {
  if ($vars['node']->bundle() == 'project') {
    if ($vars['view_mode'] == 'teaser') {
      $items = $vars['content']['field_works']['#items'] ?? NULL;
      $count = (!empty($items)) ? count($items) - 1 : 0;
      if ($count > 0) {
        foreach (range(1, $count) as $index) {
          unset($vars['content']['field_works'][$index]);
        }
      }
    }
    if ($vars['view_mode'] == 'full') {
      $prev_nid = $vars['content']['prevnext_previous']['#nid'] ?? '';
      $next_nid = $vars['content']['prevnext_next']['#nid'] ?? '';
      $vars['prev'] = Node::load($prev_nid);
      $vars['next'] = Node::load($next_nid);
    }
  }
}

/**
 * Implements template_preprocess_paragraph().
 */
function bs21_preprocess_paragraph(&$vars) {
  if ($vars['paragraph']->bundle() == 'works' && $vars['view_mode'] == 'preview') {
    $items = $vars['content']['field_media']['#items'] ?? NULL;
    $count = (!empty($items)) ? count($items) - 1 : 0;
    if ($count > 0) {
      foreach (range(1, $count) as $index) {
        unset($vars['content']['field_media'][$index]);
      }
    }
  }
  if ($vars['paragraph']->bundle() == 'works' && $vars['view_mode'] == 'default') {
    $items = $vars['content']['field_work_type']['#items'] ?? NULL;
    $count = (!empty($items)) ? count($items) : 0;
    if ($count > 0) {
      foreach (range(1, $count) as $index) {
        $vars['content']['field_work_type']['#attributes'] = [
          'class' => 'visually-hidden',
          'id' => 'work-type-' . $index,
        ];
      }
    }
  }
}

/**
 * Implements hook_preprocess_page().
 */
function bs21_preprocess_page(&$vars) {
  if ($vars['page']['#title'] == '') {
    unset($vars['page']['header']);
  }
}
