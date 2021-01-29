<?php

/**
 * @file
 * Settings for site.
 */

$databases['default']['default'] = [
  'database' => 'aihub_manager',
  'username' => 'vagrant',
  'password' => 'vagrant',
  'prefix' => 'drupal_',
  'host' => 'localhost',
  'port' => '3306',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
];

$settings['config_sync_directory'] = '../config/sync';

$settings['trusted_host_patterns'] = [
  '^aidatamgt\.aihub\.or\.kr',
  '^localhost$',
];

$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/default/theme-dev.services.yml';

$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
$settings['extension_discovery_scan_tests'] = FALSE;

$settings['config_exclude_modules'] = ['devel', 'kint', 'stage_file_proxy'];
$settings['file_private_path'] = '../_private_files';

$schemes['ncp-public'] = [
  'type' => 's3',
  'driver' => 's3',
  'config' => [
    'key'    => getenv('S3_KEY'),
    'secret' => getenv('S3_SECRET'),
    'region' => 'kr-standard',
    'bucket' => getenv('S3_BUCKET'),
    'protocol' => 'https',
    'endpoint' => 'https://kr.object.ncloudstorage.com/',
    'cname' => 'kr.object.ncloudstorage.com/' . getenv('S3_BUCKET'),
    'options' => [
      'ACL' => 'public-read',
      'StorageClass' => 'REDUCED_REDUNDANCY',
    ],
    'public' => TRUE,
  ],
  'cache' => TRUE,
];

$schemes['ncp-private'] = [
  'type' => 's3',
  'driver' => 's3',
  'config' => [
    'key'    => getenv('S3_KEY'),
    'secret' => getenv('S3_SECRET'),
    'region' => 'kr-standard',
    'bucket' => getenv('S3_BUCKET'),
    'protocol' => 'https',
    'endpoint' => 'https://kr.object.ncloudstorage.com/',
    'cname' => 'kr.object.ncloudstorage.com/' . getenv('S3_BUCKET'),
    'options' => [
      'ACL' => 'public-read',
      'StorageClass' => 'REDUCED_REDUNDANCY',
    ],
    'public' => TRUE,
  ],
  'cache' => TRUE,
];

$settings['flysystem'] = $schemes;

$config['system.mail']['interface']['default'] = 'devel_mail_log';

/**
 * HTTP Client config.
 */
$settings['http_client_config']['timeout'] = 6000;
