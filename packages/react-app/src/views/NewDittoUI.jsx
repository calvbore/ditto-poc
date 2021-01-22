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
      {/*<div class="token-selector">

        <div class="erc20-selector">
          <div class="balance">
            <p>{tokenBalance?utils.formatUnits(tokenBalance.toString()):0}</p>
          </div>
          <div div="selector">
            <Select
              loading={tokenList.isLoading}
              defaultValue={" TSTC"}
              style={{ width: '130px' }}
              size="large"
              allowClear={true}
              showSearch={true}
              filterOption={true}
              onChange={(value) => {setERC20Address(value)}}
            >
              <Option
                value={require("./../contracts/TestCoin.address.js")}
              >
                <span class="token-symbol"> TSTC</span>
              </Option>
              {tokenList.isLoading ? <Option>Loading...</Option> : tokenList.data.tokens.map((data, index) => {
                return (
                  <Option
                    key={index}
                    value={data.address}
                  >
                      <img  class="token-logo" src={data.logoURI} width="25" height="25"/>
                      <span class="token-symbol"> {data.symbol}</span>
                  </Option>
                );
              })}
            </Select>
          </div>
          <div class="token-address">
            <p>{ERC20Address ? <a href={`https://etherscan.io/token/${ERC20Address}`} target="_blank">{ERC20Address}</a> : "Please select a token."}</p>
          </div>
        </div>

      </div>*/}
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
