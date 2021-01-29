#!/bin/bash

echo "Install apache2, php 7.4"
echo "" | add-apt-repository ppa:ondrej/php
apt-get install -y -qq zip unzip apache2 php7.4-{apcu,cli,gd,xml,curl,mbstring,zip,opcache,mysql,fpm}
a2enmod rewrite proxy_fcgi && a2enconf php7.4-fpm

cp /vagrant/provision/config/php-dev.ini /etc/php/7.4/cli/conf.d/
cp /vagrant/provision/config/php-dev.ini /etc/php/7.4/fpm/conf.d/
echo 'php_admin_value[error_log] = /vagrant/fpm-php.www.log' >> /etc/php/7.4/fpm/pool.d/www.conf

cp /vagrant/provision/config/vagrant.conf /etc/apache2/sites-available/
a2dissite 000-default && a2ensite vagrant && service apache2 reload

echo "[php] install composer"
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
export PATH=$PATH:/home/vagrant/.config/composer/vendor/bin/
composer global require drupal/coder dealerdirect/phpcodesniffer-composer-installer squizlabs/php_codesniffer

echo "[php] install drush launcher"
wget -O drush.phar https://github.com/drush-ops/drush-launcher/releases/latest/download/drush.phar
chmod +x drush.phar && mv drush.phar /usr/local/bin/drush
chown -R vagrant:vagrant /usr/local/bin

echo "[drupal] copy settings files"
cd /vagrant && composer install && composer update
cp -r /vagrant/provision/config/settings* /vagrant/web/sites/default/
cp -r /vagrant/provision/config/development.services.yml /vagrant/web/sites/default/local.services.yml
