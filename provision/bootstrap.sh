#!/bin/bash
echo "[os]"
lsb_release -a

echo "[house keeping]"
apt-get -y -qq update && apt-get -y -qq upgrade && apt-get -y -qq autoremove
timedatectl set-timezone Asia/Seoul && date

echo "install rclone"
curl https://rclone.org/install.sh | bash

echo 'eval "$(ssh-agent -s)"' >> /home/vagrant/.profile
echo 'ssh-add ' >> /home/vagrant/.profile
echo "if test -f '/vagrant/.env '; then" >> /home/vagrant/.profile
echo "export $(egrep -v '^#' /vagrant/.env | xargs)" >> /home/vagrant/.profile
echo "fi" >> /home/vagrant/.profile

echo "install mailhog"
curl -LO https://github.com/mailhog/MailHog/releases/download/v1.0.1/MailHog_linux_amd64
sudo mv MailHog_linux_amd64 /usr/local/bin/mailhog
sudo chmod +x /usr/local/bin/mailhog
sudo tee /etc/systemd/system/mailhog.service <<EOL
[Unit]
Description=Mailhog
After=network.target
[Service]
User=vagrant
ExecStart=/usr/bin/env /usr/local/bin/mailhog > /dev/null 2>&1 &
[Install]
WantedBy=multi-user.target
EOL
sudo systemctl daemon-reload
sudo systemctl enable mailhog && sudo systemctl start mailhog
