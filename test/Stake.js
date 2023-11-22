const { hre } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Token Contract", function() {
    let owner;
    let alice;
    let bob;
    let res;
    let TAFAToken;
    let stakeContract;

    async function loadContractFixture() {
        [alice, owner, bob] = await hre.ethers.getSigners();
        TAFAToken = await hre.ethers.getContractFactory("TAFA");
        const tafatoken = await TAFAToken.deploy(2000000,"TAFA","TAFA");
        stakeContract = await hre.ethers.getContractFactory("Stake");
        const tafafarm = await stakeContract.deploy(tafatoken.address);
    }

    describe("Transfer tokens ", async function() {
        const { tafatoken, owner } = await loadFixture(loadContractFixture);

        it("transfer total supply to owner address", async function() {
            const ownertokenBlance = await tafatoken.myTokenBalance(owner.address);
            console.log('owner balance', ownertokenBlance);
            expect(await tafatoken.myTokenBalance(owner.address).to.equal(2000000));
        })
    })
})