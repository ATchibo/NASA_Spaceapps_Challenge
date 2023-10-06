import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import {IntlProvider} from "react-intl";

function App() {
  return (
      <IntlProvider messages={{}} locale="en" defaultLocale="en">
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
