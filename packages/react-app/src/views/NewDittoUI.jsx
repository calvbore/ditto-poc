import React, { useState, useEffect } from "react";
import { Button, List, Divider, InputNumber, Card, Slider, Switch, Statistic, Input, Select } from "antd";
import { QuestionOutlined } from '@ant-design/icons';
import { Address, Balance } from "../components";
import { NFTInfoCard, CloneInfoCard, AllNFTList, UserNFTList, UserCloneList, TokenSelector } from "../my-components";
import { useContractReader, useExternalContractLoader } from "../hooks";
import { parseEther, formatEther } from "@ethersproject/units";

const ethers = require('ethers');
const utils = require('ethers').utils

const { Option } = Select;

export default function NewDittoUI({address, mainnetProvider, userProvider, localProvider, tx, readContracts, writeContracts}) {

  const [ERC721Address, setERC721Address] = useState(require("./../contracts/TestNFT.address.js"));
  const [ERC20Address,  setERC20Address]  = useState(require("./../contracts/TestCoin.address.js")/*"0x960b236A07cf122663c4303350609A66A7B288C0"*/);

  // const [listSource, setListSource] = useState("https://gateway.ipfs.io/ipns/tokens.uniswap.org");

  // const tokenList = useFetch(listSource);

  // const Token = useExternalContractLoader(userProvider, ERC20Address, erc20Abi);
  // const externalToken = ({Token: Token});

  // const tokenBalance = useContractReader(externalToken, "Token", "balanceOf", [address]);

  return (
    <div>
      <TokenSelector
        address={address}
        ERC20Address={ERC20Address}
        setERC20Address={setERC20Address}
        userProvider={userProvider}
      />
      <Divider/>
      <div class="token-viewer">
        <div>
          <p>All NFTs</p>
          <AllNFTList
            address={address}
            tx={tx}
            readContracts={readContracts}
            writeContracts={writeContracts}
            ERC721Address={ERC721Address}
            ERC20Address={ERC20Address}
          />
        </div>
        <div>
          <p>Your NFTs</p>
          <UserNFTList
            address={address}
            tx={tx}
            readContracts={readContracts}
            writeContracts={writeContracts}
            ERC721Address={ERC721Address}
            ERC20Address={ERC20Address}
          />
        </div>
        <div>
          <p>Your Clones</p>
          <UserCloneList
            address={address}
            tx={tx}
            readContracts={readContracts}
            writeContracts={writeContracts}
            ERC721Address={ERC721Address}
            ERC20Address={ERC20Address}
          />
        </div>
      </div>
      <div class="buttum">
      </div>
    </div>
  );

}
