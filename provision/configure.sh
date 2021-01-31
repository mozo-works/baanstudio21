#!/bin/bash

echo [bootstrap] set ssh key permission
chmod -R 400 ~/.ssh/id_rsa ~/.ssh/*.pem

echo [composer] install global packages
export PATH=$PATH:$HOME/.config/composer/vendor/bin/
'export PATH=$PATH:$HOME/.config/composer/vendor/bin/' >> ~/.profile
composer global require drupal/coder dealerdirect/phpcodesniffer-composer-installer squizlabs/php_codesniffer

echo [drupal] copy settings files
cd /vagrant && composer install -o
cp -r /vagrant/provision/config/settings* /vagrant/web/sites/default/
cp -r /vagrant/provision/config/theme-dev.services.yml /vagrant/web/sites/default/
chmod u+w /vagrant/web/sites/default
mkdir -p /vagrant/web/sites/default/files && chmod -R 777 /vagrant/web/sites/default/files
