<?php
/**
 * @file
 * Theme and preprocess functions for nodes.
 */

/**
 * Implements hook_preprocess_node().
 */
function bs21_preprocess_node(&$vars) {
  if ($vars['node']->bundle() == 'project' && $vars['view_mode'] == 'teaser') {
    // ksm($vars);
  }
}

/**
 * Implements template_preprocess_paragraph().
 */
function bs21_preprocess_paragraph(&$vars) {
  if ($vars['paragraph']->bundle() == 'works' && $vars['view_mode'] == 'preview') {
    $count = count($vars['content']['field_media']['#items']) - 1;
    if ($count > 0) {
      foreach (range(1, $count) as $index) {
        unset($vars['content']['field_media'][$index]);
      }
    }

  }
}
