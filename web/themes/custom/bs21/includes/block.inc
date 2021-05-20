<?php

/**
 * @file
 * Theme and preprocess functions for blocks.
 */

/**
 * Implements hook_preprocess_block().
 */
function bs21_preprocess_block(&$vars) {
  if ($vars['plugin_id'] == 'views_block:projects-block_projects_browse_navbar') {
    $vars['attributes']['class'][] = 'col-md-6 ps-2';
  }
  if ($vars['plugin_id'] == 'system_main_block') {
  }
}
