import styled from "styled-components";
import LogoImg from '../images/logo.png';
import { mobile } from "../responsive.js"

const Container = styled.div`
    padding: 5px 0px;
    display: flex;
    background-color: #6a6a6a1d;
    justify-content: space-between;
    width: 100%;
    height:60px;
`;
const Logo = styled.img`
    margin-right: 50px;
    width: 160px;
    height:56px;
    cursor: pointer;
    ${mobile({ marginRight: '20px', width: '140px'})};
`;
const Button = styled.button`
    margin-top:20px;
    margin-left: 20px;
    width:140px;
    height: 30px;
    border: none;
    border-radius: 1rem;
    color: white;
    font-weight: bold;
    background-color: #0244a787;
    cursor: pointer;
    &:hover{
      background-color: #15253d87;
    }
`;

const NavBar = ({ setOpenCreate, openCreate }) => {

  return (
    <Container>
      <Logo onClick={() => window.location.reload()} src={LogoImg} />
      <Button onClick={() => setOpenCreate(!openCreate)}>צור תמונה משלך</Button> 
    </Container>
  )
}

export default NavBar
