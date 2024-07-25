import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Navigate, Routes, HashRouter } from 'react-router-dom';
import { PATH } from 'pages/path';
import routerList from 'pages/routerList';
import NavBar from 'pages/simulator/NavBar';
import { Layout, Affix } from 'antd';
import 'antd/dist/reset.css';

const { Content } = Layout;

const App = () => {
  return (
    <HashRouter>
      <Layout style={{ height: '100%' }}>
        <Affix>
          <NavBar />
        </Affix>
        <Layout style={{ height: '100%' }}>
          <Content
            style={{
              height: '100%',
              background: 'white',
              paddingTop: '1rem',
              paddingLeft: '2rem',
              paddingRight: '2rem',
              overflowY: 'scroll',
            }}
          >
            <Routes>
              {
                routerList.map(route => {
                  const { component: AppComponent } = route;
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<AppComponent />}
                    />
                  );
                })
              }
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </HashRouter>
  );
};

export default App;
