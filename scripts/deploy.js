const hre = require("hardhat");

async function main() {
    const [deployer, address1, address2] = await hre.ethers.getSigners();
    // const TAFAcontractAddress = "0x5ae155f89308ca9050f8ce1c96741badd342c26b";
    console.log("Deploying contracts with the account:", deployer.address, address1.address, address2.address);
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