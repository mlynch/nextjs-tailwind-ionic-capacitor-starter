import { homeItems } from "../../data";
import PostCard from "../Card";
import Content from "../Content";

const Home = ({ selected }) => {
  return (
    <Content visible={selected}>
      {homeItems.map(i => (
        <PostCard {...i} />
      ))}
    </Content>
  )
}

export default Home;