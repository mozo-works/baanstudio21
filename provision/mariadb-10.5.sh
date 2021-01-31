#!/bin/bash

echo "[mariadb] add 10.5 repository"
apt-key adv --fetch-keys 'https://mariadb.org/mariadb_release_signing_key.asc'
add-apt-repository 'deb [arch=amd64,arm64,ppc64el] https://ftp.harukasan.org/mariadb/repo/10.5/ubuntu focal main'

echo "[mariadb] install 10.5"
export DEBIAN_FRONTEND=noninteractive
echo "mariadb-server-10.5 mysql-server/root_password password root" | debconf-set-selections
echo "mariadb-server-10.5 mysql-server/root_password_again password root" | debconf-set-selections
apt-get install -y -qq mariadb-server

echo "[mariadb] create user and database"
mysql --password=root -e "CREATE DATABASE baanstudio21 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql --password=root -e "GRANT ALL ON baanstudio21.* TO vagrant@localhost IDENTIFIED BY 'vagrant'; FLUSH PRIVILEGES;"

cp /vagrant/provision/config/my.cnf /home/vagrant/.my.cnf
chown vagrant:vagrant /home/vagrant/.my.cnf

FILE=/vagrant/dump/baanstudio21-dev.sql.gz
if [ -f "$FILE" ]; then
    echo "[mariadb] $FILE exists and restoring baanstudio21 database..."
    gunzip -c $FILE | mysql baanstudio21
else
    echo "[mariadb] $FILE does not exist. Install drupal by yourself."
fi
