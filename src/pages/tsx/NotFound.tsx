import styled from "@emotion/styled"
import { useNavigate } from "react-router-dom";
import logo from '../../assets/sad_computer.png'
import Button from "../../components/tsx/Button";
import usePageTitle from "../../hooks/usePageTitle";

const Container = styled.div`
    background: #f2f2f2;
    height: calc(100vh - 160px);
    color: black;
    display: flex;
    font-size: 2.5rem;
    font-weight: 500;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    direction: rtl;
`

const Logo = styled.img`
    width: 8rem;
    height: 8rem;
    margin-bottom: 4rem;
`

export default function NotFound() {
    const navigate = useNavigate()
    usePageTitle('صفحه یافت نشد')

    return (
        <Container>
            <Logo src={logo} />
            صفحه مورد نظر یافت نشد!
            <br />
            <br />
            لطفا از صحت نشانی صفحه مورد نظر اطمینان حاصل نمایید.
            <br />
            <br />
            با تشکر
            <br />
            <br />
            <Button title="بازگشت به خانه" onClick={() => navigate('/')} />
        </Container >
    )
}