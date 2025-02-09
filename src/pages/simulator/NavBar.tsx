import React from 'react';
import { Layout } from 'antd';
import { Colors } from '../../constants';
import './link.css';

const { Header } = Layout;

interface IProps { }

const NavBar: React.FC<IProps> = (props: IProps) => {

  return (
    <Header style={{ height: 60, alignItems: "center", backgroundColor: Colors.LIGHT_PURPLE }}>
      <span
        className="m-l-sm m-r-l p-t-none m-t-none"
        style={{
          float: 'left',
          fontSize: 24,
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.85)',
          lineHeight: '55px',
        }}
      >
        <img style={{ marginRight: '0.5rem' }} width={40} src='mitosis_white.svg' />
        Mito Simulator
      </span>
      <span
        className="m-l-sm m-r-l p-t-none m-t-none"
        style={{
          float: 'right',
          fontSize: 16,
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.85)',
          lineHeight: '55px',
        }}
      >
        built by&nbsp;
        <a href="https://twitter.com/C4den994" target="_blank">@C4den</a>
        &nbsp;with ❤️
      </span>
    </Header >
  );
};

export default NavBar;
