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
  const userBalance = useContractReader(readContracts, "DittoMachine", "balanceOf", [address]);

  let userCloneCards = [];
  for (let i = 0; i < userBalance; i++) {
    userCloneCards.push(
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

  return (
    <div>
      {userCloneCards}
    </div>
  );
}
