import styled from "@emotion/styled"
import { createProfileUrl, createTopicUrl } from "../utils/Utils"
import './TopicItem.css'

interface TopicType {
    id: number,
    name: string,
    content: string,
    numberOfComments: number,
    numberOfViews: number,
    lastComment: {
        creatorID: number,
        creator: string,
        lastCommentDateEquivalent: string
    }
}

interface IProps {
    topic: TopicType,
    hallId: number
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
    direction: rtl;
`
const Column3 = styled.td`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

function TopicItem({ topic, hallId }: IProps) {
    return <Row>
        <Column1>
            <a className="topic-name" href={createTopicUrl(hallId, topic.id)}>{topic.name}</a>
        </Column1>
        <Column2 >{` ${topic.numberOfViews} بازدید / ${topic.numberOfComments} نظر`}</Column2>
        <Column3>
            <div className='column3'>
                {
                    topic.lastComment && <>
                        <a className='creator' href={createProfileUrl(topic.lastComment.creatorID)}>{topic.lastComment.creator}</a>
                        <div className="last-comment-date">{"( " + topic.lastComment.lastCommentDateEquivalent + " )"}</div>                    </>
                }
                {
                    !topic.lastComment &&
                    <>--</>
                }
            </div>
        </Column3>
    </Row>
}

export default TopicItem