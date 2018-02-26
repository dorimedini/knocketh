pragma solidity ^0.4.11;

contract SecondPriceAuction {
    address private owner;
    uint private limit_seconds = 60*60;
    uint public deadline;
    uint public minimum_start_bid = 100 finney;
    address public winner;
    address public runner_up;

    // bids[0] == wining bid
    // bids[1] == runner-up bid
    uint[2] public bids;

    // C'tor, D'tor
    function SecondPriceAuction(uint min_bid, uint time_limit) public {
        owner = msg.sender;
        if (time_limit > 0) limit_seconds = time_limit;
        if (min_bid > 0) minimum_start_bid = min_bid;
        deadline = limit_seconds + now;
    }
    function kill() public {
        require(msg.sender == owner);
        selfdestruct(owner);
    }

    // Getter
    // If this returns 0, you're not in the game!
    function my_bid() public view returns(uint) {
        if (msg.sender == winner)
            return bids[0];
        else if (msg.sender == runner_up)
            return bids[1];
        else
            return 0;
    }

    // Make an offer. Succeeds if this meets the minimum and the winning
    // player's bid.
    function offer() public payable {
        // Can't bet twice in a row!
        require(msg.sender != winner);
        // Must be higher than the current winning bid, or the minimum if this
        // is the first player
        if (winner != 0)
            require(msg.value > bids[0]);
        else
            require(msg.value >= minimum_start_bid);
        // Refund the old runner-up, update the values
        uint old_runner_up_bid = bids[1];
        address old_runner_up = runner_up;
        runner_up = winner;
        winner = msg.sender;
        bids[1] = bids[0];
        bids[0] = msg.value;
        if (old_runner_up != 0)
            old_runner_up.transfer(old_runner_up_bid);
    }

    // When done, pay the winner the runner-up's money (after refunding the
    // winner as well)
    function end_game() public {
        require(msg.sender == owner);
        require(winner != 0);
        uint winnings = bids[0] + bids[1];
        address tmp_winner_address = winner;
        bids[0] = 0;
        bids[1] = 0;
        winner = 0;
        runner_up = 0;
        tmp_winner_address.transfer(winnings);
    }
}
