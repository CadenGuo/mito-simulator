import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import { Colors } from './constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <ConfigProvider
    theme={{
      components: {
        Collapse: {
          contentPadding: '0 0',
        },
        Checkbox: {
          borderRadiusSM: 1,
        },
      },
      token: {
        colorPrimary: Colors.PURPLE,
        colorText: Colors.PURPLE,
        borderRadius: 25,
        fontSize: 15,
        colorSuccessBg: Colors.WHITE_TEAL,
        colorSuccessBorder: Colors.TEAL,
      },
    }}
  >
    <App />
  </ConfigProvider>
  // </React.StrictMode>
);
