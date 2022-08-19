import { CheckOutlined, CloseOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import { ConfigProvider, Drawer, Layout, List, Menu, Switch } from 'antd';
import { Theme } from 'antd/lib/config-provider/context';
import { atom, useAtom } from 'jotai';
import React, { useCallback } from 'react';
import { AdminLayoutConfig, AdminLayoutProps } from './AdminLayoutConfig';

const { Content, Footer, Header, Sider } = Layout;

import './AdminLayout.css';
// import classes from './AdminLayout.module.css';

const config: AdminLayoutConfig = {
  theme: 'light', // 'dark',
  showSetting: false,
  showFixHeader: false,
  showFixSideBar: false,
  showSideBarLogo: true,
  collapsedSideBar: true
};

const adminLayoutConfigAtom = atom(config);

const SwitchKey: React.FC<any> = (props) => {
  return (
    <Switch
      {...props}
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
    />
  );
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, footer, menus }) => {
  const [config, setConfig] = useAtom(adminLayoutConfigAtom);

  const { theme, showSetting, showFixHeader, showFixSideBar, showSideBarLogo, collapsedSideBar }: AdminLayoutConfig = config;

  const toggleConfig = useCallback((key: string) => {
    console.log('toggleConfig.key: ', key);
    setConfig((config: any) => ({ ...config, [key]: !config[key] }));
  }, [setConfig]);

  const handleThemeChanage = (checked: boolean) => {
    // setConfig((config: any) => ({ ...config, theme: checked ? 'dark' : 'light' }));

    let color = {};

    // if (checked) {
    //   color = {
    //     primaryColor: '#24292f',
    //     errorColor: '#ff4d4f',
    //     warningColor: '#faad14',
    //     successColor: '#52c41a',
    //     infoColor: '#1890ff'
    //   };
    // } else {
    //   color = {
    //     primaryColor: '#1890ff',
    //     errorColor: '#ff4d4f',
    //     warningColor: '#faad14',
    //     successColor: '#52c41a',
    //     infoColor: '#1890ff'
    //   };
    // }


    ConfigProvider.config({
      theme: {
        ...color
      }
    });

  }

  // className={classes.AdminLayout}
  return (
    <Layout className="admin-layout" data-testid="AdminLayout">
      <Sider theme={config.theme} trigger={null} collapsible collapsed={collapsedSideBar} className={`${showFixSideBar} ? 'fixed-sidebar': ''`}>
        {showSideBarLogo && <div className="logo" />}
        <Menu theme={config.theme} mode="inline" items={menus}></Menu>
      </Sider>
      <Drawer closable={false} placement="right" visible={showSetting} onClose={() => toggleConfig('showSetting')}>
        <List header={<div className="setting-title">Settings</div>} bordered={false}>
          <List.Item key="collapsedSideBar">
            Collapsed SideBar
            <SwitchKey style={{ float: 'right' }} checked={collapsedSideBar} onChange={() => toggleConfig('collapsedSideBar')} />
          </List.Item>
          <List.Item key='showSideBarLogo'>
            Show Icon
            <SwitchKey style={{ float: 'right' }} checked={showSideBarLogo} onChange={() => toggleConfig('showSideBarLogo')} />
          </List.Item>
          <List.Item key="showFixHeader">
            Fixed Header
            <SwitchKey style={{ float: 'right' }} checked={showFixHeader} onChange={() => toggleConfig('showFixHeader')} />
          </List.Item>
          <List.Item key="showFixSideBar">
            Fixed SideBar
            <SwitchKey style={{ float: 'right' }} hecked={showFixSideBar} onChange={() => toggleConfig('showFixSideBar')} />
          </List.Item>
          <List.Item key="theme">
            Theme
            <Switch
              style={{ float: 'right' }}
              checked={theme === 'dark'}
              onChange={handleThemeChanage}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
          </List.Item>
        </List>
      </Drawer>
      <Layout className="site-layout">
        <Header className={`admin-layout-header ${theme} ${showFixHeader ? 'fixed-header' : ''} `}>
          {React.createElement(collapsedSideBar ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => toggleConfig('collapsedSideBar'),
          })}
          {React.createElement(SettingOutlined, {
            className: 'setting',
            onClick: () => toggleConfig('showSetting')
          })}
        </Header>
        <Content
          className={`admin-layout-content ${theme}`}
        >
          {children}
        </Content>
        {footer && <Footer className={`admin-layout-footer ${theme}`}>{footer}</Footer>}
      </Layout>
    </Layout>
  );
};

export default AdminLayout;