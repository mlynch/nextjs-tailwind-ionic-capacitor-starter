import AppShell from '../../components/AppShell';
import ListDetailPage from '../../components/pages/ListDetail';
import { lists } from '../../mock';

export default function ListDetail({ list }) {
  return <AppShell page={ListDetailPage} pageProps={{ list }} />;
}

export const getServerSideProps = context => {
  const {
    params: { listId },
  } = context;

  const list = lists.find(l => l.id === listId);
  console.log('Loaded list', list);

  return {
    props: {
      list,
    },
  };
};
