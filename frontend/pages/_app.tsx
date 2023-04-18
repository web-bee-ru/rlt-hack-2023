import type { AppProps } from 'next/app';
import CommonProviders from '@/src/Providers/CommonProviders';
import DefaultLayout from '@/src/layouts/DefaultLayout';
import theme from '@/src/const/defaultTheme';
import SafeHydrate from '@/src/Next/SafeHydrate';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SafeHydrate>
      <CommonProviders theme={theme}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </CommonProviders>
    </SafeHydrate>
  );
}
