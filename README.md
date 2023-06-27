# Roulette game on-chain

LearnWeb3 Bounty: QRNG Roulette Wheel Bounty Challenge

![Image](https://i.imgur.com/FRowwkZ.png)

## API3 Quantum Roulette Bounty Challenge

### The Challenge:

Your mission, should you choose to accept it, is to follow a step-by-step tutorial to code a Solidity-based roulette game that uses API3's Quantum Random Number Generator (QRNG) to ensure true randomness. You will be using Remix IDE to code and deploy your contract.

### Project Features:

Your roulette game should support the following betting options:

1. Users can bet on either the first, second or third dozen of the numbers on the board.

2. Users can bet on either the first or second half of the numbers on the board.

3. Users can bet on either the set of all even or odd numbers on the board.

4. Users can bet on all red or black numbers on the board.

5. Users can choose any one specific number on the board.

The winning condition is met if the QRNG-generated number lands on a user's selected number(s).

### Tutorial to follow step-by-step:

Check out our comprehensive guide - [Tutorial](https://docs.api3.org/guides/qrng/roulette-guide/)

## My improvements

- Created in the contract a modifier called "checkBetConditions" with some checks repeating several times.

- Created the "sendUnsuccessfullBet", "sendSuccessfullBet" and "returnBet" functions in the contract to isolate bid submissions in case of success and loss.

- Created a frontend with NextJS with custom graphics.

- Made visible on the frontend the possible winnings based on the choice made by the user.

- Made visible on the frontend the contract balance, so as to also block the possibility of placing a bet if the possible winnings are greater than the contract balance.

## Instructions

The code works on Mumbai network. If you want to change network, update the file `hardhat.config.js` and `.env` file.

```batch
# Install packages
npm install

# Copy .env file
cp .env.example .env

# Compile .env file with PRIVATE_KEY, URL_PROVIDER, CHAIN_ID, IS_TESTNET

# Deploy contract
npx hardhat run scripts/deploy.js --network mumbai

# Get the Roulette contract and insert it inside .env file

# Setup contract
npx hardhat run scripts/setup.js

# Get the sponsor wallet address and send some MATIC on the contract
# You can send MATIC to the contract directly or with the topUpSponsorWallet function inside the contract deployed

# Into frontend folder, duplicate .env.example in .env file, insert roulette contract address, network name and id
cp .env.example .env

# Launch site in local
npm run dev

```
