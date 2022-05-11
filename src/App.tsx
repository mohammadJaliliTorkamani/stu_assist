import styled from '@emotion/styled';
import './App.css';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {

  const footerPages = [{
    id: 3,
    text: "خانه",
    link: "www.google.com"
  }, {
    id: 2,
    text: "ضوابط استفاده",
    link: "www.facebook.com"
  }, {
    id: 1,
    text: "تماس با ما",
    link: "www.space.com"
  }]

  const headerPages = [{
    id: 3,
    text: "خانه",
    link: "www.google.com"
  }, {
    id: 2,
    text: "محاسبه GPA",
    link: "www.facebook.com"
  }, {
    id: 1,
    text: "محاسبه ECTS",
    link: "www.space.com"
  }]

  const contactLinks = [
    {
      id: 1,
      label: "روابط عمومی",
      value: "info@stu-assist.ir"
    }, {
      id: 2,
      label: "ثبت بازخورد",
      value: "customer@stu-assist.ir"
    }
  ]

  const Container = styled.div`
    display: flex;
    flex-direction : column;
  `;



  return (
    <Container className="App">
      <Header pages={headerPages} user={"مهمان"} />
      <Content />
      <Footer copyRightText={"تمامی حقوق مادی و معنوی محفوظ است - ۱۴۰۱"} pages={footerPages} contactUsLinks={contactLinks} />
    </Container>
  );
}

export default App;
