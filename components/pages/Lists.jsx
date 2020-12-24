import Store from '../../store';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';

import Content from '../ui/Content';
import List from '../ui/List';
import VirtualScroll from '../ui/VirtualScroll';

const ListEntry = ({ list, ...props }) => (
  <div {...props} className="p-4 border-solid border-b cursor-pointer">
    <span className="text-md">{list.name}</span>
  </div>
);

const AllLists = ({ onSelect }) => {
  const lists = Store.useState(selectors.getLists);

  return (
    <VirtualScroll
      data={lists}
      totalCount={lists.length}
      style={{ height: '100%', width: '100%' }}
      itemContent={(i, list) => (
        <ListEntry list={list} onClick={() => onSelect(list)} onClose={() => onSelect(null)} />
      )}
    />
  );
};

const Lists = ({ selected }) => {
  return (
    <Content visible={selected} className="p-4">
      <List className="h-full w-full">
        {selected && (
          <AllLists
            onSelect={list => {
              actions.setSelectedList(list);
              actions.setPageById('list-detail');
            }}
          />
        )}
      </List>
    </Content>
  );
};

export default Lists;
