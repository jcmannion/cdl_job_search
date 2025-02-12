import React from 'react';
import { AppProps } from 'next/app';
import Navbar from '../components/Navbar';  
import '../styles/globals.css';  

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ paddingTop: '100px' }}>
      <Navbar /> 
      <Component {...pageProps} />  
    </div>
  );
}

export default MyApp;
