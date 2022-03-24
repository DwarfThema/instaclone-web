import { useLocation, useNavigate } from "react-router-dom";
import { isLoggedInVar, logUserOut } from "../apollo";
import routes from "../routes";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome we did it</h1>
      <button
        onClick={() => (logUserOut(), navigate(routes.home, { replace: true }))}
      >
        Log out now!
      </button>
    </div>
  );
};

export default Home;
