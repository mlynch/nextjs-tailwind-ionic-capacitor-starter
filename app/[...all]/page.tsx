import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../components/AppShell'), {
  ssr: false,
});

export function generateStaticParams() {
  return [{ all: ['tabs', 'feed'] }];
}

export default function Page() {
  return <App />;
}
