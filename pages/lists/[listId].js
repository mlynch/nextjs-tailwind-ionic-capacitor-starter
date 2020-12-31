import AppShell from '../../components/AppShell';
import ListDetailPage from '../../components/pages/ListDetail';

export default function ListDetail({ listId }) {
  return <AppShell page={ListDetailPage} pageProps={{ listId }} />;
}

export const getServerSideProps = context => {
  const {
    params: { listId },
  } = context;

  return {
    props: {
      listId,
    },
  };
};
