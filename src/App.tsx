import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import ContactUs from './pages/ContactUs';
import ECTSCalculator from './pages/ECTSCalculator';
import GPACalculator from './pages/GPACalculator';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import OTP from './pages/OTP';
import PaymentResult from './pages/PaymentResult';
import Profile from './pages/Profile';
import TermsOfUse from './pages/TermsOfUse';

const headerPages = [{
  id: 3,
  text: "خانه",
  link: "/"
}, {
  id: 2,
  text: "محاسبه GPA",
  link: "gpa-calculator"
}, {
  id: 1,
  text: "محاسبه ECTS",
  link: "ects-calculator"
}]

const footerPages = [{
  id: 1,
  text: "خانه",
  link: "/"
}, {
  id: 2,
  text: "محاسبه GPA",
  link: "gpa-calculator"
}, {
  id: 3,
  text: "محاسبه ECTS",
  link: "ects-calculator"
}, {
  id: 4,
  text: "ضوابط استفاده",
  link: "terms-of-use"
}, {
  id: 5,
  text: "تماس با ما",
  link: "contact-us"
}]

const contactLinks = [
  {
    id: 1,
    label: "مدیریت",
    value: "management@stu-assist.ir"
  }, {
    id: 2,
    label: "امور کاربران",
    value: "users@stu-assist.ir"
  }
]

function App() {
  const [showHeaderFooter, setShowHeaderFooter] = useState(true)
  const { pathname } = useLocation()

  useEffect(() => {
    setShowHeaderFooter(pathname !== "/login" && pathname !== "/otp-verification")
  }, [pathname])

  return (
    <>
      {showHeaderFooter && <Header pages={headerPages} user={"مهمان"} />}
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='terms-of-use' element={<TermsOfUse />} />
        <Route path='profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='contact-us' element={<ContactUs />} />
        <Route path='otp-verification' element={<OTP />} />
        <Route path='ects-calculator' element={<ECTSCalculator />} />
        <Route path='gpa-calculator' element={<GPACalculator />} />
        <Route path='payment-result' element={<PaymentResult isOK={true}/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {showHeaderFooter && <Footer copyRightText={"تمامی حقوق مادی و معنوی محفوظ است - ۱۴۰۱"} pages={footerPages} contactUsLinks={contactLinks} />}
    </>
  );
}

export default App;
