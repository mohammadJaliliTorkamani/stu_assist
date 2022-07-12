import styled from "@emotion/styled"
import { createTopicUrl } from "../utils/Utils"

interface TopicType {
    id: number,
    name: string,
    descriptor: string,
    numberOfComments: number,
    lastComment: {
        id: number,
        name: string,
        lastCommentDateEquivalent: string
    }
}

interface IProps {
    topic: TopicType,
    hallId: string | undefined
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

function TopicItem({ topic, hallId }: IProps) {
    return <Row>
        <Column1>
            <a href={createTopicUrl(hallId, topic.id)}>{topic.name}</a>
        </Column1>
        <Column2 >{topic.numberOfComments}</Column2>
        <Column3>
            <div>{topic.lastComment.name}</div>
            <div className="last-post-date">{topic.lastComment.lastCommentDateEquivalent}</div>
        </Column3>
    </Row>
}

export default TopicItem