import { useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  console.log(params);

  return <h1>profile</h1>;
};

export default Profile;
