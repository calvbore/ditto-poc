import React, { useState, useEffect } from "react";
import { Button, List, Divider, InputNumber, Card, Slider, Switch, Statistic, Input } from "antd";
import { Address, Balance } from "../components";
import { NFTInfoCard, CloneInfoCard } from "../my-components";
import { useContractReader } from "../hooks";
import { parseEther, formatEther } from "@ethersproject/units";

const ethers = require('ethers');
const utils = require('ethers').utils

export default function TestDittoUI({address, mainnetProvider, userProvider, localProvider, tx, readContracts, writeContracts}) {

  const [seeAll, setSeeAll] = useState(true);


  const testCoinBalance = useContractReader(readContracts, "TestCoin", "balanceOf", [address]);
  console.log("Test coin balance: ", testCoinBalance);

  const dittoTestCoinBalance = useContractReader(readContracts, "TestCoin", "balanceOf", [require("./../contracts/DittoMachine.address.js")]);
  console.log("Test coin balance: ", dittoTestCoinBalance);

  const testNFTBalance = useContractReader(readContracts, "TestNFT", "balanceOf", [address]);
  console.log("Test NFT balance: ", testNFTBalance);


  const dittoBalance = useContractReader(readContracts, "DittoMachine", "balanceOf", [address]);
  console.log("Test NFT balance: ", testNFTBalance);

  const dittoAllowance = useContractReader(readContracts, "TestCoin", "allowance", [address, require("./../contracts/DittoMachine.address.js")])

  const [allowance, setAllowance] = useState(0);


  const totalTestNFT = useContractReader(readContracts, "TestNFT", "totalSupply");

  const [targetAddr, setTargetAddr] = useState("0xC570dCc74196CB47Af0f28FB5FeDD52155d1D33E");

  const targetNFTBalance = useContractReader(readContracts, "TestNFT", "balanceOf", [targetAddr]);
  console.log("Test NFT balance: ", targetNFTBalance);

  let tokenCards = [];
  for (let i=0; i<testNFTBalance; i++) {
    console.log("Contract Addresses: " + readContracts.TestNFT.address, readContracts.TestCoin.address);
    tokenCards.push(
      <NFTInfoCard
        userAddr={address}
        targetAddr={address}
        readContracts={readContracts}
        writeContracts={writeContracts}
        contractName={"TestNFT"}
        index={i}
        ERC721Address={readContracts.TestNFT.address}
        ERC20Address={readContracts.TestCoin.address}
        key={i}
        tx={tx}
      />
    );
  }

  let targetCards = [];
  for (let i=0; i<targetNFTBalance; i++) {
    console.log("Contract Addresses: " + readContracts.TestNFT.address, readContracts.TestCoin.address);
    targetCards.push(
      <NFTInfoCard
        userAddr={address}
        targetAddr={targetAddr}
        readContracts={readContracts}
        writeContracts={writeContracts}
        contractName={"TestNFT"}
        index={i}
        ERC721Address={readContracts.TestNFT.address}
        ERC20Address={readContracts.TestCoin.address}
        key={i}
        tx={tx}
      />
    );
  }

  let cloneCards = []
  for (let i=0; i<dittoBalance; i++) {
    console.log("LOOP INDEX: " + i);
    cloneCards.push(
      <CloneInfoCard
        userAddr={address}
        targetAddr={address}
        readContracts={readContracts}
        writeContracts={writeContracts}
        index={i}
        key={i}
        tx={tx}
      />
    );
  }

  let allTokenCards = [];
  for (let i=0; i<totalTestNFT; i++) {
    console.log("Contract Addresses: " + readContracts.TestNFT.address, readContracts.TestCoin.address);
    allTokenCards.push(
      <NFTInfoCard
        userAddr={address}
        targetAddr={targetAddr}
        readContracts={readContracts}
        writeContracts={writeContracts}
        contractName={"TestNFT"}
        index={i}
        ERC721Address={readContracts.TestNFT.address}
        ERC20Address={readContracts.TestCoin.address}
        key={i}
        tx={tx}
        seeAll={true}
      />
    );
  }

  return (
    <div class="grid-container">
      <div class="test-ui">
        <Divider />
        <div>
          <Statistic title="Your Address" value={address} />
          <InputNumber onChange={(value) => {setAllowance(value)}}/>
          <p>Approve the Ditto Machine for {allowance} tokens?</p>
          <p>The Ditto Machine is currently approved for {dittoAllowance?dittoAllowance.toString():0} tokens.</p>
          <Button onClick={() => {
            tx( writeContracts.TestCoin.approve(readContracts.DittoMachine.address, allowance) );
          }}>
            Approve
          </Button>
        </div>
        <Divider />
        <div>
          <Statistic title="Test Coin Address" value={readContracts?readContracts.TestCoin.address:readContracts} />
          <Statistic title="Your Test Coin Balance" value={testCoinBalance} />
          <Button onClick={() => {
            tx( writeContracts.TestCoin.faucet(utils.parseUnits("0.3")) )
          }}>
            Test Coin Faucet
          </Button>
        </div>
        <Divider />
        <div style={{marginTop:48}}>
          <Statistic title="Test NFT Address" value={readContracts?readContracts.TestNFT.address:readContracts} />
          <Statistic title="Test NFT Balance" value={testNFTBalance} />
          <Button onClick={() => {
            tx( writeContracts.TestNFT.faucet() )
          }}>
            Test NFT Faucet
          </Button>
          <div class="card-grid">
            {tokenCards}
          </div>
        </div>
        <Divider />
        <div>
          <span>
            <Input.Search
              style={{ width: "30%" }}
              onSearch={(value) => {setTargetAddr(value)}}
            />
          </span>
          <Statistic title={`${targetAddr} Test NFT Balance`} value={targetNFTBalance} />
          <div class="card-grid">
            {targetCards}
          </div>
        </div>
        <Divider />
        <div>
          <Statistic title="Ditto Machine Address" value={readContracts?readContracts.DittoMachine.address:readContracts} />
          <Statistic title="Ditto Balance" value={dittoBalance} />
          <div class="card-grid">
            {cloneCards}
          </div>
          <Statistic title="Ditto's Test Coin Balance" value={dittoTestCoinBalance} />
        </div>
        <div class="buttum">
        </div>
      </div>
      <div class="NFT-see-all">
        {allTokenCards}
      </div>
    </div>
  )
}
