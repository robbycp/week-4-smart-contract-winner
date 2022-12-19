import { ethers } from "hardhat";
import abi from "../artifacts/contracts/ContractWinner.sol/ContractWinner.json";

async function main() {
  // last deployed contract 0x63D7F3dB75E4131be84863703A44F5B3016AEd45
  const contractAddress = "0x63D7F3dB75E4131be84863703A44F5B3016AEd45";
  const contractTargetAddress = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";
  const contractABI = abi.abi;

  // Get the node connection and wallet connection.
  const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    process.env.ALCHEMY_API_KEY
  );

  // Ensure that signer is the SAME address as the original contract deployer,
  // or else this script will fail with an error.
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider);

  // Instantiate connected contract.
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const callAttemptTrx = await contract.callAttempt(contractTargetAddress);

  await callAttemptTrx.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
