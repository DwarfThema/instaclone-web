import styled from "styled-components";

const SFormNotification = styled.div`
  color: #3498db;
  margin-top: 10px;
`;

const FormNotification = ({ message }: any) => {
  return message === "" || !message ? null : (
    <SFormNotification> {message} </SFormNotification>
  );
};

export default FormNotification;
