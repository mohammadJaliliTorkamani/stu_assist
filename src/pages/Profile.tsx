import styled from "@emotion/styled"
import InfoRecord from "../components/InfoRecord";

const RightBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items:center;
    flex: 3;
    margin-left: 1rem;
    border: 2px solid red;
    border-radius: 2rem; 
    padding: 2rem;
`;

const LeftBox = styled.div`
    flex: 2;
    border: 2px solid blue;
    border-radius: 2rem;
    padding: 2rem;
`;

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-self: flex-start;
    height: 10rem;
`;

const ChargeBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    padding-left: 3rem;
    padding-right: 3rem;
    min-height: 30rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
`;

const PayButton = styled.button`
    color: white;
    background: orange;
    border-radius: 4px;
    border: 0px solid orange;
    width: 14rem;
    height: 3rem;
    margin-top: 1rem;
    font-size : 0.94rem;
    cursor: pointer;
`;

const ChargeOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

const ChargeOptionRecord = styled.div`
    color: black;
    cursor: pointer;
    diosplay: flex;
    flex-direction : row;
    justify-content: cetner;
    align-items: center;
    margin: 1rem;
    border: 1px solid orange;
    border-radius: 4px;
    padding: 1rem;
    font-size: 0.85rem;
`;

const chargeValue = [{ id: 1, value: 50, price: 50000 }, { id: 2, value: 200, price: 100000 }, { id: 3, value: 500, price: 250000 }, { id: 4, value: 1000, price: 500000 }]

function Profile() {
    return (
        <Content>
            <RightBox >
                <InfoBox >
                    <InfoRecord title={"نام و نام خانوادگی"} value={"محمد جلیلی ترکمانی"} />
                    <InfoRecord title={"تعداد درخواست باقی مانده"} value={"5 درخواست"} />
                </InfoBox>
                <ChargeBox>
                    <ChargeOptions>
                        {chargeValue.map(value => {
                            return <ChargeOptionRecord key={value.id}>{value.value} درخواست , {value.price} تومان</ChargeOptionRecord>
                        })}
                    </ChargeOptions>
                    <PayButton>پرداخت</PayButton>
                </ChargeBox>
            </RightBox>
            <LeftBox>Table To Show</LeftBox>
        </Content>
    )
}


export default Profile
