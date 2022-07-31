import { useNavigate, useParams } from "react-router-dom"
import '../css/ForumsList.css'
import TopicItem from "../../components/tsx/TopicItem"
import { useLocalStorage } from "../../utils/useLocalStorage"
import useHall from "../../hooks/useHall"
import useTopic from "../../hooks/useTopic"
import usePageTitle from "../../hooks/usePageTitle"
import Button from "../../components/tsx/Button"

function ForumsList() {
    const [token,] = useLocalStorage('token', null)
    const { hallId } = useParams()
    const _hallId = typeof hallId == 'undefined' ? 0 : parseInt(hallId)
    const [hall] = useHall(_hallId)
    const [topics] = useTopic(_hallId)
    const navigate = useNavigate()

    usePageTitle('سالن گفتگو')

    return (
        <div className="forums-list-container1">
            <div className="forums-list-above-header">
                <div className="forums-list-hall-name-text">تالار {hall?.name} </div>
                {
                    token && <Button
                        title="ایجاد تاپیک جدید"
                        className="forums-list-new-topic"
                        onClick={e => navigate('/create-topic')}
                    />
                }
                {
                    !token && <div className="forums-list-login-container">
                        <div className="forums-list-login-label">
                            جهت ساخت تاپیک ابتدا وارد حساب کاربری خود شوید
                        </div>
                        <Button
                            className="forums-list-login-button"
                            title="ورود / ثبت نام"
                            onClick={e => navigate('/login', { replace: true })}
                        />
                    </div>
                }

            </div>
            <div className="forums-list-hall-descriptor-text">{hall?.descriptor}</div>
            <table className="forums-list-table">
                <tbody className="forums-list-table-body">
                    <tr className="forums-list-table-row">
                        <th className="forums-list-table-header">تاپیک</th>
                        <th className="forums-list-table-header"> تعداد بازدید ها / نظرات</th>
                        <th className="forums-list-table-header">آخرین پاسخ دهنده</th>
                    </tr>
                    {topics.map((topic, index) => <TopicItem key={topic.id} hallId={_hallId} topic={topic} even={index % 2 == 0} />)}
                </tbody>
            </table>
        </div>
    )
}

export default ForumsList