import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';

import store from './store';
import {App} from './modules/app';
import backend from './backend';
import {NetworkError} from './backend';
import app from './modules/app';
import {initReactIntl} from './i18n';
import './styles.css';

/* Configure backend proxy. */
backend.init(error => store.dispatch(app.actions.error(new NetworkError())));

/* Configure i18n. */
const {locale, messages} = initReactIntl();

/* Render application. */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <IntlProvider locale={locale} messages={messages}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </IntlProvider>
        </Provider>
    </React.StrictMode>);

