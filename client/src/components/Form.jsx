import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const Input = styled.input`
  margin-top: 10px;
  padding: 5px 0px;
  border:none;
  background-color: inherit;
  border-bottom: 1px solid gray;
  outline: none;
  width: 270px;
  max-width: 360px;
  margin-bottom: 10px;
  &:hover{
    border-bottom: 1px solid #0525a5;
  }
`;

const Form = ({ type, name, placeholder, value, handleChange, home}) => {
  return (
    <Container>
      <Input
        required
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        type={type}
        id={name}
        name={name}
        style={{color: home? 'white' : 'black'}}
      />
    </Container>
  )
}

export default Form
