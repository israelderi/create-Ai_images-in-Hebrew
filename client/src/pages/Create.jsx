import styled from "styled-components";
import imgIcon from '../images/img-icon.png';
import { useEffect, useState } from "react";
import Form from "../components/Form";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import LoadingEffect from "../components/LoadingEffect";
import { mobile } from "../responsive.js"

const Container = styled.div`
  position: fixed;
  top: 10px;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: #0000009c;
  align-items: center;
  justify-content: center;
`;

const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 400px;
  background-color: #ffffff;
  position: relative;
  margin: 0 auto;
  margin-top: 70px;
  border-radius: 1rem;
  padding-right: 20px;
  padding-top: 0px;
  box-shadow: rgb(26, 63, 103) 0px 20px 30px -10px;
  ${mobile({ width: '80%', height:'645px'})};
`;

const TitleDiv = styled.div`
  margin-top: -5px;
`;

const Title = styled.h1`
  font-size: ${(props) => props.type === 's' ? '16px' : '35px'};
  color: ${(props) => props.type === 's' ? '#9d9d9d' : '#1888e3'};
  margin-top: ${(props) => props.type === 's' ? '-20px' : ''};
  font-weight: 100;
`;

const FormCon = styled.form`
  display: flex;
  gap: 20px;
  ${mobile({ flexDirection: 'column' })};
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const ImgDiv = styled.div`
  margin-left: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
`;

const Img = styled.img`
  margin-top: -10px;
  width: 250px;
  height: 200px;
  border-radius: 0.3rem;
  margin-bottom: 10px;
`;

const Icon = styled.p`
  margin-top: 10px;
  font-size: 90px;
  margin-right: 30px;
  margin-right: 70px;
  color: #000000;
`;

const Button = styled.button`
  color: white;
  background-color: ${(props) => props.type === 'submit' ? '#0244a787' : '#1c7c1c'};
  width: 120px;
  height: 30px;
  font-size: 12px;
  border-radius: 0.6rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  &:hover{
    background-color: #005d00;
  }
  :disabled {
    opacity: 0.4;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const LaodingDiv = styled.div`
  position: absolute;
  z-index: 20;
  top: -10px;
  width: 250px;
  height: 205px;
  background-color: #ffffffd2;
`;

const DivClose = styled.div`
 color: #7e3232;
 font-size: 24px;
 margin-top: 10px;
 width: 20px;
 height: 20px;
 cursor: pointer;
 z-index: 5;
 &:hover{
  color: #1c6f31;
 }
`;

const Text = styled.p`
  color: #2e2e2e;
  font-size: 12px;
  font-weight: 100;
