import { homeItems } from "../../data";
import Content from "../Content";

const Profile = ({ selected }) => {
  return (
    <Content visible={selected} className="p-4">
      <h2>Profile</h2>
    </Content>
  )
}

export default Profile;