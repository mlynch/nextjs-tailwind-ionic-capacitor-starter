import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/AppShell'), {
  ssr: false,
});

export default function Page() {
  return <App />;
}
