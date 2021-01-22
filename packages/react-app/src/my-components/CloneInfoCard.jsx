import React, { useState, useEffect } from "react";
import { Button, Input, Card, Switch, Progress, Spin, Statistic } from "antd";
import { targetAddress, Balance } from "../components";
import { useContractReader } from "../hooks";

export default function CloneInfoCard({userAddr, targetAddr, index, readContracts, writeContracts, tx, seeAll}) {

  const tokenId = useContractReader(readContracts, "DittoMachine", "tokenOfOwnerByIndex", [targetAddr, index]);
  console.log("INDEX: " + index);
  console.log("Test NFT token ID is:" + tokenId);

  const tokenOwner = useContractReader(readContracts, "DittoMachine", "ownerOf", [tokenId]);

  function handleDissolve() {
    tx( writeContracts.DittoMachine.dissolve(tokenId) );
  }

  return (
    <div class="token-card">
      <Card title={`Ditto ID: ${tokenId}`} style={{ width: 200 }} hoverable >
        {/*<Statistic title="Token ID:" value={tokenId} />*/}
        <Button
          type="danger"
          onClick={handleDissolve}
          disabled={userAddr !== tokenOwner}
        >
          Dissolve
        </Button>
      </Card>
    </div>
  )
}
