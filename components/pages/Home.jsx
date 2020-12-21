import { homeItems } from "../../data";
import PostCard from "../Card";
import Content from "../Content";

const Home = () => {
  return (
    <Content>
      {homeItems.map(i => (
        <PostCard {...i} />
      ))}
    </Content>
  )
}

export default Home;