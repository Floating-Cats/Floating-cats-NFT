import type { AppProps /*, AppContext */ } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      {
        // prevent Next.js from trying to render anything on the server
        // unless the window object is defined.
        typeof window === 'undefined' ? null : <Component {...pageProps} />
      }
    </div>
  );
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
