import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import AdminLayout from './layouts/AdminLayout/AdminLayout'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <AdminLayout>
        <App />
      </AdminLayout>
    </ConfigProvider>
  </React.StrictMode>
)
