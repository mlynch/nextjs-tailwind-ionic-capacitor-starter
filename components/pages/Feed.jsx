import { Virtuoso } from 'react-virtuoso';

import Content from '../ui/Content';
import List from '../ui/List';
import ListItem from '../ui/ListItem';

const Feed = ({ selected }) => {
  return (
    <Content visible={selected} className="p-4">
      <List className="h-full w-full">
        {selected && (
          <Virtuoso
            totalCount={1000}
            overscan={200}
            style={{ height: '100%', width: '100%' }}
            itemContent={index => <ListItem>Item {index}</ListItem>}
          />
        )}
      </List>
    </Content>
  );
};

export default Feed;
