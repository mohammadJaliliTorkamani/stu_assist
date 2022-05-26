import axios from "axios"
import { useEffect, useState } from "react"

interface ChargeValue {
    id: number,
    value: number,
    price: number
}

function useChargeOptions() {
    const token = 'e8397ef9bb7935d06e542a5f1fb59c4e2dc105fd1ad0e3643a9547d3a48783d8'
    const [chargeValues, setChargeValues] = useState<ChargeValue[]>([])
    const [selectedChargeOption, setSelectedChargeOption] = useState<ChargeValue>({ id: -1, value: -1, price: -1 })

    useEffect(() => {
        axios
            .get('http://localhost:8000/stu_assist_backend/payment/charge_options.php', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(response => {
                return response.data
            })
            .then(data => data.error ? alert(data.message) : setChargeValues(data.data))
            .catch(error => {
                alert('error')
            })
    }, [])
    return [chargeValues, selectedChargeOption, setSelectedChargeOption] as const
}

export default useChargeOptions