import { ethers } from "hardhat";
import abi from "../artifacts/contracts/ContractWinner.sol/ContractWinner.json";

async function main() {
  const ContractWinner = await ethers.getContractFactory("ContractWinner");
  const contractWinner = await ContractWinner.deploy();

  await contractWinner.deployed();

  console.log(`ContractWinner deployed to ${contractWinner.address}`);
  const contractTargetAddress = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";
  const contractABI = abi.abi;

  // Get the node connection and wallet connection.
  const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    process.env.GOERLI_API_KEY
  );

  // Ensure that signer is the SAME address as the original contract deployer,
  // or else this script will fail with an error.
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider);

  // Instantiate connected contract.
  const contract = new ethers.Contract(
    contractWinner.address,
    contractABI,
    signer
  );

  const callAttemptTrx = await contract.callAttempt(contractTargetAddress);

  await callAttemptTrx.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
