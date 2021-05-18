import type { AppProps } from "next/app";

import "../styles/index.css"; // global css
import "fontsource-montserrat"; // global font

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
