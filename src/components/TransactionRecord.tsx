import styled from "@emotion/styled"

interface TranscationRecordType {
    id: number,
    issueTrackingNo: string,
    bank: string,
    cardNo: string,
    date: string,
    time: string
}

interface IProps {
    record: TranscationRecordType
}

const Row = styled.tr`
    height: 35px;
`;

const Column = styled.td`
    text-align: center;
    border: 1px solid gray;
    direction: ltr;
`;

function TransactionRecord({ record }: IProps) {
    return (
        <Row>
            <Column>{record.id}</Column>
            <Column>{record.bank}</Column>
            <Column>{record.cardNo}</Column>
            <Column>{record.issueTrackingNo}</Column>
            <Column>{record.date}</Column>
            <Column>{record.time}</Column>
        </Row>
    )
}

export default TransactionRecord