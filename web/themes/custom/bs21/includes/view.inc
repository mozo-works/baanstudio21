<?php

/**
 * @file
 * Theme and preprocess functions for views.
 */

/**
 * Implements template_preprocess_views_view_summary().
 */
function bs21_preprocess_views_view_summary(&$vars) {
  if ($vars['view']->current_display == 'block_projects_browse_navbar') {
    $vars['attributes']['class'][] = 'list-unstyled';
  }
}

/**
 * Implements template_preprocess_views_view().
 */
function bs21_preprocess_views_view(&$vars) {
  if ($vars['display_id'] === 'page_browse') {
    $vars['exposed']['#attributes']['class'][] = 'd-none';
  }
  if ($vars['display_id'] === 'block_projects_browse_navbar') {
    $vars['exposed']['#attributes']['class'][] = 'd-none';

    $params = $vars['view']->getExposedInput();
    $title_sort = $year_sort = 'DESC';
    if (!empty($params['sort_by']) && $params['sort_by'] == 'title') {
      $title_sort = ($params['sort_order'] == 'ASC') ? 'DESC' : 'ASC';
    }
    if (!empty($params['sort_by']) && $params['sort_by'] == 'field_year_month_value') {
      $year_sort = ($params['sort_order'] == 'ASC') ? 'DESC' : 'ASC';
    }

    $partial_template = dirname(__FILE__) . '/../templates/misc/project-navbar.html.twig';
    $vars['header']['navbar'] = [
      '#type' => 'inline_template',
      '#template' => file_get_contents($partial_template),
      '#context' => [
        'title' => $title_sort,
        'field_year_month' => $year_sort,
      ],
    ];
  }
}
