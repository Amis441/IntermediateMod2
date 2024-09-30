import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ticketBooking_abi from "../artifacts/contracts/Assessment.sol/TicketBooking.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [ticketBooking, setTicketBooking] = useState(undefined);
  const [tickets, setTickets] = useState([]);
  const [ticketId, setTicketId] = useState("");
  const [eventName, setEventName] = useState("");
  const [seatNumber, setSeatNumber] = useState(0);
  const [newOwner, setNewOwner] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update with your contract address
  const ticketBookingABI = ticketBooking_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      setAccount(account[0]);
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getTicketBookingContract();
  };

  const getTicketBookingContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const ticketBookingContract = new ethers.Contract(contractAddress, ticketBookingABI, signer);
    setTicketBooking(ticketBookingContract);
  };

  const getAllTickets = async () => {
    if (ticketBooking) {
      const allTickets = await ticketBooking.getAllTickets();
      const formattedTickets = allTickets.map(ticket => ({
        id: ticket.id.toString(),
        owner: ticket.owner,
        eventName: ticket.eventName,
        seatNumber: ticket.seatNumber.toString() // Convert BigNumber to string
      }));
      setTickets(formattedTickets);
    }
  };

  const bookTicket = async () => {
    if (ticketBooking && ticketId && eventName && seatNumber > 0) {
      await ticketBooking.bookTicket(ticketId, eventName, seatNumber);
      getAllTickets(); // Refresh the ticket list
    }
  };

  const cancelTicket = async () => {
    if (ticketBooking && ticketId) {
      await ticketBooking.cancelTicket(ticketId);
      getAllTickets();
    }
  };

  const updateTicket = async () => {
    if (ticketBooking && ticketId && seatNumber > 0) {
      await ticketBooking.updateTicket(ticketId, seatNumber);
      getAllTickets();
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask in order to use this Ticket Booking System.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your MetaMask wallet</button>;
    }

    return (
      <>
        <div>
          <h2>Connected Account: {account}</h2>
          <button onClick={getAllTickets}>Get All Tickets</button>

          <div>
            <h3>Book or Update Ticket</h3>
            <input
              type="number"
              placeholder="Ticket ID"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Seat Number"
              value={seatNumber}
              onChange={(e) => setSeatNumber(Number(e.target.value))}
            />
            <button onClick={bookTicket}>Book Ticket</button>
            <button onClick={updateTicket}>Update Seat Number</button>
            <button onClick={cancelTicket}>Cancel Ticket</button>
          </div>

          <h3>All Tickets:</h3>
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Owner</th>
                <th>Event Name</th>
                <th>Seat Number</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr key={index}>
                  <td>{ticket.id}</td>
                  <td>{ticket.owner}</td>
                  <td>{ticket.eventName}</td>
                  <td>{ticket.seatNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return <main>{initUser()}</main>;
}
