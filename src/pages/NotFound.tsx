import styled from "@emotion/styled"

const Container = styled.div`
    background: #e0e0e0;
    height: 100vh;
    color: black;
    display: flex;
    font-size: 2.5rem;
    font-weight: 800;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
`;
export default function NotFound() {
    return (
        <Container>
            <>
                صفحه مورد نظر پیدا نشد!
            </>
            <br />
            <br />
            <>
                لطفا از صحت نشانی صفحه مورد نظر اطمینان حاصل نمایید.
            </>
            <br />
            <br />
            <>
                با تشکر
            </>

        </Container >
    )
}