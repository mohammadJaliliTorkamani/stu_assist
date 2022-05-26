import axios from "axios"
import { useLocalStorage } from "./useLocalStorage"

export const headerPages = [{
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

export const footerPages = [{
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

export const contactLinks = [
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

export const OTP_LENGTH = 5
export const PHONE_LENGTH = 11

export const TOUContent = "این یک متن آزمایشی است"

export const LINK_LOGIN = 'http://localhost:8000/stu_assist_backend/authentication/login.php'
export const LINK_OTP = 'http://localhost:8000/stu_assist_backend/authentication/otp_verification.php'
export const LINK_PROFILE = 'http://localhost:8000/stu_assist_backend/user/profile.php'
export const LINK_CHARGE_OPTIONS = 'http://localhost:8000/stu_assist_backend/payment/charge_options.php'
export const LINK_ECTS = "http://localhost:8000/stu_assist_backend/services/ects_calculation.php"
export const LINK_GPA = "http://localhost:8000/stu_assist_backend/services/gpa_calculation.php"
