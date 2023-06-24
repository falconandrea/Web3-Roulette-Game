const hre = require('hardhat')
const airnodeAdmin = require('@api3/airnode-admin')
const { getApi } = require('./apis')

async function main() {
  const apiData = getApi(hre.network)
  const account = (await hre.ethers.getSigners())[0]
  const ContractFile = require("../artifacts/contracts/Roulette.sol/Roulette.json")
  const roulette = new hre.ethers.Contract(process.env.ROULETTE_ADDRESS, ContractFile.abi, account)

  const sponsorWalletAddress = await airnodeAdmin.deriveSponsorWalletAddress(
    apiData.xpub,
    apiData.airnode,
    roulette.target
  );

  console.log(`Sponsor wallet address: ${sponsorWalletAddress}`)

  const receipt = await roulette.setRequestParameters(
    apiData.airnode,
    apiData.endpointIdUint256,
    sponsorWalletAddress
  );
  console.log('Setting request parameters...');
  await new Promise((resolve) =>
    hre.ethers.provider.once(receipt.hash, () => {
      resolve();
    })
  );
  console.log('Request parameters set');
}


main().catch((error) => {
  console.error(error)
  process.exitCode = 1
});
