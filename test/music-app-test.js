const { ethers } = require("hardhat");
const expect = require("chai").expect;

describe("Music App", async function () {
  it("Should Upload Song", async function () {
    const contractFactory = await ethers.getContractFactory("MusicApp");
    const contractDeploy = await contractFactory.deploy("Musicen");

    await contractDeploy.deployed();

    await contractDeploy.uploadSong(
      "Lose Yourself Image",
      "Lose Yourself",
      "Lose Yourself",
      "Hip Hop",
      "2002"
    );

    let songId = await contractDeploy.getSong(1);

    expect(songId[1]).to.equal("Lose Yourself Image");
  });

  it("Should Update Song", async function () {
    const contractFactory = await ethers.getContractFactory("MusicApp");
    const contractDeploy = await contractFactory.deploy("Musicen");

    await contractDeploy.deployed();

    await contractDeploy.uploadSong(
      "Image",
      "Lose Yourself",
      "Lose Yourself",
      "Hip Hop",
      "2002"
    );

    let songId = await contractDeploy.getSong(1);

    expect(songId[1]).to.equal("Image");

    await contractDeploy.updateSong(
      1,
      "Lose Yourself Image",
      "Lose Yourself Update",
      "Lose Yourself Update",
      "Hip Hop",
      "2002"
    );

    expect(songId[1]).to.equal("Image");
  });
});
