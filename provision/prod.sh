#!/bin/bash

echo "[os]"
lsb_release -a

echo "[house keeping]"
apt-get -y -qq update && apt-get -y -qq upgrade && apt-get -y -qq autoremove
timedatectl set-timezone Asia/Seoul && date

echo "install rclone"
curl https://rclone.org/install.sh | bash

echo "[mariadb] add 10.5 repository"
apt-key adv --fetch-keys 'https://mariadb.org/mariadb_release_signing_key.asc'
add-apt-repository 'deb [arch=amd64,arm64,ppc64el] https://ftp.harukasan.org/mariadb/repo/10.5/ubuntu bionic main'

echo "[mariadb] install 10.5"
export DEBIAN_FRONTEND=noninteractive
if [ ! -z "$MYSQL_ROOT_PASSWORD" ]; then
  echo "mariadb-server-10.5 mysql-server/root_password password $MYSQL_ROOT_PASSWORD" | debconf-set-selections
  echo "mariadb-server-10.5 mysql-server/root_password_again password $MYSQL_ROOT_PASSWORD" | debconf-set-selections
  apt-get install -y -qq mariadb-server
  if [ ! -z "$MYSQL_USER_PASSWORD" ]; then
    echo "[mariadb] create user and database"
    mysql --password=$MYSQL_ROOT_PASSWORD -e "CREATE DATABASE aihub_manager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    mysql --password=$MYSQL_ROOT_PASSWORD -e "GRANT ALL ON aihub_manager.* TO aihubdev@localhost IDENTIFIED BY '"$MYSQL_USER_PASSWORD"'; FLUSH PRIVILEGES;"
    MYCNF = $PROJECT_ROOT/provision/prod/my.cnf
    if [ -f "$MYCNF" ]; then
      cp $MYCNF /home/aihubdev/.my.cnf && chown aihubdev:aihubdev /home/aihubdev/.my.cnf
    fi
  fi
else
  echo "[mariadb] No credential found. You have to install mariadb 10.5 by yourself."
fi

FILE=$PROJECT_ROOT/data/aihub_manager-dev.sql.gz
if [ -f "$FILE" ]; then
    echo "[mariadb] $FILE exists and restoring aihub_manager database..."
    gunzip -c $FILE | mysql aihub_manager
else
    echo "[mariadb] $FILE does not exist. Install drupal by yourself."
fi

echo "Install apache2, php 7.4"
echo "" | add-apt-repository ppa:ondrej/php
apt-get install -y -qq zip unzip apache2 php7.4-{apcu,cli,gd,xml,curl,mbstring,zip,opcache,mysql,fpm}
a2enmod rewrite proxy_fcgi && a2enconf php7.4-fpm

cp $PROJECT_ROOT/provision/prod/php-prod.ini /etc/php/7.4/php.ini
cp $PROJECT_ROOT/provision/prod/php-prod.ini /etc/php/7.4/cli/conf.d/
echo 'php_admin_value[error_log] = '"$PROJECT_ROOT"'/data/fpm-php.www.log' >> /etc/php/7.4/fpm/pool.d/www.conf

cp $PROJECT_ROOT/provision/prod/aihub-manager.conf /etc/apache2/sites-available/
a2dissite 000-default && a2ensite aihub-manager && service apache2 reload

echo "[php] install composer"
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

echo "[php] install drush launcher"
wget -O drush.phar https://github.com/drush-ops/drush-launcher/releases/latest/download/drush.phar
chmod +x drush.phar && mv drush.phar /usr/local/bin/drush
chown -R aihubdev:aihubdev /usr/local/bin

echo "[php] composer install"
su - aihubdev -c "cd $PROJECT_ROOT && composer install"

echo "[drupal] copy settings files"
su - aihubdev -c "yes | cp -rf $PROJECT_ROOT/provision/prod/settings* $PROJECT_ROOT/web/sites/default/"
