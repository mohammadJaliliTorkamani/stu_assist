import styled from "@emotion/styled";
import HomeOptionBox from "../components/HomeOptionBox";

const HomeOptionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    min-height: 39rem;
`;

function Home() {
    return (
        <HomeOptionsContainer key={1}>
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
        </HomeOptionsContainer>
    )
}

export default Home
