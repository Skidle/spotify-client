import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import logo from '../logo.png';

const { Header, Content, Footer } = AntLayout;

const Layout = ({ children }) => (
  <AntLayout>
    <Header style={{ display: 'flex' }}>
      <div style={{
        alignItems: 'center',
        display: 'flex',
        width: '150px',
      }}
      >
        <img src={logo} style={{ width: '25px' }} alt="Logo" />
        <span style={{ color: '#fff', paddingLeft: '8px' }}>Spotify client</span>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '24px 50px', minHeight: 'calc(100vh - 64px - 70px)' }}>
      {children}
    </Content>
    <Footer style={{ textAlign: 'center' }}>React Girls Webinar on Redux</Footer>
  </AntLayout>
);

export default Layout;
