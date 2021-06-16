/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */

import 'tailwindcss/tailwind.css';
import React from 'react';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}