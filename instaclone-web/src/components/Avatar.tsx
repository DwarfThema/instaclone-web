import styled from "styled-components";

interface Fat {
  lg: boolean;
}

const SAvatar = styled.div<Fat>`
  width: ${(props) => (props.lg ? "30px" : "25px")};
  height: ${(props) => (props.lg ? "30px" : "25px")};
  border-radius: 50%;
  background-color: #2e2e2e;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
  align-items: center;
`;

const Avatar = ({ url = "", lg = false }) => {
  return <SAvatar lg={lg}>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
};

export default Avatar;
