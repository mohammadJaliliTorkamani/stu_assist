import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ContactUs from './pages/ContactUs';
import ECTSCalculator from './pages/ECTSCalculator';
import GPACalculator from './pages/GPACalculator';
import Home from './pages/Home';
import Login from './pages/Login';
import { NotFound } from './pages/NotFound';
import Profile from './pages/Profile';
import TermsOfUse from './pages/TermsOfUse';

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

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='terms-of-use' element={<TermsOfUse />} />
        <Route path='profile' element={<Profile />} />
        <Route path='contact-us' element={<ContactUs />} />
        <Route path='login' element={<Login />} />
        <Route path='ects-calculator' element={<ECTSCalculator />} />
        <Route path='gpa-calculator' element={<GPACalculator />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
