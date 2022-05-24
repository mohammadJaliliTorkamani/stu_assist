import HomeOptionBox from "../components/HomeOptionBox";

const homeOptionsContainer = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#b6d6c2',
    minHeight: '40rem',
    backgroundImage: `url("https://via.placeholder.com/500")`,
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
