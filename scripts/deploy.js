// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const airnodeProtocol = require('@api3/airnode-protocol');

async function main() {
  // We are getting the AirnodeRrp address from @api3/airnode-protocol
  // Alternatively, you can get it from the docs
  // https://docs.api3.org/airnode/latest/reference/airnode-addresses.html
  const airnodeRrpAddress = airnodeProtocol.AirnodeRrpAddresses[process.env.CHAIN_ID];

  const roulette = await hre.ethers.deployContract("Roulette", [airnodeRrpAddress]);

  await roulette.waitForDeployment();

  console.log(
    `Roulette deployed to ${roulette.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
