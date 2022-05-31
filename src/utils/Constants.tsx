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

export const LINK_LOGIN = 'https://stu-assist.ir/api/authentication/login.php'
export const LINK_OTP = 'https://stu-assist.ir/api/authentication/otp_verification.php'
export const LINK_PROFILE = 'https://stu-assist.ir/api/user/profile.php'
export const LINK_CHARGE_OPTIONS = 'https://stu-assist.ir/api/payment/charge_options.php'
export const LINK_ECTS = "https://stu-assist.ir/api/services/ects_calculation.php"
export const LINK_GPA = "https://stu-assist.ir/api/services/gpa_calculation.php"
export const LINK_PAYMENT = "https://stu-assist.ir/api/payment/payment.php"
export const LINK_PAYMENT_RESULT = "https://stu-assist.ir/api/payment/payment_result.php"