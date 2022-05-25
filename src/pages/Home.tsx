import HomeOptionBox from "../components/HomeOptionBox";

const homeOptionsContainer = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#f5f5f5',
    minHeight: '40rem'
}

function Home() {
    return (
        <div key={1} style={homeOptionsContainer}>
            <HomeOptionBox page={{
                id: 1,
                text: "محاسبه GPA",
                link: "gpa-calculator"
            }} />
            <HomeOptionBox key={2} page={{
                id: 2,
                text: "محاسبه ECTS",
                link: "ects-calculator"
            }} />
        </div>
    )
}

export default Home
