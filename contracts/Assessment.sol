// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TicketBooking {
    address public owner;

    struct Ticket {
        uint256 id;
        address owner;
        string eventName;
        uint256 seatNumber;
    }

    Ticket[] public tickets;
    mapping(uint256 => Ticket) public ticketIdToTicket;

    event TicketBooked(uint256 ticketId, address owner, string eventName, uint256 seatNumber);
    event TicketCancelled(uint256 ticketId);
    event TicketUpdated(uint256 ticketId, uint256 newSeatNumber);
    

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    modifier ticketExists(uint256 _ticketId) {
        require(ticketIdToTicket[_ticketId].owner != address(0), "Ticket does not exist");
        _;
    }

    modifier onlyTicketOwner(uint256 _ticketId) {
        require(ticketIdToTicket[_ticketId].owner == msg.sender, "You do not own this ticket");
        _;
    }

    // Book a new ticket
    function bookTicket(uint256 _ticketId, string memory _eventName, uint256 _seatNumber) public {
        require(ticketIdToTicket[_ticketId].owner == address(0), "Ticket already booked");
        Ticket memory newTicket = Ticket({
            id: _ticketId,
            owner: msg.sender,
            eventName: _eventName,
            seatNumber: _seatNumber
        });

        tickets.push(newTicket);
        ticketIdToTicket[_ticketId] = newTicket;

        emit TicketBooked(_ticketId, msg.sender, _eventName, _seatNumber);
    }

    // Cancel a ticket
    function cancelTicket(uint256 _ticketId) public onlyTicketOwner(_ticketId) {
        delete ticketIdToTicket[_ticketId];

        for (uint256 i = 0; i < tickets.length; i++) {
            if (tickets[i].id == _ticketId) {
                // Shift the remaining tickets to fill the gap
                for (uint256 j = i; j < tickets.length - 1; j++) {
                    tickets[j] = tickets[j + 1];
                }
                tickets.pop();
                break;
            }
        }

        emit TicketCancelled(_ticketId);
    }

    // Update the seat number of a ticket
    function updateTicket(uint256 _ticketId, uint256 _newSeatNumber) public onlyTicketOwner(_ticketId) {
        Ticket storage ticket = ticketIdToTicket[_ticketId];
        ticket.seatNumber = _newSeatNumber;

        // Also update the array
        for (uint256 i = 0; i < tickets.length; i++) {
            if (tickets[i].id == _ticketId) {
                tickets[i].seatNumber = _newSeatNumber;
                break;
            }
        }

        emit TicketUpdated(_ticketId, _newSeatNumber);
    }

    // View all tickets
    function getAllTickets() public view returns (Ticket[] memory) {
        return tickets;
    }

    // View a specific ticket by ID
    function getTicket(uint256 _ticketId) public view ticketExists(_ticketId) returns (Ticket memory) {
        return ticketIdToTicket[_ticketId];
    }
}
