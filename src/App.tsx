import './App.css';
import Footer from './components/Footer';

function App() {

  const pages = [{
    id: 3,
    text: "خانه",
    link: "www.google.com"
  }, {
    id: 2,
    text: "ضوابط استفاده",
    link: "www.google.com"
  }, {
    id: 1,
    text: "تماس با ما",
    link: "www.google.com"
  }]

  return (
    <div className="App">
      
      <Footer copyRightText={"تمامی حقوق مادی و معنوی محفوظ است - ۱۴۰۱"} pages={pages} />
    </div>
  );
}

export default App;
