
import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { AntiProtectedRoute } from './components/AntiProtectedRoute copy';
import Footer from './components/Footer';
import Header from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import AboutUs from './pages/AboutUs';
import ECTSCalculator from './pages/ECTSCalculator';
import GPACalculator from './pages/GPACalculator';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import OTP from './pages/OTP';
import PaymentResult from './pages/PaymentResult';
import Profile from './pages/Profile';

function App() {
  const [showHeaderFooter, setShowHeaderFooter] = useState(true)
  const { pathname } = useLocation()

  useEffect(() => {
    setShowHeaderFooter(pathname !== "/login" && pathname !== "/otp-verification")
  }, [pathname])

  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path='login' element={<AntiProtectedRoute> <Login /></AntiProtectedRoute>} />
        <Route path='/' element={<Home />} />
        <Route path='profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='about-us' element={<AboutUs />} />
        <Route path='otp-verification' element={<AntiProtectedRoute><OTP /></AntiProtectedRoute>} />
        <Route path='ects-calculator' element={<ECTSCalculator />} />
        <Route path='gpa-calculator' element={<GPACalculator />} />
        <Route path='payment-result' element={<PaymentResult />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  )
}

export default App;