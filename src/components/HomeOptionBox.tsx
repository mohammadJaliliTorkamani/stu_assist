import { Link } from "react-router-dom";

interface TextLink {
    id: number,
    text: string,
    link: string
}

interface IProps {
    page: TextLink,
    hovered: boolean,
    onMouseEntered: (e: React.MouseEvent<HTMLAnchorElement>) => void,
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => void,

}

const containerActiveStyle = {
    cursor: 'pointer',
    fontSize: '1.2em',
    background: '#11a841',
    color: 'white',
    border: '4px solid #0a3816',
    borderRadius: '1rem',
    height: '10rem',
    width: '30rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
}

const containerDeactiveStyle = {
    cursor: 'pointer',
    fontSize: '1.2em',
    background: 'white',
    color: '#0a3816',
    border: '4px solid #0a3816',
    borderRadius: '1rem',
    height: '10rem',
    width: '30rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
}

function HomeOptionBox({ page, hovered, onMouseEntered, onMouseLeave }: IProps) {
    return (
        <Link to={page.link} style={hovered ? containerActiveStyle : containerDeactiveStyle} onMouseEnter={e => onMouseEntered(e)} onMouseLeave={e => onMouseLeave(e)} >
            {page.text}
        </Link>
    )
}

export default HomeOptionBox