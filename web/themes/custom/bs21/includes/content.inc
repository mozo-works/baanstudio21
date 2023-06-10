<?php

/**
 * @file
 * Theme and preprocess functions for nodes.
 */

use Drupal\Core\Url;
use Drupal\node\Entity\Node;

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

      if (!empty($vars['content']['field_year_month'])) {
        $dates = explode('-', $vars['content']['field_year_month'][0]['#text']);
        $dates[] = '';
        $vars['content']['field_year_month'][0]['#text'] = implode('. ', $dates);
      }

      $works = $vars['node']->field_works->referencedEntities();
      $work_types = [
        '#theme' => 'item_list',
        '#list_type' => 'ul',
        '#attributes' => ['class' => ['text-end', 'd-block']],
      ];
      foreach ($works as $index => $work) {
        $term = $work->field_work_type->entity;
        if (!empty($term)) {
          $link = [
            '#type' => 'link',
            '#title' => $term->getName(),
            '#url' => Url::fromUserInput('#work-type-' . $term->id()),
          ];
          if ($index === 0) {
            $options = ['attributes' => ['class' => 'active']];
            $link['#options'] = $options;
          }
          $work_types['#items'][]['#children'] = \Drupal::service('renderer')->render($link);
          if ($index === 0) {
            $link['#attributes']['class'][] = 'active';
          }
        }
      }
      $vars['work_types'] = $work_types;
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
  // 프로젝트 상세 화면.
  if ($vars['paragraph']->bundle() == 'works' && $vars['view_mode'] == 'default') {
    $items = $vars['content']['field_work_type']['#items'] ?? NULL;
    $count = (!empty($items)) ? count($items) : 0;
    if ($count > 0) {
      $medias = $vars['paragraph']->field_media->referencedEntities();
      $images = [];
      foreach ($medias as $media) {
        $file = $media->field_media_image->entity;
        $image = \Drupal::service('image.factory')->get($file->getFileUri());
        $images[] = [
          '#theme' => 'image_style',
          '#width' => $image->getWidth(),
          '#height' => $image->getHeight(),
          '#style_name' => 'x_large',
          '#uri' => $file->getFileUri(),
        ];
      }

      $work_types = $vars['content']['field_work_type'];
      unset($vars['content']);

      $field_work_type = $work_types['#object']->field_work_type->getValue();
      $work_type = reset($field_work_type);
      $tid = $work_type['target_id'];
      $vars['content']['field_work_type'] = $work_types;
      foreach (range(1, $count) as $index) {
        $vars['content']['field_work_type']['#attributes'] = [
          'class' => 'visually-hidden',
          'id' => 'work-type-' . $tid,
        ];
      }
      $vars['content']['images'] = [
        '#theme' => 'container',
        '#attributes' => ['id' => ['image-gallery']],
        '#children' => $images,
      ];
    }
  }
}
