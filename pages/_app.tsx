import App from 'next/app';
import Head from 'next/head';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css';

export default class Root extends App {
  render() {
    const { Component } = this.props;

    return (
      <>
        <Head>
          <link rel='icon' type='image/png' href='/icon.png' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <title>Floating Cats</title>
          <link rel='preconnect' href='https://fonts.googleapis.com' />

          <link
            href='https://fonts.googleapis.com/css2?family=Short+Stack&display=swap'
            rel='stylesheet'
          ></link>

          <link
            href='https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap'
            rel='stylesheet'
          ></link>
        </Head>

        <Component />
      </>
    );
  }
}
