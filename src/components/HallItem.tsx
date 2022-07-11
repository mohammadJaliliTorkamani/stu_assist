import styled from '@emotion/styled'
import './HallItem.css'

interface IProps {
    hall: HallType
}

interface HallType {
    name: {
        name: string,
        link: string
    },
    descriptor: string,
    numberOfTopics: number,
    lastPost: {
        name: string,
        link: string,
        lastPostDateEquivalent: string
    }
}

const Row = styled.tr`
    height: 35px;
`

const Column1 = styled.td`
    text-align: center;
    direction: rtl;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 20px;
    padding-left: 20px;
`
const Column2 = styled.td`
    text-align: center;
    direction: ltr;
`
const Column3 = styled.td`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

function HallItem({ hall }: IProps) {
    return <Row>
        <Column1>
            <a href={hall.name.link}>{hall.name.name}</a>
            <div>{hall.descriptor}</div>
        </Column1>
        <Column2 >{hall.numberOfTopics}</Column2>
        <Column3>
            <a href={hall.lastPost.link}>{hall.lastPost.name}</a>
            <div className="last-post-date">{hall.lastPost.lastPostDateEquivalent}</div>
        </Column3>
    </Row>
}

export default HallItem