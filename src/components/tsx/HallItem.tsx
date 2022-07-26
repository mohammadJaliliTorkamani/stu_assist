import styled from '@emotion/styled'
import { createHallUrl, createTopicUrl } from '../../utils/Utils'
import '../css/HallItem.css'

interface IProps {
    hall: HallType
}

interface HallType {
    id: number,
    name: string,
    descriptor: string,
    numberOfTopics: number,
    lastTopic: {
        id: number,
        name: string,
        lastTopicDateEquivalent: string
    }
}

const Row = styled.tr`
`

const Column1 = styled.td`
    text-align: center;
    direction: rtl;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 30px;
    padding-left: 30px;
    `
const Column2 = styled.td`
    text-align: center;
    direction: ltr;
`
const Column3 = styled.td`
    
`

function HallItem({ hall }: IProps) {
    return (
        <Row>
            <Column1>
                <a className='hall-item-name' href={createHallUrl(hall.id)}>{hall.name}</a>
                <div className='hall-item-descriptor'>{hall.descriptor}</div>
            </Column1>
            <Column2 >{hall.numberOfTopics === 0 ? "--" : hall.numberOfTopics}</Column2>
            <Column3>
                <div className='hall-item-column3'>
                    {
                        hall.lastTopic.id !== -1 && <>
                            <a className='hall-item-last-topic-name' href={createTopicUrl(hall.id, hall.lastTopic.id)}>{hall.lastTopic.name}</a>
                            <div className="hall-item-last-post-date">{"( " + hall.lastTopic.lastTopicDateEquivalent + " )"}</div>
                        </>
                    }
                    {
                        hall.lastTopic.id === -1 &&
                        <>--</>
                    }
                </div>
            </Column3>
        </Row>
    )
}

export default HallItem