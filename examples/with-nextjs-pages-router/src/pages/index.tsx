import Head from 'next/head';
import Link from 'next/link';

import { Box, Typography } from '@dt-dds/react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Demo App - Home</title>
        <meta name='description' content='Demo App' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <div>
        <Box>
          <Typography element='h2' fontStyles='h4Bold' color='grey_90'>
            Examples in <Link href='/table-lists'>Table Lists</Link> and{' '}
            <Link href='/forms'>Forms</Link>
          </Typography>
        </Box>
      </div>
    </>
  );
}
