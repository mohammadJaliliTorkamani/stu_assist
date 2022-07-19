import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TitledTextInput from '../components/TitledTextInput';
import './ApplicationExperience.css'
import avatar from '../assets/user_avatar.png'
import useExperience from '../hooks/useExperience';
import usePageTitle from '../hooks/usePageTitle';

const SelectedTitle = styled.div`
    font-size: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
`

function ApplicationExperience() {
    const [sent, setSent] = useState(false);
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [universityName, setUniversityName] = useState('')
    const [admissionStatus, setAdmissionStatus] = useState(false)
    const [comment, setComment] = useState('')
    const [experiences, loading, guest, postExperience] = useExperience()
 
    const navigate = useNavigate()
    usePageTitle('تجربه پذیرش')

    const handlePost = () => {
        if (universityName === '' || city === '' || country === '') {
            alert('لطفا تمامی موارد را تکمیل بفرمایید')
            return
        }

        postExperience(
            JSON.stringify({ name: universityName, city: city, country: country }),
            JSON.stringify({ comment: comment }), admissionStatus ? 1 : 0, () => {
                setSent(true)
            })
    }

    return (
        <div className='application-experience-container1'>
            {sent && <div className='application-experience-sent-box'>
                <div className='application-experience-sent-text'>تجربه شما برای تایید به مدیریت ارسال شد و پس از تایید نمایش داده خواهد شد. با تشکر</div>
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
            {!sent && <div className='application-experience-post-box'>
                {guest && <div className='application-experience-login-box'>
                    <SelectedTitle>
                        جهت ثبت تجربه پذیرش خود، لطفا ابتدا وارد حساب کاربری خود شوید
                    </SelectedTitle>
                    <Button title="ورود / ثبت نام" onClick={e => navigate('/login', { replace: true })} />
                </div>
                }
                {!guest && <div className='application-experience-write-box'>
                    <div className='application-experience-university-info-write-box'>
                        <TitledTextInput title='کشور' value={country} setValue={setCountry} maxLength={40} className='application-experience-titled-text-input' />
                        <TitledTextInput title='شهر' value={city} setValue={setCity} maxLength={30} className='application-experience-titled-text-input' />
                        <TitledTextInput title='نام دانشگاه' value={universityName} setValue={setUniversityName} maxLength={100} className='application-experience-titled-text-input' />
                    </div>
                    <div className='application-experience-admission-status-write-box'>
                        <>از این دانشگاه پذیرش گرفته ام</>
                        <input type={'checkbox'} className='application-experience-checkbox-write-box' checked={admissionStatus} onChange={() => setAdmissionStatus(!admissionStatus)} />
                    </div>
                    <textarea placeholder='تجربه خود از این دانشگاه را در این قسمت وارد نمایید' maxLength={1000} className='application-experience-comment-write-box' onChange={e => setComment(e.target.value)} value={comment}></textarea>
                    <Button title='ارسال' onClick={e => handlePost()} />

                </div>
                }
                {loading && <div className='application-experience-loading-box'>
                    در حال بارگذاری...
                </div>
                }
                {!loading && <div className='application-experience-list-box'>
                    {
                        experiences.map(experience =>
                            <div key={experience.id} className='application-experience-post-item-container'>
                                <div className='application-experience-post-item-header'>
                                    <img className='application-experience-avatar-style' src={avatar} alt={"profile"} />
                                    <div className='application-experience-post-item-header-text-container'>
                                        <div className='application-experience-post-item-header-text-container-row'>
                                            <div className='application-experience-post-item-label-key'>نام و نام خانوادگی : </div>
                                            <div>{experience.fullName === ' ' ? 'بدون نام' : experience.fullName}</div>
                                        </div>
                                        <div className='application-experience-post-item-header-text-container-row'>
                                            <div className='application-experience-post-item-label-key'>تاریخ ارسال : </div>
                                            <div>{experience.experienceTime + " " + experience.experienceDate}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='application-experience-post-item-body'>
                                    <div className='application-experience-post-item-body-row ltr'>
                                        <div className='application-experience-post-item-body-row-key-value-container'>
                                            <div className={experience.admissionStatus ? 'application-experience-post-item-body-row-admission-status-green' : 'application-experience-post-item-body-row-admission-status-red'}>
                                                <div>{experience.admissionStatus ? "از این دانشگاه پذیرش گرفته ام" : "از این دانشگاه پذیرش نگرفته ام"}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='application-experience-post-item-body-row'>
                                        <div className='application-experience-post-item-body-row-key-value-container'>
                                            <div className='application-experience-post-item-label-key'>کشور : </div>
                                            <div>{experience.universityCountry}</div>
                                        </div>
                                    </div>
                                    <div className='application-experience-post-item-body-row'>
                                        <div className='application-experience-post-item-body-row-key-value-container'>
                                            <div className='application-experience-post-item-label-key'>شهر : </div>
                                            <div>{experience.universityCity}</div>
                                        </div>
                                    </div>
                                    <div className='application-experience-post-item-body-row'>
                                        <div className='application-experience-post-item-body-row-key-value-container'>
                                            <div className='application-experience-post-item-label-key'>دانشگاه : </div>
                                            <div>{experience.universityName}</div>
                                        </div>
                                    </div>
                                    <div className='application-experience-post-item-body-row-comment'>
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

export default ApplicationExperience