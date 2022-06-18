import styled from "@emotion/styled"

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
    record: TranslationOfficeTemplate
}

const Row = styled.tr`
    height: 35px;
`

const Column = styled.td`
    text-align: center;
    border: 1px solid gray;
    direction: ltr;
`

function TranslationOfficeRecord({ record }: IProps) {

    return (
        <Row>
            <Column>
                {record.id}
            </Column>
            <Column>
                {record.name}
            </Column>
            <Column>
                {record.languages.join("، ")}
            </Column>
            <Column>
                <a href={"tel:" + record.phoneNumber}>
                    {record.phoneNumber}
                </a>
            </Column>
            <Column>
                <a href={record.website}>
                    {record.website}
                </a>
            </Column>
            <Column>
                {record.address.name}
            </Column>
            <Column>
                <a target="_blank" href={"https://maps.google.com?q=" + record.address.latitude + "," + record.address.longitude} rel="noreferrer">
                    نمایش بر روی نقشه
                </a>
            </Column>
        </Row>
    )
}

export default TranslationOfficeRecord