import styled from "@emotion/styled"
import moment from 'jalali-moment'
import '../css/TransactionRecord.css'

interface TranscationRecordType {
    id: number,
    issueTrackingNo: string,
    orderID: number,
    cardNo: string,
    cost: number,
    date: string,
    time: string
}

interface IProps {
    record: TranscationRecordType,
    even: boolean
}


const Column = styled.td`
    text-align: center;
    direction: ltr;
    height: 35px;
`

function TransactionRecord({ record, even }: IProps) {
    return (
        <tr className={even ? "transaction-record-row-even" : "transction-record-row-odd"}>
            <Column>{record.id}</Column>
            <Column>{record.orderID}</Column>
            <Column style={{ direction: 'rtl' }}>{record.cost.toLocaleString() + " ریال"}</Column>
            <Column>{record.issueTrackingNo}</Column>
            <Column>{moment(record.date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</Column>
            <Column>{moment(record.time, 'hh/mm/ss').locale('fa').format('hh:mm:ss')}</Column>
        </tr>
    )
}

export default TransactionRecord