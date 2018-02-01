  
Knocketh
 
Env setup:
 
   cd ~
   curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo apt-get install build-essential python
   sudo apt-get install software-properties-common
   sudo add-apt-repository -y ppa:ethereum/ethereum
   sudo apt-get update
   sudo apt-get install ethereum
   # Uncomment this maybe
   #geth --testnet --syncmode "fast" --rpc --rpcapi db,eth,net,web3,personal --cache=1024  --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --bootnodes "enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303,enode://6ce05930c72abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303"
    mkdir node_modules
    sudo npm i -g npm@4.0.0
    sudo npm install ganache-cli web3@0.20.2 solc
    sudo npm install -g mocha
  
Note that `sudo npm install web3@0.20.2` may fail - if so, make sure the `npm` version is < 5.x.x (run `npm -v`). If this was the case, check if the repo exists under `node_modules/web3/` - if so, do:

    cd ~/knocketh/node_modules/web3
    npm install

On Windows, this is the recommended setup:

1. Install `npm` and `node` (there are windows installers). Make sure both are in the system path.
2. `cd <WORKSPACE>/knocketh`
3. `npm init -y`
4. `npm i -D truffle`
5. Add `truffle` to the system path
6. `truffle init`
7. `npm i -D webpack react react-dom babel-core babel-loader babel-preset-react babel-preset-es2015 babel-preset-stage-2 css-loader style-loader json-loader web3@^0.20.0`
8. npm i -g http-server

To edit contracts and test them, go to https://remix.ethereum.org
