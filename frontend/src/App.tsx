import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import {IntlProvider} from "react-intl";
import {messages} from "./i18n/messages";
import {LOCALES} from "./i18n/locales";

function App() {
  return (
      <IntlProvider messages={messages[LOCALES.ENGLISH]} locale="en" defaultLocale="en">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<HomePage />}>
                  </Route>
              </Routes>
          </BrowserRouter>
      </IntlProvider>
  );
}

export default App;
