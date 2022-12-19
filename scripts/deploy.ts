import { ethers } from "hardhat";

async function main() {
  const ContractWinner = await ethers.getContractFactory("ContractWinner");
  const contractWinner = await ContractWinner.deploy();

  await contractWinner.deployed();

  console.log(`ContractWinner deployed to ${contractWinner.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
