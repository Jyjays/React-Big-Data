import styled from 'styled-components';

export const LoginPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;

  input {
    margin: 10px;
    padding: 10px;
    width: 250px;
    border: 2px solid;
    border-image-source: linear-gradient(to right, #4db6e5, #568aea);
    border-image-slice: 1;
    background: rgba(19, 25, 47, 0.8);
    color: white;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    font-size: 16px;
    box-shadow: 0 0 10px rgba(77, 182, 229, 0.4), 0 0 20px rgba(86, 138, 234, 0.4);
  }

  input:focus {
    outline: none;
    border-image-source: linear-gradient(to right, #56d9ea, #6a9dfb);
    box-shadow: 0 0 15px rgba(86, 217, 234, 0.6), 0 0 25px rgba(106, 157, 251, 0.6);
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 20px;
    width: 280px; /* Match input width */
  }
`;

export const RegisterPageStyle = styled(LoginPageStyle)``;

export const ButtonStyle = styled.button`
  margin: 20; /* Remove margin for proper alignment */
  padding: 10px 20px;
  width: 120px;
  background: linear-gradient(to right, #568aea, #4db6e5);
  border: none;
  border-radius: 15px; /* Rounded corners */
  color: white;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(to right, #4672c4, #3ca5d5);
    box-shadow: 0 0 15px rgba(86, 138, 234, 0.6);
  }

  &:not(:last-child) {
    margin-right: 10px; /* Space between buttons */
  }
`
