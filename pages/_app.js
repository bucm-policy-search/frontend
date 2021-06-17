/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import 'tailwindcss/tailwind.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}