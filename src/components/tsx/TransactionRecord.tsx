import styled from "@emotion/styled"
import moment from 'jalali-moment'

interface TranscationRecordType {
    id: number,
    issueTrackingNo: string,
    orderID: number,
    cardNo: string,
    date: string,
    time: string
}

interface IProps {
    record: TranscationRecordType
}

const Row = styled.tr`
    height: 35px;
`

const Column = styled.td`
    text-align: center;
    border: 1px solid gray;
    direction: ltr;
`

function TransactionRecord({ record }: IProps) {
    return (
        <Row>
            <Column>{record.id}</Column>
            <Column>{record.orderID}</Column>
            <Column>{record.issueTrackingNo}</Column>
            <Column>{moment(record.date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</Column>
            <Column>{moment(record.time, 'hh/mm/ss').locale('fa').format('hh:mm:ss')}</Column>
        </Row>
    )
}

export default TransactionRecord