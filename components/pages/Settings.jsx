import Content from '../ui/Content';

const Settings = ({ selected }) => {
  return (
    <Content visible={selected} className="p-4">
      <h2>Settings</h2>
    </Content>
  );
};

export default Settings;
