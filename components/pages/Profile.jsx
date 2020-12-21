import { homeItems } from "../../data";
import Content from "../Content";

const Profile = ({ selected }) => {
  return (
    <Content visible={selected}>
      <h2>Profile</h2>
    </Content>
  )
}

export default Profile;