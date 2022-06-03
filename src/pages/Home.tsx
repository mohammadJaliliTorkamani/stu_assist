import { useEffect, useState } from "react";
import HomeOptionBox from "../components/HomeOptionBox";

const homeOptionsContainer = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#f5f5f5',
    minHeight: '39rem'
}

function Home() {
    const [, setMouseOnOption] = useState(false)
    const [optionID, setOptionID] = useState(-1)

    useEffect(() => {
        document.title = "Stu Assist | خانه"
    }, [])

    return (
        <div key={1} style={homeOptionsContainer}>
            <HomeOptionBox
                key={1}
                onMouseEntered={e => {
                    setMouseOnOption(true)
                    setOptionID(1)
                }}
                onMouseLeave={e => {
                    setMouseOnOption(false)
                    setOptionID(-1)
                }}
                hovered={optionID === 1}
                page={{
                    id: 1,
                    text: "محاسبه GPA",
                    link: "gpa-calculator"
                }} />
            <HomeOptionBox key={2}
                onMouseEntered={e => {
                    setMouseOnOption(true)
                    setOptionID(2)
                }}
                onMouseLeave={e => {
                    setMouseOnOption(false)
                    setOptionID(-1)
                }}
                hovered={optionID === 2}
                page={{
                    id: 2,
                    text: "محاسبه ECTS",
                    link: "ects-calculator"
                }} />
        </div>
    )
}

export default Home
