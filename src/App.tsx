import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {

  const pages = [{
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



  return (
    <div className="App">
      <Header pages={pages} user={"مهمان"} />
      <Footer copyRightText={"تمامی حقوق مادی و معنوی محفوظ است - ۱۴۰۱"} pages={pages} contactUsLinks={contactLinks} />
    </div>
  );
}

export default App;
