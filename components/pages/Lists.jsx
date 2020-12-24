import { useState } from 'react';
import Store from '../../store';
import { setDone } from '../../store/actions';
import Card from '../ui/Card';

import Content from '../ui/Content';
import List from '../ui/List';
import ListItem from '../ui/ListItem';
import VirtualScroll from '../ui/VirtualScroll';

const ListEntry = ({ list, ...props }) => (
  <div {...props} className="p-4 border-solid border-b cursor-pointer">
    <span className="text-md">{list.name}</span>
  </div>
);

const AllLists = ({ onSelect }) => {
  const lists = Store.useState(s => s.lists);

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

const ListItems = ({ list, onClose }) => {
  return (
    <>
      <div className="py-2">
        <a href="#" onClick={onClose}>
          All Lists
        </a>
      </div>
      <VirtualScroll
        data={list.items || []}
        totalCount={(list.items || []).length}
        style={{ height: '100%', width: '100%' }}
        itemContent={(i, item) => <ListItemEntry list={list} item={item} />}
      />
    </>
  );
};

const ListItemEntry = ({ list, item }) => (
  <div className="p-4 border-solid border-b cursor-pointer">
    <span className="text-md">{item.name}</span>
    <input
      type="checkbox"
      checked={item.done}
      onChange={() => {
        setDone(list, item, !item.done);
      }}
    />
  </div>
);

const Feed = ({ selected }) => {
  const selectedList = Store.useState(s => s.selectedList);

  return (
    <Content visible={selected} className="p-4">
      <List className="h-full w-full">
        {selected && selectedList ? (
          <ListItems
            list={selectedList}
            onClose={() =>
              Store.update(s => {
                s.selectedList = null;
              })
            }
          />
        ) : (
          <AllLists
            onSelect={list => {
              Store.update(s => {
                s.selectedList = list;
              });
            }}
          />
        )}
      </List>
    </Content>
  );
};

export default Feed;
