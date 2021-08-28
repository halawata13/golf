import React from 'react';
import { Index } from './index';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';

export function App() {
  return (
    <RecoilRoot>
      <HelmetProvider>
        <Helmet>
          <title>Golf</title>
        </Helmet>

        <Index />
      </HelmetProvider>
    </RecoilRoot>
  );
}
