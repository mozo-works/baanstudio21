<?php

/**
 * @file
 * Settings for site.
 */

$databases['default']['default'] = [
  'database' => 'baanstudio21',
  'username' => 'vagrant',
  'password' => 'vagrant',
  'prefix' => 'drupal_',
  'host' => 'localhost',
  'port' => '3306',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
];

$settings['hash_salt'] = 'vNYSZt52CdlIsneqCs6ZeYsxJnnlFcqId4aBHfKcJkmupzaEX38SCTD4b_Bh4SdzjnTBjry0Gg';
$settings['config_sync_directory'] = '../config/sync';

$settings['trusted_host_patterns'] = [
  '^localhost$',
];

$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/default/theme-dev.services.yml';

$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
$settings['extension_discovery_scan_tests'] = FALSE;

$settings['config_exclude_modules'] = ['devel', 'kint', 'stage_file_proxy'];
