import { homeItems } from '../../data';
import Card from '../ui/Card';
import Content from '../ui/Content';

const PostCard = ({ title, type, text, author, image }) => (
  <Card>
    <div>
      <img
        className="rounded-t-xl h-32 w-full object-cover"
        src={image || 'https://ionic-docs-demo.herokuapp.com/assets/card-top-img.png'}
      />
    </div>
    <div className="px-4 py-4 mt-2 bg-white rounded-b-xl">
      <h4 className="font-bold py-0 text-s text-gray-400 uppercase">{type}</h4>
      <h2 className="font-bold text-2xl text-gray-800">{title}</h2>
      <p className="sm:text-sm text-s text-gray-500 mr-1 my-3">{text}</p>
    </div>
  </Card>
);

const Home = ({ selected }) => {
  return (
    <Content visible={selected}>
      {homeItems.map((i, index) => (
        <PostCard {...i} key={index} />
      ))}
    </Content>
  );
};

export default Home;
