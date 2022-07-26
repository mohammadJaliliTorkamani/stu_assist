import HomeOptionBox from "../../components/tsx/HomeOptionBox";
import usePageTitle from "../../hooks/usePageTitle";
import '../css/Home.css'

const homeOptionsContainer = {
    background: '#f5f5f5',
    height: `calc(100vh - 160px)`
}

function Home() {
    usePageTitle('خانه')
    return (
        <div key={1} style={homeOptionsContainer} className="home-container ltr">
            <HomeOptionBox
                key={1}
                className="home-option"
                page={{
                    id: 1,
                    text: "محاسبه ECTS",
                    link: "ects-calculator"
                }} />
            <HomeOptionBox key={2}
                className="home-option"
                page={{
                    id: 2,
                    text: "محاسبه GPA",
                    link: "gpa-calculator"
                }} />

            <HomeOptionBox key={3}
                className="home-option"
                page={{
                    id: 3,
                    text: "لیست دارالترجمه های رسمی",
                    link: "translation-offices"
                }}
            />
            <HomeOptionBox key={4}
                className="home-option"
                page={{
                    id: 4,
                    text: "تالار گفتگو",
                    link: "forums"
                }}
            />
            <HomeOptionBox key={5}
                className="home-option"
                page={{
                    id: 5,
                    text: "تجربه پذیرش",
                    link: "application-experience"
                }}
            />
            <HomeOptionBox
                key={6}
                className="home-option"
                page={{
                    id: 6,
                    text: "درباره ما",
                    link: "about-us"
                }} />
        </div>
    )
}

export default Home
