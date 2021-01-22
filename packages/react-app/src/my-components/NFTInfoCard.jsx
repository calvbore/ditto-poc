import React, { useState, useEffect } from "react";
import { Button, Input, InputNumber, Card, Switch, Progress, Spin, Statistic, Modal } from "antd";
import { Address, Balance } from "../components";
import { useContractReader } from "../hooks";

const utils = require('ethers').utils;

export default function NFTInfoCard({userAddr, targetAddr, readContracts, writeContracts, contractName, index, ERC721Address, ERC20Address, tx, seeAll}) {

  const [vis, setVis] = useState(false);

  const [amount, setAmount] = useState();

  const funcName = seeAll ? "tokenByIndex" : "tokenOfOwnerByIndex";
  const funcArgs = seeAll ? [index] : [targetAddr, index];

  const tokenId = useContractReader(readContracts, contractName, funcName , funcArgs);
  const tokenOwner = useContractReader(readContracts, contractName, "ownerOf", [tokenId])

  console.log("INDEX: " + index);
  console.log("Test NFT token ID is:" + tokenId);

  function handleAmountChange(value) {
    setAmount(value);
  }

  function handleClone() {
    tx( writeContracts.DittoMachine.transform(ERC721Address, tokenId, ERC20Address, amount) );
    console.log("Transform args: ", ERC721Address, tokenId, ERC20Address, amount);
    setVis(false);
  }

  function handleSell() {
    const dataERC20Address = utils.solidityPack(["address"], [ERC20Address]);
    console.log("Added data will be: " + dataERC20Address);
    console.log("Handling Sell to: " + readContracts.DittoMachine.address);
    tx( writeContracts.TestNFT["safeTransferFrom(address,address,uint256,bytes)"](userAddr, readContracts.DittoMachine.address, tokenId, dataERC20Address) );

  }

  return (
    <div class="token-card">
      <Card title={`Test NFT ${tokenId}`} style={{ width: 200 }} hoverable >
        <Statistic title="Token ID:" value={tokenId} />
        <>
          <Button
            onClick={() => {setVis(true)}}
            type={userAddr !== tokenOwner ? "primary" : "default"}
          >
            Clone
          </Button>
          <Modal
            visible={vis}
            onCancel={() => {setVis(false)}}
            onOk={handleClone}
          >
            <InputNumber size="small" onChange={handleAmountChange} />
            <p>{amount}</p>
          </Modal>
        </>
        <Button
          onClick={handleSell}
          type={userAddr == tokenOwner ? "primary" : "default"}
          danger
          disabled={userAddr !== tokenOwner}
        >
          Sell
        </Button>
      </Card>
    </div>
  )
}
