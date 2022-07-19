import axios from "axios"
import { useEffect, useState } from "react"
import { LINK_EXPERIENCES, LINK_POST_APPLICATION_EXPERIENCE } from "../utils/Constants"
import { useLocalStorage } from "../utils/useLocalStorage"

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

function useExperience() {
    const [token,] = useLocalStorage('token', null)
    const [loading, setLoading] = useState(false)
    const [guest, setGuest] = useState(false)
    const [experiences, setExperiences] = useState<ApplicationExperienceTemplate[]>([])


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

    const postExperience = (university: string, experience: string, admission_status: number, onSuccess: () => void) => {
        axios
            .post(LINK_POST_APPLICATION_EXPERIENCE,
                {
                    university: university,
                    experience: experience,
                    admission_status: admission_status
                }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .then(response => onSuccess)
            .catch(error => alert(JSON.stringify(error.response.data)))
    }

    return [experiences, loading, guest, postExperience] as const
}

export default useExperience