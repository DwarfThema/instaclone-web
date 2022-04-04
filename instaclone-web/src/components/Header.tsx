import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import {
  faCompass,
  faHomeAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import { Link } from "react-router-dom";
import routes from "../routes";
import useUser from "../hooks/useUser";
import Avatar from "./Avatar";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(p) => p.theme.borderColor};
  background-color: ${(p) => p.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

const Button = styled.span`
  background-color: ${(p) => p.theme.accent};
  border-radius: 4px;
  padding: 5px 15px;
  color: white;
  font-weight: 600;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Column>
          {isLoggedIn ? (
            <>
              <IconsContainer>
                <Icon>
                  <Link to={routes.home}>
                    <FontAwesomeIcon icon={faHomeAlt} size="lg" />
                  </Link>
                </Icon>
                <Icon>
                  <FontAwesomeIcon icon={faCompass} size="lg" />
                </Icon>
                <Icon>
                  <Link to={`/users/${data?.me?.userName}`}>
                    {data?.me?.avatar ? (
                      <Avatar url={data?.me?.avatar} />
                    ) : (
                      <FontAwesomeIcon icon={faUser} size="lg" />
                    )}
                  </Link>
                </Icon>
              </IconsContainer>
            </>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
};

export default Header;
