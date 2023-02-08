import styled from "styled-components";
import { BsFillCloudDownloadFill } from 'react-icons/bs';
import FileSaver from 'file-saver';
import { mobile } from "../responsive.js"

const Container = styled.div`
  position: relative;
  border-radius: 1rem;
  width:300px;
  height:300px;
  margin: 10px;
  box-shadow: rgba(146, 146, 146, 0.35) 10px 10px 15px;
  overflow: hidden;
  &:hover{
   ${(props) => props.ImgDetails}{
    display: block;
   }
  }
  ${mobile({ width: '350px', height: '300px'})};
`;
const Img = styled.img`
  height: 300px;;
  ${mobile({height: '350px'})};
`;
const ImgDetails = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #10131f86;
  display: flex;
  flex-direction: column;
  padding: 5px;
  display: none;
`;
const ImgPrompt = styled.p`
  color: white;
  font-size: 10px;
`;
const ImgDetailsdiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Namediv = styled.div`
  display: flex;
  gap: 10px;
  color: white;
  align-items: center;
  justify-content: center;
`;
const NameIcon = styled.div`
  padding: 3px 8px;
  border-radius: 50%;
  background-color: #000000;
  color: #ffffff;
  font-weight: bold;
  border: 0.5px solid #023bbf;
`;
const Icondownload = styled.div`
  padding-top: 3px;
  font-weight: 100;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  color: white;
  &:hover{
    color: #2065e4;
  }
`;

const ImgCard = ({ _id, name, prompt, photo }) => {

  const downloadImage = async (_id, photo) => {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
  }
  return (
    <Container ImgDetails={ImgDetails}>
      <Img src={photo} alt={prompt} />
      <ImgDetails>
        <ImgPrompt>{prompt}</ImgPrompt>
        <ImgDetailsdiv>
          <Namediv>
            <NameIcon>
              {name[0]}
            </NameIcon>
            {name}
          </Namediv>
          <Icondownload onClick={() => downloadImage(_id, photo)}>הורדת תמונה< BsFillCloudDownloadFill size={'14px'} color="#1a7af1" /></Icondownload>
        </ImgDetailsdiv>
      </ImgDetails>
    </Container>
  )
}

export default ImgCard
