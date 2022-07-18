import axios from "axios"
import { useEffect, useState } from "react"
import { LINK_EXPERIENCES } from "../utils/Constants"
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

    return [experiences, loading, guest] as const
}

export default useExperience