import styled from "@emotion/styled"
import { createProfileUrl, createTopicUrl } from "../../utils/Utils"
import '../css/TopicItem.css'

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
    hallId: number,
    even: boolean
}

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

function TopicItem({ topic, hallId, even }: IProps) {
    const getCreatorName = (name: string) => {
        const _name = name.replace(/ /g, '')
        return _name === '' ? "بی نام" : name
    }

    return <tr className={even ? 'topic-item-row-even' : 'topic-item-row-odd'}>
        <Column1>
            <a className="topic-item-topic-name" href={createTopicUrl(hallId, topic.id)}>{topic.name}</a>
        </Column1>
        <Column2 >{` ${topic.numberOfViews} بازدید / ${topic.numberOfComments} نظر`}</Column2>
        <Column3>
            <div className='topic-item-column3'>
                {
                    topic.lastComment.creatorID !== -1 && <>
                        <a className='topic-item-creator' href={createProfileUrl(topic.lastComment.creatorID)}>
                            {getCreatorName(topic.lastComment.creator)}</a>
                        <div className="topic-item-last-comment-date">{"( " + topic.lastComment.lastCommentDateEquivalent + " )"}</div>
                    </>
                }
                {
                    topic.lastComment.creatorID === -1 &&
                    <>--</>
                }
            </div>
        </Column3>
    </tr>
}

export default TopicItem