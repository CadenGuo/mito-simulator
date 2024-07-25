import React, { useState } from 'react';
import {
  InputNumber, Form, Radio, Switch, Button, Statistic, Row, Col, Divider,
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { Colors } from '../../constants';
import * as calculatePoints from './calculatePoints';

interface IPropsResults {
  maxPoints: number,
  minPoints: number,
}

const SimulateResults: React.FC<IPropsResults> = (props) => {
  return (
    <div>
      <p>
        Here are your simulation results:<br />
        (Note: this simulation doesn't include the points earned directly from badges)
      </p>
      <Divider />
      <Row gutter={8}>
        <Col span={12}>
          <Statistic title={<>Max Possible Points<br />(referrals boosts are max utilised)</>} value={props.maxPoints} precision={2} />
        </Col>
        <Col span={12}>
          <Statistic title={<>Min Possible Points<br />(referrals happened on the same day)</>} value={props.minPoints} precision={2} />
        </Col>
      </Row>
    </div>
  );
};

interface IProps {
  assetName?: string,
  chainMultipliers?: { [key: string]: number },
  epochMultipliers?: { [key: string]: number },
  hasEigenLayer?: boolean
  hasTestnet?: boolean
}

const MitoSimulator: React.FC<IProps> = ({
  assetName = 'weETH',
  chainMultipliers = { Ethereum: 1.1, Base: 1.2 },
  epochMultipliers = { "1": 1.5, "2": 1.3 },
  hasEigenLayer = false,
  hasTestnet = false,
}: IProps) => {
  const [maxPoints, setMaxPoints] = useState(0);
  const [minPoints, setMinPoints] = useState(0);
  const [simulated, setSimulated] = useState(false);

  const [form] = Form.useForm();

  const simulate = (values: any) => {
    const eachChainDepositedAnount = Object.keys(values)
      .filter(key => key.startsWith(assetName) && values[key] > 0)
      .map(key => ({
        chain: key.split('_')[1],
        value: values[key],
      }));

    const totalDepositedAmount = eachChainDepositedAnount.reduce(
      (acc, cur) => acc + cur.value,
      0,
    );

    const dailyBasePoints = eachChainDepositedAnount.reduce(
      (acc, cur) => acc + calculatePoints.getDailyBasePoints(cur.value) * chainMultipliers[cur.chain],
      0,
    );

    const xBoost = calculatePoints.getXBoost(values.xConnected);
    const welcomeBoost = calculatePoints.getWelcomeBoost(values.appliedReferralCode);
    const morseBoost = calculatePoints.getMorseBoost(values.have1Morse);
    const epochBoost = epochMultipliers[values.firstDepositEpoch];
    const bracketBoost = calculatePoints.getBracketBoost(totalDepositedAmount);
    const testnetBoost = calculatePoints.getTestnetBoost(values.testnetTier);
    const eigenlayerBoost = calculatePoints.getEigenlayerBoost(values.eigenlayerPoints);


    const staticBoost = xBoost * welcomeBoost * morseBoost * epochBoost * bracketBoost * testnetBoost * eigenlayerBoost;

    let maxReferingDays = values.validReferrals * 14 > values.depositeDays ? values.depositeDays : values.validReferrals * 14;
    let minReferingDays = values.validReferrals > 0 ? 7 : 0;

    let maxPoints = 0;
    for (let i = values.depositeDays; i > 0; i--) {
      const holdingBoost = calculatePoints.getHoldingDurationBoost(i);
      let dayPoints = dailyBasePoints * staticBoost * holdingBoost;
      if (maxReferingDays > 0) {
        dayPoints = dayPoints * calculatePoints.getReferrerBoost();
      }
      maxReferingDays--;
      maxPoints += dayPoints;
    }

    let minPoints = 0;
    for (let i = 1; i <= values.depositeDays; i++) {
      const holdingBoost = calculatePoints.getHoldingDurationBoost(i);
      let dayPoints = dailyBasePoints * staticBoost * holdingBoost;
      if (minReferingDays > 0) {
        dayPoints = dayPoints * calculatePoints.getReferrerBoost();
      }
      minReferingDays--;
      minPoints += dayPoints;
    }

    console.log(maxPoints);
    console.log(minPoints);

    setMaxPoints(maxPoints);
    setMinPoints(minPoints);
    setSimulated(true);
  };


  return (
    <div style={{ paddingBottom: '1rem' }}>
      <Form
        form={form}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        onFinish={simulate}
      >
        <Alert
          message={<img width={40} src='morse.png' />}
          description={`Tell me about your Mitosis profile with ${assetName}. You can switch to other assets above.`}
          type="success"
        />
        <div
          style={{
            marginTop: '1rem',
            backgroundColor: Colors.WHITE_PURPLE,
            paddingTop: 30,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: Colors.LIGHT_PURPLE,
            borderRadius: 25,
          }}
        >
          {Object.keys(chainMultipliers).map((key) => {
            return <Form.Item label={<>{`${assetName} Deposited(${key})`}&nbsp;<img width={20} src={`${key.toLowerCase()}.svg`} /></>} name={`${assetName}Deposited_${key}`} initialValue={0}>
              <InputNumber />
            </Form.Item>;
          })}
          <Form.Item label="Deposit Days" name="depositeDays" initialValue={30}>
            <InputNumber suffix="Days" />
          </Form.Item>
          {hasEigenLayer && <Form.Item label="Eigenlayer Points" name="eigenlayerPoints" initialValue={5000}>
            <InputNumber />
          </Form.Item>}
          <Form.Item label="Valid Referrals" name="validReferrals" initialValue={2} tooltip="Only user who is referred by you and have deposited >= 0.1 weETH is considered valid">
            <InputNumber />
          </Form.Item>
          <Form.Item label="First Deposit Epoch" name="firstDepositEpoch" initialValue="1" layout="horizontal">
            <Radio.Group>
              {Object.keys(epochMultipliers).map((key) => {
                return (
                  <Radio value={key}>{key}</Radio>
                );
              })}
            </Radio.Group>
          </Form.Item>
          {hasTestnet && <Form.Item label="Testnet Tier" name="testnetTier" initialValue="none">
            <Radio.Group>
              <Radio value="none">None</Radio>
              <Radio value="bronze">Bronze</Radio>
              <Radio value="silver">Silver</Radio>
              <Radio value="gold">Gold</Radio>
              <Radio value="platinum">Platinum</Radio>
              <Radio value="diamond">Diamond</Radio>
            </Radio.Group>
          </Form.Item>}
          <Form.Item label="X Connected" name="xConnected" initialValue={true}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Form.Item>
          <Form.Item label="Applied Referral Code" name="appliedReferralCode" initialValue={true}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Form.Item>
          <Form.Item label={<>Have 1 Morse&nbsp;<img width={22} src="morse.png" /></>} name="have1Morse" initialValue={true}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Form.Item>
          <Form.Item label=" " colon={false} labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: '1rem' }}>
              Simulate
            </Button>
            <Button onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Form.Item>
        </div>
      </Form>
      {simulated && <Alert
        message={
          <div>
            <img width={40} src='morse.png' />
            <Button
              type="primary"
              style={{ float: 'right' }}
              onClick={() => {
                form.resetFields();
                setSimulated(false);
              }}
            >
              Start Over
            </Button>
          </div>
        }
        description={<SimulateResults maxPoints={maxPoints} minPoints={minPoints} />}
        type="success"
        style={{ marginTop: '1rem' }}
      />}
    </div>
  );
};

export default MitoSimulator;
