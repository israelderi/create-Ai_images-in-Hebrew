import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import ImgCard from '../components/ImgCard';
import Form from '../components/Form';
import NavBar from '../components/NavBar';
import Create from './Create';
import { mobile } from "../responsive.js"
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  ${mobile({ marginRight: '20px'})};
`;

const TitleDiv = styled.div`
`;

const Title = styled.h1`
  font-size: ${(props) => props.type === 's' ? '16px' : '35px'};
  color: ${(props) => props.type === 's' ? '#9d9d9d' : '#1888e3'};
  margin-top: ${(props) => props.type === 's' ? '2px' : ''};
  font-weight: 100;
`;

const RenderTitle = styled.h1`
  font-size:12px;
  color: #9d9d9d;
`;

const FromDiv = styled.div``;

const ImgesDiv = styled.div``;

const Cards = styled.div`
  display: grid;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 60px;
  ${mobile({ marginRight: '0'})};
`;

const Render = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((item) => <ImgCard key={item._id} {...item} />)
  } else {
    return <RenderTitle>{title}</RenderTitle>
  }
}

const Home = () => {

  const [posts, setPosts] = useState(null);
  const [search, setSearch] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [imgCreate, setImgCreate] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const result = await res.json();
        setPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    }
  };

  const getTranslate = () => {
    axios
      .get('https://libretranslate.de/languages', {
        headers: { accept: 'application/json' },
      })
      .then((res) => {
        console.log("The data has been received successfully");
        setImgCreate(true)
      }).catch((err) => {
        console.log("The data NOT has been received successfully");
        setImgCreate(false)
      })
  };

  useEffect(() => {
    getTranslate()
    fetchData();
  }, []);


  const searchChangeFn = (e) => {
    clearTimeout(searchTimeout);
    setSearch(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = posts.filter((item) => item.name.includes(search) || item.prompt.includes(search));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <>
      <NavBar setOpenCreate={setOpenCreate} openCreate={openCreate}/>
      <Container>
        <TitleDiv>
          <Title dir="rtl">תמונות שנוצרו ע''י בינה מלאכותית AI</Title>
          <Title dir="rtl" type='s'>עיין באוסף תמונות שנוצרו ע''י AI DALL-E.
            <br />באתר זה תוכל ליצור תמונות משלך, לפרסם אותם באתר, ולהוריד אותם לכל מכשיר.
            <br /><b style={{color:'#2171b3'}}> נוצר ע''י ישראל דרי  - Full Stack Developer .</b>
          </Title>
        </TitleDiv>
        <FromDiv>
          <Form
            type="text"
            name="text"
            placeholder="חפש תמונות לפי שם היוצר/ת.. 🔍 "
            value={search}
            handleChange={searchChangeFn}
            home
          />
        </FromDiv>
        <ImgesDiv>
          <Cards>
            {search ? (
              <Render
                data={searchedResults}
                title='No Search Results Found!'
              />
            ) : (
              <Render
                data={posts}
                title='No Posts Found!'
              />
            )}
          </Cards>
        </ImgesDiv>
      </Container>
      {openCreate && <Create setOpenCreate={setOpenCreate} openCreate={openCreate} imgCreate={imgCreate} />}
    </>
  )
}

export default Home
