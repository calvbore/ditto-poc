import React, { useState, useEffect } from "react";
import { Button, List, Divider, InputNumber, Card, Slider, Switch, Statistic, Input } from "antd";
import { Address, Balance } from "../components";
import { NFTInfoCard, CloneInfoCard } from "../my-components";
import { useContractReader, useCustomContractLoader } from "../hooks";
import { parseEther, formatEther } from "@ethersproject/units";

const ethers = require('ethers');
const utils = require('ethers').utils

export default function UserNFTList({address, tx, readContracts, writeContracts, ERC721Address, ERC20Address}) {

  // needs to be changed to useCustomContractLoader or useExternalContractLoader
  const totalSupply = useContractReader(readContracts, "TestNFT", "balanceOf", [address]);

  let userTokenCards = [];
  for (let i = 0; i < totalSupply; i++) {
   userTokenCards.push(
      <NFTInfoCard
        userAddr={address}
        targetAddr={address}
        readContracts={readContracts}
        writeContracts={writeContracts}
        contractName={"TestNFT"}
        index={i}
        ERC721Address={ERC721Address}
        ERC20Address={ERC20Address}
        key={i}
        tx={tx}
      />
    );
  }

  return (
    <div>
      {userTokenCards}
    </div>
  );
}
