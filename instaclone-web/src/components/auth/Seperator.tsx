import styled from "styled-components";

const SSeperator = styled.div`
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 2px;
    background-color: ${(p) => p.theme.borderColor};
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
    font-size: 12px;
    color: #8e8e8e;
  }
`;

const Seperator = () => {
  return (
    <SSeperator>
      <div></div>
      <span>OR</span>
      <div></div>
    </SSeperator>
  );
};

export default Seperator;
