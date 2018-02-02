import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import './../css/index.css'
class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            lastWinner: 0,
            numberOfBets: 0,
            minimumBet: 0,
            totalBet: 0,
            maxAmountOfBets: 0,
        }
        if(typeof web3 != 'undefined'){
            console.log("Using web3 detected from external source like Metamask")
            this.web3 = new Web3(web3.currentProvider)
        }else{
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        }
        const MyContract = web3.eth.contract(
            [
                {
                        "constant": true,
                        "inputs": [],
                        "name": "player1_last_bet",
                        "outputs": [
                                {
                                        "name": "",
                                        "type": "uint256"
                                }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "constant": true,
                        "inputs": [],
                        "name": "player2_last_bet",
                        "outputs": [
                                {
                                        "name": "",
                                        "type": "uint256"
                                }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "name": "min_bet",
                                        "type": "uint256"
                                }
                        ],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "constructor"
                },
                {
                        "anonymous": false,
                        "inputs": [
                                {
                                        "indexed": false,
                                        "name": "value",
                                        "type": "uint256"
                                }
                        ],
                        "name": "DidntReachMin",
                        "type": "event"
                },
                {
                        "anonymous": false,
                        "inputs": [
                                {
                                        "indexed": false,
                                        "name": "value",
                                        "type": "uint256"
                                }
                        ],
                        "name": "PrevBet",
                        "type": "event"
                },
                {
                        "constant": false,
                        "inputs": [],
                        "name": "start",
                        "outputs": [],
                        "payable": true,
                        "stateMutability": "payable",
                        "type": "function"
                },
                {
                        "constant": false,
                        "inputs": [],
                        "name": "join",
                        "outputs": [],
                        "payable": true,
                        "stateMutability": "payable",
                        "type": "function"
                },
                {
                        "anonymous": false,
                        "inputs": [
                                {
                                        "indexed": false,
                                        "name": "value",
                                        "type": "uint256"
                                }
                        ],
                        "name": "GotBet",
                        "type": "event"
                },
                {
                        "anonymous": false,
                        "inputs": [
                                {
                                        "indexed": false,
                                        "name": "value",
                                        "type": "uint256"
                                }
                        ],
                        "name": "GotInputMin",
                        "type": "event"
                },
                {
                        "anonymous": false,
                        "inputs": [
                                {
                                        "indexed": false,
                                        "name": "value",
                                        "type": "uint256"
                                }
                        ],
                        "name": "JoinedWith",
                        "type": "event"
                },
                {
                        "anonymous": false,
                        "inputs": [
                                {
                                        "indexed": false,
                                        "name": "value",
                                        "type": "uint256"
                                }
                        ],
                        "name": "PlacedBet",
                        "type": "event"
                },
                {
                        "constant": false,
                        "inputs": [],
                        "name": "bet",
                        "outputs": [],
                        "payable": true,
                        "stateMutability": "payable",
                        "type": "function"
                },
                {
                        "anonymous": false,
                        "inputs": [
                                {
                                        "indexed": false,
                                        "name": "value",
                                        "type": "uint256"
                                }
                        ],
                        "name": "ReachedMin",
                        "type": "event"
                },
                {
                        "constant": false,
                        "inputs": [],
                        "name": "kill",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "anonymous": false,
                        "inputs": [
                                {
                                        "indexed": false,
                                        "name": "value",
                                        "type": "uint256"
                                }
                        ],
                        "name": "SetMin",
                        "type": "event"
                },
                {
                        "anonymous": false,
                        "inputs": [
                                {
                                        "indexed": false,
                                        "name": "value",
                                        "type": "uint256"
                                }
                        ],
                        "name": "StartedWith",
                        "type": "event"
                }
            ]
        )
        this.state.ContractInstance = MyContract.at("0xd08057bb8f568869b1268a2b15e7f00305c16eeb")
    }
    voteNumber(number){
        console.log(number)
    }
    render(){
        return (
            <div className="main-container">
                <h1>Bet for your best number and win huge amounts of Ether</h1>
                <div className="block">
                   <h4>Timer:</h4> &nbsp;
                   <span ref="timer"> {this.state.timer}</span>
                </div>
                <div className="block">
                   <h4>Last winner:</h4> &nbsp;
                   <span ref="last-winner">{this.state.lastWinner}</span>
                </div>
                <hr/>
                <h2>Vote for the next number</h2>
                <ul>
                   <li onClick={() => {this.voteNumber(1)}}>1</li>
                   <li onClick={() => {this.voteNumber(2)}}>2</li>
                   <li onClick={() => {this.voteNumber(3)}}>3</li>
                   <li onClick={() => {this.voteNumber(4)}}>4</li>
                   <li onClick={() => {this.voteNumber(5)}}>5</li>
                   <li onClick={() => {this.voteNumber(6)}}>6</li>
                   <li onClick={() => {this.voteNumber(7)}}>7</li>
                   <li onClick={() => {this.voteNumber(8)}}>8</li>
                   <li onClick={() => {this.voteNumber(9)}}>9</li>
                   <li onClick={() => {this.voteNumber(10)}}>10</li>
                </ul>
            </div>
        )
    }
}
ReactDOM.render(
   <App />,
   document.querySelector('#root')
)