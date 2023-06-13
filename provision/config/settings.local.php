<?php

/**
 * @file
 * Settings for site.
 */

// use Kint\Kint;

$databases['default']['default'] = [
  'database' => 'baanstudio21',
  'username' => 'vagrant',
  'password' => 'vagrant',
  'prefix' => 'drupal_',
  'host' => 'localhost',
  'port' => '3306',
  'driver' => 'mysql',
  'init_commands' => [
    'isolation_level' => 'SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED',
  ],
];

$settings['hash_salt'] = 'vNYSZt52CdlIsneqCs6ZeYsxJnnlFcqId4aBHfKcJkmupzaEX38SCTD4b_Bh4SdzjnTBjry0Gg';
$settings['config_sync_directory'] = '../config/sync';

$settings['trusted_host_patterns'] = [
  '^localhost$',
  '^192\.168\.21\.3$',
];

// $settings['container_yamls'][] = DRUPAL_ROOT . '/sites/default/theme-dev.services.yml';

$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
// $settings['cache']['bins']['render'] = 'cache.backend.null';
// $settings['cache']['bins']['page'] = 'cache.backend.null';
// $settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
// $settings['extension_discovery_scan_tests'] = FALSE;

$settings['config_exclude_modules'] = ['devel', 'kint', 'stage_file_proxy'];

// Change kint max_depth setting. Set the max_depth to prevent out-of-memory.
// Kint::$max_depth = 2;
