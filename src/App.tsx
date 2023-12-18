
import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import AboutUs from './pages/tsx/AboutUs';
import ApplicationExperience from './pages/tsx/ApplicationExperience';
import ECTSCalculator from './pages/tsx/ECTSCalculator';
import GPACalculator from './pages/tsx/GPACalculator';
import Home from './pages/tsx/Home';
import Login from './pages/tsx/Login';
import NotFound from './pages/tsx/NotFound';
import OTP from './pages/tsx/OTP';
import PaymentResult from './pages/tsx/PaymentResult';
import Profile from './pages/tsx/Profile';
import TranslationOffice from './pages/tsx/TranslationOffice';
import Forums from './pages/tsx/Forums'
import ForumsList from './pages/tsx/ForumsList';
import GuestProfile from './pages/tsx/GuestProfile';
import Topic from './pages/tsx/Topic';
import CreateTopic from './pages/tsx/CreateTopic';
import Blogs from './pages/tsx/Blogs';
import BlogPost from './pages/tsx/BlogPost';
import { ProtectedRoute } from './components/tsx/ProtectedRoute';
import Header from './components/tsx/Header';
import Footer from './components/tsx/Footer';
import { AntiProtectedRoute } from './components/tsx/AntiProtectedRoute';
import Register from './pages/tsx/Register';
import Embassies from './pages/tsx/Embassies';

function App() {
  const [showHeaderFooter, setShowHeaderFooter] = useState(true)
  const { pathname } = useLocation()

  useEffect(() => {
    setShowHeaderFooter(pathname !== "/login" && pathname !== "/otp-verification" && pathname !== "/register")
  }, [pathname])

  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path='login' element={<AntiProtectedRoute> <Login /></AntiProtectedRoute>} />
        <Route path='register' element={<AntiProtectedRoute> <Register /></AntiProtectedRoute>} />
        <Route path='/' element={<Home />} />
        <Route path='profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='profile/:profileId' element={<GuestProfile />} />
        <Route path='about-us' element={<AboutUs />} />
        <Route path='otp-verification' element={<AntiProtectedRoute><OTP /></AntiProtectedRoute>} />
        <Route path='ects-calculator' element={<ECTSCalculator />} />
        <Route path='gpa-calculator' element={<GPACalculator />} />
        <Route path='payment-result' element={<PaymentResult />} />
        <Route path='application-experience' element={<ApplicationExperience />} />
        <Route path='translation-offices' element={<TranslationOffice />} />
        <Route path='forums' element={<Forums />} />
        <Route path="forums/:hallId" element={<ForumsList />} />
        <Route path="forums/:hallId/:topicId" element={<Topic />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:postId" element={<BlogPost />} />
        <Route path="embassies" element={<Embassies />} />
        <Route path="create-topic" element={
          <ProtectedRoute>
            <CreateTopic />
          </ProtectedRoute>
        } />
        <Route path='*' element={<NotFound />} />

      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  )
}
//
export default App;