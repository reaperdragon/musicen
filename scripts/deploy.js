const { ethers } = require("hardhat");

async function main() {
  const contractFactory = await ethers.getContractFactory("MusicApp");
  const contractDeploy = await contractFactory.deploy("Musicen");

  await contractDeploy.deployed();

  console.log(`Contract Deployed at: ${contractDeploy.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
