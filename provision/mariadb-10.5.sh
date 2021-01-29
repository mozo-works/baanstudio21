#!/bin/bash

echo "[mariadb] add 10.5 repository"
apt-key adv --fetch-keys 'https://mariadb.org/mariadb_release_signing_key.asc'
add-apt-repository 'deb [arch=amd64,arm64,ppc64el] https://ftp.harukasan.org/mariadb/repo/10.5/ubuntu bionic main'

echo "[mariadb] install 10.5"
export DEBIAN_FRONTEND=noninteractive
echo "mariadb-server-10.5 mysql-server/root_password password root" | debconf-set-selections
echo "mariadb-server-10.5 mysql-server/root_password_again password root" | debconf-set-selections
apt-get install -y -qq mariadb-server

echo "[mariadb] create user and database"
mysql --password=root -e "CREATE DATABASE aihub_manager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql --password=root -e "GRANT ALL ON aihub_manager.* TO vagrant@localhost IDENTIFIED BY 'vagrant'; FLUSH PRIVILEGES;"

cp /vagrant/provision/config/my.cnf /home/vagrant/.my.cnf
chown vagrant:vagrant /home/vagrant/.my.cnf

FILE=/vagrant/dump/aihub_manager-dev.sql.gz
if [ -f "$FILE" ]; then
    echo "[mariadb] $FILE exists and restoring aihub_manager database..."
    gunzip -c $FILE | mysql aihub_manager
else
    echo "[mariadb] $FILE does not exist. Install drupal by yourself."
fi