`;
const LoadingP = styled.p`
  font-weight: 900;
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  margin-top: 0px;
  margin-bottom: 0px;
    background: linear-gradient(to right,#000000 10%, #d5d5d5 50%, #000000 90%);
    background-size: auto auto;
    background-clip: border-box;
    background-size: 200% auto;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textclip 3s linear infinite;
    @keyframes textclip {
  to {
    background-position: 200% center;
  }
}
`;

const ButtoLan = styled.button`
  width: 80px;
  border-radius: 0.5rem;
  background-color: ${(props)=> props.type === 'on' ? '#0b3b76': '#9cb8da'};
  color: white;
  border: none;
  height: 30px;
  cursor: pointer;
  cursor: ${(props)=> props.type === 'err'  && 'default'};

  &:hover{
    background-color: ${(props)=> props.type != 'err'  && '#5a90d2'};
  }
`;

const Create = ({ setOpenCreate, openCreate, imgCreate }) => {

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  });
  const [createImg, setCreateImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [loadingTranslate, setLoadingTranslate] = useState(false);
  const [createImgInHebrew, setcreateImgInHebrew] = useState(imgCreate);

  const translate = () => {
    const params = new URLSearchParams();
    params.append('q', inputValue);
    params.append('source', 'he');
    params.append('target', 'en');
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
      axios.post('https://libretranslate.de/translate',params, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(res=>{
        return setForm({ ...form, prompt: res.data.translatedText })
      })
  };

  const submitFn = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo && form.name) {
      setLoading(true);
      try {
        const res= await fetch('http://localhost:8080/api/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await res.json();
        setOpenCreate(!openCreate)
        window.location.reload();
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      if(form.name){
        alert('שגיאה ביצירת התמונה !');
      }else{
        alert('שדה השם הוא חובה!');
      }
    }
  };

  const changeFn = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const changeFn2 = (e) => {
    setInputValue(e.target.value);
  };
 
  const handleChangeTranslating = (e) => {
    clearTimeout(searchTimeout);
    setLoadingTranslate(true)
    setSearchTimeout(
      setTimeout(() => {
        console.log('Timeout start!')
        console.log(inputValue)
        translate()
        setLoadingTranslate(false)
      }, 10000),
    );
  };

  useEffect(() => {
    if(inputValue != ''){
      handleChangeTranslating()
    }
  }, [inputValue]);

  

  const createImgFn = async () => {
    if (form.prompt) {
      try {
        console.log(form)
        setCreateImg(true);
        const res = await fetch('http://localhost:8080/api/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });
        const data = await res.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setCreateImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  return (

    <Container>
      <ContainerForm>
        <DivClose onClick={() => setOpenCreate(!openCreate)}><AiOutlineCloseCircle /></DivClose>
        <TitleDiv>
          <Title>צור תמונה ע''י AI</Title>
          <Title type='s'>צור תמונה באמצעות DALL-E AI ושתף אותה עם הקהילה.</Title>
          <Buttons>
           { imgCreate ? (<ButtoLan 
            type={createImgInHebrew ? 'on' : 'off'}
            onClick={()=> setcreateImgInHebrew(true)}
            >
              עברית
            </ButtoLan>)
            : 
            <ButtoLan type="err" style={{ fontSize: '10px'}}>זמנית לא זמין בעברית</ButtoLan>
            }
            <ButtoLan
             type={createImgInHebrew ? 'off' : 'on'}
             onClick={()=> setcreateImgInHebrew(false)}
             >
              אנגלית
            </ButtoLan>
          </Buttons>
        </TitleDiv>
        <FormCon>
          <FormDiv>
            <Form
              type='text'
              name='name'
              placeholder='שם משתמש'
              value={form.name}
              handleChange={changeFn}
            />
            <Form
              type='text'
              name='prompt'
              placeholder='תן ל-AI ליצור את הדמיון שלך'
              handleChange={createImgInHebrew? changeFn2 : changeFn}
              value={createImgInHebrew? inputValue : form.prompt}
            />
            { createImgInHebrew ? (<Text>
              * מציג תוצאות חיפוש <b style={{color: '#0a5fc7'}}>בעברית</b> בלבד ! <br />
              * ניתן ללחוץ על כפתור צור תמונה לחיפוש חוזר.<br />
              * לאחר השיתוף באתר ניתן להוריד את התמונה.
            </Text>
            ): 
             <Text>
              * מציג תוצאות חיפוש <b style={{color: '#9e0404'}}>באנגלית</b> בלבד ! <br />
              * ניתן ללחוץ על כפתור צור תמונה לחיפוש חוזר.<br />
              * לאחר השיתוף באתר ניתן להוריד את התמונה.
            </Text>}
            {loadingTranslate && <LoadingP>מתרגם את הטקסט שלך ...</LoadingP>}
          </FormDiv>
          <ImgDiv>
            <Img src={form.photo ? form.photo : imgIcon} />
            {createImg && <LaodingDiv><LoadingEffect /></LaodingDiv>}
            <Buttons>
              <Button type="button" disabled={loadingTranslate ? true : false} onClick={createImgFn}>{createImg ? 'יוצר תמונה...' : 'צור תמונה'}</Button>
              <Button onClick={submitFn}>{loading ? 'משתף...' : 'שתף באתר'}</Button>
            </Buttons>
          </ImgDiv>
        </FormCon>
      </ContainerForm>
    </Container>
  )
}

export default Create
