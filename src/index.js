import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

import GlobalStyles from '~/components/GlobalStyles';
import BasketProvider from './contexts/BasketContext';
import store from './redux/store';
import { SocketContextProvider } from './Layouts/components/Chats/Chat/context/SocketContext';
import { ChatProvider } from './Layouts/components/Chats/Chat/context/ChatContext';

AOS.init({
  once: true,
  duration: 800,
  easing: 'linear',
});

const root = ReactDOM.createRoot(document.getElementById('root'));

function Main() {
  const { t } = useTranslation();

  return (
    <Provider store={store}>
      {/* <React.StrictMode> */}
      <GoogleOAuthProvider clientId="1016987616352-ac1dgf61p6suvhvg3bcaqcrqd874rppm.apps.googleusercontent.com">
        <I18nextProvider i18n={i18n}>
          <GlobalStyles>
            <BasketProvider>
              <SocketContextProvider>
                <ChatProvider>
                  <Helmet>
                    <title>{t('title')}</title>
                  </Helmet>
                  <App />
                </ChatProvider>
              </SocketContextProvider>
            </BasketProvider>
          </GlobalStyles>
        </I18nextProvider>
      </GoogleOAuthProvider>
      {/* </React.StrictMode> */}
    </Provider>
  );
}

root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
