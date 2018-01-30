# knocketh

Env setup:

    cd ~
    curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo apt-get install build-essential python
    mkdir node_modules
    sudo npm i -g npm@4.0.0
    sudo npm install ganache-cli web3@0.20.2 solc

Note that `sudo npm install web3@0.20.2` may fail - if so, make sure the `npm` version is < 5.x.x (run `npm -v`). If this was the case, check if the repo exists under `node_modules/web3/` - if so, do:

    cd ~/knocketh/node_modules/web3
    npm install
