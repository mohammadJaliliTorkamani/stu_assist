import styled from "@emotion/styled"

const Container = styled.div`
    display: flex;
    flex-direction : column;
`;

const Banner = styled.img`
    height: 12rem;
`;

const Bar = styled.div`
    height: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #636363;
    padding-left: 2rem;
    padding-right: 2rem;    
`;

const Options = styled.div`
    display: flex;
    flex-direction : row;

`;

const Option = styled.a`
    text-decoration: none;
    color: white;
    padding-left : 2rem;
    padding-right : 2rem;

`;

const Welcome = styled.div`
    color: white;
`;

interface TextLink {
    id: number,
    text: string,
    link: string
}

interface IProps {
    pages: TextLink[],
    user: string
}

function Header({ pages, user }: IProps) {
    return (
        <Container>
            <Banner src={"https://media-exp1.licdn.com/dms/image/C4E1BAQG2_C1ED4fO5Q/company-background_10000/0/1603996374180?e=2147483647&v=beta&t=nM8t7Skn0vzx2YqKzrTzsQbO2cMSruKqbwcJZAzYLWw"} />
            <Bar>
                <Options>{pages.map(page => <Option key={page.id} href={page.link}>{page.text}</Option>)}</Options>
                <Welcome>{`${user} عزیز خوش آمدید!`}</Welcome>
            </Bar>
        </Container>
    )
}

export default Header