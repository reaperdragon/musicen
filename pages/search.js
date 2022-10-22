import Head from 'next/head';
import React from 'react'
import { Header } from '../components'

const search = () => {
  return (
    <div>
      <Head>
        <title>Musicen Search</title>
        <link rel="icon" href="/logo-main.png" />
      </Head>
      <Header />
    </div>
  );
}

export default search