# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"
  config.vm.network "forwarded_port", guest: 80, host: 8080, id: "apache2"
  config.vm.network "forwarded_port", guest: 3000, host: 3000, id: "browserSync"
  config.vm.network "forwarded_port", guest: 8025, host: 8025, id: "mailhog"
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.synced_folder ".", "/vagrant", type: "nfs"
  config.vbguest.auto_update = false

  config.vm.provider "virtualbox" do |vb|
    vb.name = "baanstudio21"
    vb.cpus = 2
    vb.memory = 1024
    vb.customize ["modifyvm", :id, "--uartmode1", "file", File::NULL]
  end

  config.vm.provision "shell", path: "provision/bootstrap.sh"
  config.vm.provision "shell", path: "provision/mariadb-10.5.sh"
  config.vm.provision "shell", path: "provision/apache2-php7.4.sh"
  config.vm.provision "shell", path: "provision/nvm.sh", privileged: false
  config.vm.provision "shell", path: "provision/check.sh"
end
