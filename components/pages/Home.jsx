import { homeItems } from "../../data";
import PostCard from "../Card";

const Home = () => {
  return (
    <div class="py-32">
      {homeItems.map(i => (
        <PostCard {...i} />
      ))}
    </div>
  )
}

export default Home;