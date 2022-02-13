import type { AppProps /*, AppContext */ } from 'next/app';

// These styles (styles.css) will apply to all pages and components
// in your application. Due to the global nature of stylesheets, and
// to avoid conflicts, you may only import them inside pages/_app.js.
// import '../styles.css';
import 'bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
