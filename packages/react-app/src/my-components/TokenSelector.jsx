import React, { useState, useEffect } from "react";
import { Button, List, Divider, InputNumber, Card, Slider, Switch, Statistic, Input, Select } from "antd";
import { QuestionOutlined } from '@ant-design/icons';
import { Address, Balance } from "../components";
import { NFTInfoCard, CloneInfoCard, AllNFTList, UserNFTList, UserCloneList } from "../my-components";
import { useContractReader, useExternalContractLoader } from "../hooks";
import { erc20Abi } from "../standardABIs/erc20Abi"
import { parseEther, formatEther } from "@ethersproject/units";
import useFetch from "react-fetch-hook";

const ethers = require('ethers');
const utils = require('ethers').utils

const { Option } = Select;

export default function TokenSelector({address, ERC20Address, setERC20Address, userProvider}) {

  const [listSource, setListSource] = useState("https://gateway.ipfs.io/ipns/tokens.uniswap.org");

  const tokenList = useFetch(listSource);

  const Token = useExternalContractLoader(userProvider, ERC20Address, erc20Abi);
  const externalToken = ({Token: Token});

  const tokenBalance = useContractReader(externalToken, "Token", "balanceOf", [address]);

  return (
    <div class="token-selector">

      <div class="erc20-selector">

        <div class="balance">
          <p>{tokenBalance?utils.formatUnits(tokenBalance.toString()):"0"}</p>
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
            {/*<Option
              value={require("./../contracts/TestCoin2.address.js")}
            >
              <span class="token-symbol"> TSTC2</span>
            </Option>*/}
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

    </div>
  );

}
