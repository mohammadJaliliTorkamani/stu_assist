import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import ContactUs from './pages/ContactUs';
import ECTSCalculator from './pages/ECTSCalculator';
import GPACalculator from './pages/GPACalculator';
import Home from './pages/Home';
import Login from './pages/Login';
import { NotFound } from './pages/NotFound';
import OTP from './pages/OTP';
import Profile from './pages/Profile';
import TermsOfUse from './pages/TermsOfUse';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='terms-of-use' element={<TermsOfUse />} />
        <Route path='profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='contact-us' element={<ContactUs />} />
        <Route path='login' element={<Login />} />
        <Route path='otp' element={<OTP />} />
        <Route path='ects-calculator' element={<ECTSCalculator />} />
        <Route path='gpa-calculator' element={<GPACalculator />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
