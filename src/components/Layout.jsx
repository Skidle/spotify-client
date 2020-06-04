import React from 'react';
import { Link } from 'react-router-dom';
import { Layout as AntLayout } from 'antd';
import logo from '../logo.png';

const { Header, Content, Footer } = AntLayout;

const Layout = ({ children }) => (
  <AntLayout>
    <Header style={{ display: 'flex' }}>
      <Link to="/">
        <div style={{
          alignItems: 'center',
          display: 'flex',
          width: '150px',
        }}
        >
          <img src={logo} style={{ width: '25px' }} alt="Logo" />
          <span style={{ color: '#fff', paddingLeft: '8px' }}>Spotify client</span>
        </div>
      </Link>
    </Header>
    <Content style={{ padding: '24px 50px', minHeight: 'calc(100vh - 64px - 70px)', maxWidth: '1600px', margin: '0 auto' }}>
      {children}
    </Content>
    <Footer style={{ textAlign: 'center' }}>React Girls Webinar on Redux</Footer>
  </AntLayout>
);

export default Layout;
