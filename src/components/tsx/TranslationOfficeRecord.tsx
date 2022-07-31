import styled from "@emotion/styled"
import '../css/TranslationOfficeRecord.css'

interface TranslationOfficeTemplate {
    id: number,
    name: string,
    languages: string[],
    address: {
        name: string,
        latitude: number,
        longitude: number
    },
    website: string,
    phoneNumber: string

}

interface IProps {
    record: TranslationOfficeTemplate,
    even: boolean
}

const Column = styled.td`
    text-align: center;
    direction: ltr;
    padding: 1rem 1rem;
`

function TranslationOfficeRecord({ record, even }: IProps) {
    return (
        <tr className={even ? "translation-office-row-even" : "translation-office-row-odd"
        }>
            <Column>
                {record.id}
            </Column>
            <Column>
                {record.name}
            </Column>
            {/* <Column>
                {record.languages.length > 0 ? record.languages.join("، ") : "وارد نشده است"}
            </Column> */}
            <Column>
                <a href={"tel:" + record.phoneNumber} style={{ color: 'green', textDecoration: 'none' }}>
                    {record.phoneNumber}
                </a>
            </Column>
            <Column>
                {(record.website === '' || record.website === null) && "--"}
                {record.website !== '' && record.website !== null && <a style={{ color: 'green', textDecoration: 'none' }} href={"https://" + record.website} target="_blank" rel="noreferrer" >
                    {record.website}
                </a>
                }
            </Column>
            <Column>
                {record.address.name}
            </Column>
            <Column>
                {(record.address.latitude == 0 && record.address.longitude == 0) ? "--" :
                    <a target="_blank" href={"https://maps.google.com?q=" + record.address.latitude + "," + record.address.longitude} rel="noreferrer" style={{ color: 'green', textDecoration: 'none' }}>
                        نمایش بر روی نقشه
                    </a>
                }
            </Column>
        </tr >
    )
}

export default TranslationOfficeRecord