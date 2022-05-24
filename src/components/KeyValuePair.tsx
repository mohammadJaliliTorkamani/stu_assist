import styled from "@emotion/styled"
import { Link } from "react-router-dom";

const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9rem',
    textDecoration: 'none',
    color: 'white',
    width: '15rem'
};

interface IProps {
    label: string,
    value: string,
    color?: string
}
function KeyValuePair({ label, value, color = "white" }: IProps) {
    return (
        <Link to={`mailto:${value}`} style={{ ...containerStyle, color: color }}>
            <div> {label} :</div>
            <div> {value}</div>
        </Link >
    )
}

export default KeyValuePair