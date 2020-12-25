import Store from '../../store';
import Card from '../ui/Card';
import Content from '../ui/Content';

import * as selectors from '../../store/selectors';

const HomeCard = ({ title, type, text, author, image }) => (
  <Card className="my-4">
    <div>
      <img className="rounded-t-xl h-32 w-full object-cover" src={image} />
    </div>
    <div className="px-4 py-4 mt-2 bg-white rounded-b-xl">
      <h4 className="font-bold py-0 text-s text-gray-400 uppercase">{type}</h4>
      <h2 className="font-bold text-2xl text-gray-800">{title}</h2>
      <p className="sm:text-sm text-s text-gray-500 mr-1 my-3">{text}</p>
    </div>
  </Card>
);

const Home = ({ selected }) => {
  const homeItems = Store.useState(selectors.getHomeItems);

  return (
    <Content visible={selected} className="p-4">
      {homeItems.map((i, index) => (
        <HomeCard {...i} key={index} />
      ))}
    </Content>
  );
};

export default Home;
