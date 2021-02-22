<?php

namespace Drupal\bs21_site\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Returns responses for bs21_site routes.
 */
class Bs21SiteController extends ControllerBase {

  /**
   * Returns a page title.
   */
  public function aboutTitle() {
    return  '소개';
  }

  /**
   * Returns a page render array.
   */
  public function aboutContent() {
    $build = [
      '#type' => 'container',
      '#attributes' => ['class' => 'row']
    ];
    $columns = bs21_site_config('about')->field_columns->getValue();
    foreach ($columns as $order => $column) {
      $build[$order] = [
        '#type' => 'container',
        '#attributes' => ['class' => 'col-md-3'],
        'content' => ['#markup' => $column['value']],
      ];
    }

    return $build;
  }

}
