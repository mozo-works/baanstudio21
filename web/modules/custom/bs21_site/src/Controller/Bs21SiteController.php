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
    return 'About';
  }

  /**
   * Returns a page render array.
   */
  public function aboutContent() {
    $build = [
      '#type' => 'container',
      '#attributes' => ['class' => 'row'],
    ];
    $columns = bs21_site_config('about')->field_columns->getValue();
    foreach ($columns as $order => $column) {
      $grids = [5, 3, 3];
      $build[$order] = [
        '#type' => 'container',
        '#attributes' => ['class' => ['col-md-' . $grids[$order]]],
        'content' => ['#markup' => $column['value']],
      ];
      if ($order == 1) {
        $build[$order]['#attributes']['class'][] = 'offset-md-1';
      }
    }

    return $build;
  }

}
