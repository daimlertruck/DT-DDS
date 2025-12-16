import Head from 'next/head';
import { Typography } from '@dt-dds/react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js Pages Router Example with DT-DDS</title>
        <meta
          name='description'
          content='Next.js Pages Router Example with DT-DDS'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main>
        <Typography>Hello World</Typography>
      </main>
    </>
  );
}
