// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const { ethers } = require("hardhat");
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = hre.ethers.parseEther("0.001");

//   const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   await lock.waitForDeployment();

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// const { deployContract } = require("@nomicfoundation/hardhat-ethers/types");
const hre = require("hardhat");

async function main() {
    const [deployer, address1, address2] = await hre.ethers.getSigners();
    // const TAFAcontractAddress = "0x5ae155f89308ca9050f8ce1c96741badd342c26b";
    console.log("Deploying contracts with the account:", deployer.address, address1, address2);
    // console.log("Account balance:", (await deployer.getBalance()).toString());
    console.log("Account balance:", await deployer.provider.getBalance(deployer.address))
    const TAFA = await hre.ethers.getContractFactory("TAFA");
    const tafa = await TAFA.deploy(7000000000,"TAFA","TAFA");
    console.log('get cotract address 2',tafa.address)
    const Stake = await hre.ethers.getContractFactory("Stake");
    const stake = await Stake.deploy(tafa.address);
    console.log('Stake Contract Address',stake.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });