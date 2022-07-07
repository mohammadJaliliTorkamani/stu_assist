import { useEffect } from "react";
import HomeOptionBox from "../components/HomeOptionBox";
import './Home.css'

const homeOptionsContainer = {
    background: '#f5f5f5',
    height: `calc(100vh - 160px)`
}

function Home() {
    useEffect(() => {
        document.title = "Stu Assist | خانه"
    }, [])

    return (
        <div key={1} style={homeOptionsContainer} className="home-container ltr">
            <HomeOptionBox
                key={1}
                className="home-option"
                page={{
                    id: 1,
                    text: "محاسبه ای سی تی اس",
                    link: "ects-calculator"
                }} />
            <HomeOptionBox key={2}
                className="home-option"
                page={{
                    id: 2,
                    text: "محاسبه جی پی ای",
                    link: "gpa-calculator"
                }} />
            <HomeOptionBox
                key={3}
                className="home-option"
                page={{
                    id: 3,
                    text: "لیست دارالترجمه ها",
                    link: "translation-offices"
                }} />
            <HomeOptionBox key={4}
                className="home-option"
                page={{
                    id: 4,
                    text: "تجربه پذیرش",
                    link: "application-experience"
                }} />
        </div>
    )
}

export default Home
