import Store from '../../store';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';

import Content from '../ui/Content';
import List from '../ui/List';
import VirtualScroll from '../ui/VirtualScroll';

const ListItems = ({ list, onClose }) => {
  return (
    <>
      <div className="py-2">
        <a href="#" onClick={onClose}>
          All Lists
        </a>
      </div>
      <VirtualScroll
        data={list?.items || []}
        totalCount={(list?.items || []).length}
        style={{ height: '100%', width: '100%' }}
        itemContent={(i, item) => <ListItemEntry list={list} item={item} />}
      />
    </>
  );
};

const ListItemEntry = ({ list, item }) => (
  <div
    className="p-4 border-solid border-b cursor-pointer flex select-none"
    onClick={() => actions.setDone(list, item, !item.done)}
  >
    <span className="text-md flex-1">{item.name}</span>
    <input
      className="pointer-events-none select-none"
      type="checkbox"
      checked={item.done || false}
    />
  </div>
);

const ListDetail = ({ selected }) => {
  const selectedList = Store.useState(selectors.getSelectedList);

  return (
    <Content visible={selected} className="p-4">
      <List className="h-full w-full">
        {selected && (
          <ListItems
            list={selectedList}
            onClose={() => {
              actions.setSelectedList(null);
              actions.setPageById('lists');
            }}
          />
        )}
      </List>
    </Content>
  );
};

export default ListDetail;
