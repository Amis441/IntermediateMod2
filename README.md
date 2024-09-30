## Ticket Booking DApp

This repository contains a decentralized ticket booking system built with Solidity and a React frontend. Users can book tickets for events, update seat numbers, and cancel their bookings via an Ethereum smart contract.

### Features

- **Book Ticket:** Users can book a ticket for an event by specifying the ticket ID, event name, and seat number.
- **Cancel Ticket:** Users can cancel a ticket they have previously booked.
- **Update Ticket:** Users can update the seat number of a booked ticket.
- **View All Tickets:** Displays a list of all booked tickets, including ticket ID, owner, event name, and seat number.

### Smart Contract (Solidity)

The Solidity smart contract (`TicketBooking.sol`) manages ticket booking and cancellation. The contract has the following main features:

- `bookTicket`: Books a new ticket if the ID is not already taken.
- `cancelTicket`: Cancels a ticket owned by the caller and removes it from the list.
- `updateTicket`: Updates the seat number of an existing ticket.
- `getAllTickets`: Retrieves all tickets booked on the platform.

### Frontend (React)

The React frontend interacts with the smart contract via MetaMask and allows users to book, cancel, and update tickets. The app also displays a table of all currently booked tickets.

#### Key React Components:

- **`Index`**: The main component that allows users to interact with the smart contract.

### Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Amis441/IntermediateMod2.git
   cd ticket-booking-dapp
   ```

2. **Install dependencies:**

   Navigate to the React frontend directory and install the necessary dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. **Set up the smart contract:**

   - The smart contract (`TicketBooking.sol`) is written in Solidity and compiled using Hardhat or a similar tool.
   - Deploy the smart contract to an Ethereum-compatible network .
   - Update the contract address in the `index.js` file:

4. **Run the React app:**

   Start the React development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

### Interacting with the DApp

- **Connect MetaMask**: Ensure you have MetaMask installed and connected to the correct network. Click "Connect Wallet" to link your MetaMask account to the app.
- **Book a Ticket**: Enter a ticket ID, event name, and seat number, then click "Book Ticket".
- **Update Seat Number**: To update a seat number for an existing ticket, enter the ticket ID and new seat number, then click "Update Seat Number".
- **Cancel a Ticket**: Enter the ticket ID and click "Cancel Ticket" to remove it from the list.
- **View All Tickets**: Click "Get All Tickets" to retrieve and display all booked tickets.

### Smart Contract Deployment

If you need to deploy the smart contract using Hardhat, follow these steps:

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Compile and deploy the contract**:

   Update `hardhat.config.js` to point to your network. Then compile and deploy the contract using:

   ```bash
   npx hardhat node
   npx hardhat run --network localhost scripts/deploy.js
   ```
