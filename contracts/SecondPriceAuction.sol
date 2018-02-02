pragma solidity ^0.4.11;

contract SecondPriceAuction {
    address private owner;
    uint public minimum_start_bid = 100 finney;
    address private winner;
    address private runner_up;
    uint public winner_bid;
    uint private runner_up_bid;

    // Events for debug mode
    event GotOffer(uint value);

    // C'tor, D'tor
    function SecondPriceAuction(uint min_bid) public {
        owner = msg.sender;
        if (min_bid > 0) minimum_start_bid = min_bid;
    }
    function kill() public {
        require(msg.sender == owner);
        selfdestruct(owner);
    }
    
    // Make an offer. Succeeds if this meets the minimum and the winning 
    // player's bid.
    function offer() public payable {
        // Can't bet twice in a row!
        require(msg.sender != winner);
        // Must be higher than the current winning bid, or the minimum if this
        // is the first player
        if (winner != 0)
            require(msg.value > winner_bid);
        else
            require(msg.value >= minimum_start_bid);
        // Refund the old runner-up, update the values
        uint old_runner_up_bid = runner_up_bid;
        runner_up = winner;
        winner = msg.sender;
        runner_up_bid = winner_bid;
        winner_bid = msg.value;
        runner_up.transfer(old_runner_up_bid);
    }

    // When done, pay the winner the runner-up's money and return everyone 
    // else's.
    function end_game() public {
        require(msg.sender == owner);
        winner.transfer(winner_bid + runner_up_bid);
        kill();
    }
}