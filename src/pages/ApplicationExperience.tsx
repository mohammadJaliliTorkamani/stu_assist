import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TitledTextInput from '../components/TitledTextInput';
import { LINK_EXPERIENCES, LINK_POST_APPLICATION_EXPERIENCE } from '../utils/Constants';
import { useLocalStorage } from '../utils/useLocalStorage';
import './ApplicationExperience.css'
import avatar from '../assets/user_avatar.png'

const SelectedTitle = styled.div`
    font-size: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
`

interface ApplicationExperienceTemplate {
    id: number,
    fullName: string,
    experienceDate: string,
    experienceTime: string,
    admissionStatus: boolean,
    comment: string,
    universityName: string,
    universityCountry: string,
    universityCity: string
}

function ApplicationExperience() {
    const [guest, setGuest] = useState(true);
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [universityName, setUniversityName] = useState('')
    const [admissionStatus, setAdmissionStatus] = useState(false)
    const [comment, setComment] = useState('')
    const [experiences, setExperiences] = useState<ApplicationExperienceTemplate[]>([])

    const [token,] = useLocalStorage('token', null)

    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Stu Assist | تجربه پذیرش "
    }, [])

    useEffect(() => {
        setGuest(token === null)
        setLoading(true)
        axios
            .get(LINK_EXPERIENCES, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .then(data => {
                setLoading(false)
                setExperiences(data.data)
            })
            .catch(error => {
                setLoading(false)
                alert(error.response.data.message)
            }
            )
    }, [token])

    const handlePost = () => {
        if (universityName === '' || city === '' || country === '') {
            alert('لطفا تمامی موارد را تکمیل بفرمایید')
            return
        }
        axios
            .post(LINK_POST_APPLICATION_EXPERIENCE,
                {
                    university: JSON.stringify({ name: universityName, city: city, country: country }),
                    experience: JSON.stringify({ comment: comment }),
                    admission_status: admissionStatus ? 1 : 0
                }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .then(response => setSent(true))
            .catch(error =>
                alert(JSON.stringify(error.response.data)))
    }

    return (
        <div className='container'>
            {sent && <div className='sent-box'>
                <div className='sent-text'>تجربه شما برای تایید به مدیریت ارسال شد و پس از تایید نمایش داده خواهد شد. با تشکر</div>
                <Button title='بازگشت به لیست' onClick={e => {
                    setComment('')
                    setCountry('')
                    setCity('')
                    setUniversityName('')
                    setAdmissionStatus(false)
                    setSent(false)
                }
                } />
            </div>
            }
            {!sent && <div className='post-box'>
                {guest && <div className='login-box'>
                    <SelectedTitle>
                        جهت ثبت تجربه پذیرش خود، لطفا ابتدا وارد حساب کاربری خود شوید
                    </SelectedTitle>
                    <Button title="ورود / ثبت نام" onClick={e => navigate('/login', { replace: true })} />
                </div>
                }
                {!guest && <div className='write-box'>
                    <div className='university-info-write-box'>
                        <TitledTextInput title='کشور' value={country} setValue={setCountry} maxLength={40} className='titled-text-input' />
                        <TitledTextInput title='شهر' value={city} setValue={setCity} maxLength={30} className='titled-text-input' />
                        <TitledTextInput title='نام دانشگاه' value={universityName} setValue={setUniversityName} maxLength={100} className='titled-text-input' />
                    </div>
                    <div className='admission-status-write-box'>
                        <>از این دانشگاه پذیرش گرفته ام</>
                        <input type={'checkbox'} className='checkbox-write-box' checked={admissionStatus} onChange={() => setAdmissionStatus(!admissionStatus)} />
                    </div>
                    <textarea placeholder='تجربه خود از این دانشگاه را در این قسمت وارد نمایید' maxLength={1000} className='comment-write-box' onChange={e => setComment(e.target.value)} value={comment}></textarea>
                    <Button title='ارسال' onClick={e => handlePost()} />

                </div>
                }
                {loading && <div className='loading-box'>
                    در حال بارگذاری...
                </div>
                }
                {!loading && <div className='list-box'>
                    {
                        experiences.map(experience =>
                            <div key={experience.id} className='post-item-container'>
                                <div className='post-item-header'>
                                    <img className='avatar-style' src={avatar} alt={"profile"} />
                                    <div className='post-item-header-text-container'>
                                        <div className='post-item-header-text-container-row'>
                                            <div className='post-item-label-key'>نام و نام خانوادگی : </div>
                                            <div>{experience.fullName === ' ' ? 'بدون نام' : experience.fullName}</div>
                                        </div>
                                        <div className='post-item-header-text-container-row'>
                                            <div className='post-item-label-key'>تاریخ ارسال : </div>
                                            <div>{experience.experienceTime + " " + experience.experienceDate}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='post-item-body'>
                                    <div className='post-item-body-row ltr'>
                                        <div className='post-item-body-row-key-value-container'>
                                            <div className={experience.admissionStatus ? 'post-item-body-row-admission-status-green' : 'post-item-body-row-admission-status-red'}>
                                                <div>{experience.admissionStatus ? "از این دانشگاه پذیرش گرفته ام" : "از این دانشگاه پذیرش نگرفته ام"}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='post-item-body-row'>
                                        <div className='post-item-body-row-key-value-container'>
                                            <div className='post-item-label-key'>کشور : </div>
                                            <div>{experience.universityCountry}</div>
                                        </div>
                                    </div>
                                    <div className='post-item-body-row'>
                                        <div className='post-item-body-row-key-value-container'>
                                            <div className='post-item-label-key'>شهر : </div>
                                            <div>{experience.universityCity}</div>
                                        </div>
                                    </div>
                                    <div className='post-item-body-row'>
                                        <div className='post-item-body-row-key-value-container'>
                                            <div className='post-item-label-key'>دانشگاه : </div>
                                            <div>{experience.universityName}</div>
                                        </div>
                                    </div>
                                    <div className='post-item-body-row-comment'>
                                        {experience.comment}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                }
            </div>
            }
        </div>
    )
}

export default ApplicationExperience;