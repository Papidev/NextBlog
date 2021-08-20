import React from "react";
import type { AppProps } from "next/app";

import "../styles/index.css"; // global css
import "fontsource-montserrat"; // global font

import {TrackingProvider} from '../lib/contexts/ga'

import '../styles/index.css'
import 'fontsource-montserrat'

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  return (
    <TrackingProvider>
      <Component {...pageProps} />
    </TrackingProvider>
  )
}

export default App
