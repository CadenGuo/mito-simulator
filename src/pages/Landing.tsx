import React, { useState } from 'react';
import { Select, Flex } from 'antd';
import MitoSimulator from 'pages/simulator/MitoSimulator';

interface IProps {

}

const Landing: React.FC<IProps> = () => {
  const [asset, setAsset] = useState('weETH');
  let simulator = null;

  if (asset === 'weETH') {
    simulator = <MitoSimulator assetName={asset}
      chainMultipliers={{Ethereum: 1.1, Arbitrum: 1.2, Blast: 1.2, Linea: 1.2, Mode: 1.2, Scroll: 1.3, Manta: 1.2, Optimism: 1.2}}
      epochMultipliers={{"1": 1.5, "2": 1.3, "3": 1.2, "4": 1}}
      hasEigenLayer
      hasTestnet
    />;
  } else if (asset === 'weETHs') {
    simulator = <MitoSimulator assetName={asset}
      chainMultipliers={{Ethereum: 1.1}}
      epochMultipliers={{"1": 1.5, "2": 1.3, "3": 1.2, "4": 1}}
    />;
  } else if (asset === 'uniETH') {
    simulator = <MitoSimulator assetName={asset}
      chainMultipliers={{Ethereum: 1.1, Arbitrum: 1.4, Linea: 1.2, Scroll: 1.2}}
      epochMultipliers={{"1": 1.5, "2": 1.3, "3": 1.2, "4": 1}}
    />;
  }


  return (
    <Flex align="center" vertical>
      <div
        style={{
          marginBottom: '1rem',
        }}
      >
        <Select
          onSelect={(value) => setAsset(value)}
          defaultValue="weETH"
          style={{ width: 200 }}
          options={[
            {
              value: 'weETH',
              label: 'weETH',
            },
            {
              value: 'weETHs',
              label: 'weETHs',
            },
            {
              value: 'uniETH',
              label: 'uniETH',
            },
          ]}
        />
      </div>
      {simulator}
    </Flex >

  );
};

export default Landing;
