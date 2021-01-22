import React, { useState, useEffect } from "react";
import { Button, List, Divider, InputNumber, Card, Slider, Switch, Statistic, Input } from "antd";
import { Address, Balance } from "../components";
import { NFTInfoCard, CloneInfoCard } from "../my-components";
import { useContractReader, useCustomContractLoader } from "../hooks";
import { parseEther, formatEther } from "@ethersproject/units";

const ethers = require('ethers');
const utils = require('ethers').utils

export default function AllNFTList({address, tx, readContracts, writeContracts, ERC721Address, ERC20Address}) {

  // needs to be changed to useCustomContractLoader or useExternalContractLoader
  const totalSupply = useContractReader(readContracts, "TestNFT", "totalSupply");

  let allTokenCards = [];
  for (let i = 0; i < totalSupply; i++) {
    allTokenCards.push(
      <NFTInfoCard
        userAddr={address}
        readContracts={readContracts}
        writeContracts={writeContracts}
        contractName={"TestNFT"}
        index={i}
        ERC721Address={ERC721Address}
        ERC20Address={ERC20Address}
        key={i}
        tx={tx}
        seeAll={true}
      />
    );
  }

  return (
    <div>
      {allTokenCards}
    </div>
  );
}
