import { Link } from 'wouter';

import usePage from '../../hooks/usePage';
import Store from '../../store';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';

import Content from '../ui/Content';
import List from '../ui/List';
import VirtualScroll from '../ui/VirtualScroll';

const ListEntry = ({ list, ...props }) => (
  <Link href={`/lists/${list.id}`}>
    <a
      {...props}
      className="p-4 border-solid dark:border-gray-800 border-b cursor-pointer dark:text-gray-200 block"
    >
      <span className="text-md">{list.name}</span>
    </a>
  </Link>
);

const AllLists = ({ onSelect }) => {
  const lists = Store.useState(selectors.getLists);

  return (
    <VirtualScroll
      data={lists}
      totalCount={lists.length}
      style={{ height: '100%', width: '100%' }}
      itemContent={(i, list) => <ListEntry list={list} />}
    />
  );
};

const Lists = ({ selected }) => {
  usePage({
    title: 'Lists',
  });

  return (
    <Content className="p-4 dark:bg-black">
      <List className="h-full w-full">
        <AllLists />
      </List>
    </Content>
  );
};

export default Lists;
