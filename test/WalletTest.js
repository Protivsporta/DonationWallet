const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Wallet", function () {
  let owner
  let sid
  let nancy
  let Wallet

  beforeEach(async function(){
    [owner, sid, nancy] = await ethers.getSigners()
    const Wallet = await ethers.getContractFactory("Wallet", owner)
    wallet = await Wallet.deploy()
    await wallet.deployed()
  })

  it("Should be deployed", async function(){
    expect(wallet.address).to.be.properAddress
  })

  it("Should donate 50 Wei to contract", async function(){
    const tx = await wallet.connect(sid).donate({value: 50})
    await expect(() => tx).to.changeEtherBalances([sid, wallet], [-50, 50])
    await tx.wait()

    expect(await wallet.getDonatorsList()).to.eql([sid.address, ])
    expect(await wallet.getDonationSumByUser(sid.address)).to.eq(50)
  })

  it("Should donate to contract 50 and 100 Wei from one account", async function(){
    await (await wallet.connect(sid).donate({value: 50})).wait()
    await (await wallet.connect(sid).donate({value: 100})).wait()
    
    expect(await wallet.getDonatorsList()).to.eql([sid.address, ])
    expect(await wallet.getDonationSumByUser(sid.address)).to.eq(150)
  })  

  it("Should donate to contract 50 and 100 Wei from different accounts", async function(){
    await (await wallet.connect(sid).donate({value: 50})).wait()
    await (await wallet.connect(nancy).donate({value: 100})).wait()
    
    expect(await wallet.getDonatorsList()).to.eql([sid.address, nancy.address])
    expect(await wallet.getDonationSumByUser(sid.address)).to.eq(50)
    expect(await wallet.getDonationSumByUser(nancy.address)).to.eq(100)
  })

  it("Should donate to contract 300 Wei and withdraw 100", async function(){
    await (await wallet.connect(owner).donate({value: 300})).wait()
    const tx = await wallet.connect(owner).withdrawMoney(sid.address, 100)
    await expect(() => tx).to.changeEtherBalances([sid, wallet], [100, -100])
    await tx.wait()
  })

  it("Should return error message because sender is not owner", async function(){
    await (await wallet.connect(owner).donate({value: 1000})).wait()

    await expect(wallet.connect(sid).withdrawMoney(sid.address, 100)).to.be.revertedWith('Ownable: caller is not the owner');
  })

  it("Should return error message because contract doesn't have enough money to withdraw", async function(){
    await (await wallet.connect(owner).donate({value: 50})).wait()

    await expect(wallet.connect(owner).withdrawMoney(sid.address, 150)).to.be.revertedWith("Contract doesn't own enough money");
  })
});