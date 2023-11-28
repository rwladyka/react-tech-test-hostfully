import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { AliasToken } from 'antd/es/theme/internal';
import theme from './config/defaultSettings.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ token: theme as Partial<AliasToken> }}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
