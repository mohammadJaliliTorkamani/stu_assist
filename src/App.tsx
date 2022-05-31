
import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { AntiProtectedRoute } from './components/AntiProtectedRoute copy';
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
import { contactLinks, footerPages, headerPages } from './utils/Constants';
import { useLocalStorage } from './utils/useLocalStorage';

function App() {
  const [showHeaderFooter, setShowHeaderFooter] = useState(true)
  const { pathname } = useLocation()
  const [token,] = useLocalStorage('token', null)

  useEffect(() => {
    setShowHeaderFooter(pathname !== "/login" && pathname !== "/otp-verification")
  }, [pathname])

  return (
    <>
      {showHeaderFooter && <Header pages={headerPages} isUser={token !== null} />}
      <Routes>
        <Route path='login' element={<AntiProtectedRoute> <Login /></AntiProtectedRoute>} />
        <Route path='/' element={<Home />} />
        <Route path='terms-of-use' element={<TermsOfUse />} />
        <Route path='profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='contact-us' element={<ContactUs />} />
        <Route path='otp-verification' element={<AntiProtectedRoute><OTP /></AntiProtectedRoute>} />
        <Route path='ects-calculator' element={<ECTSCalculator />} />
        <Route path='gpa-calculator' element={<GPACalculator />} />
        <Route path='payment-result' element={<PaymentResult />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {showHeaderFooter && <Footer copyRightText={"تمامی حقوق مادی و معنوی محفوظ است - ۱۴۰۱"} pages={footerPages} contactUsLinks={contactLinks} />}
    </>
  )
}

export default App;
