import { Link } from "react-router-dom";

interface TextLink {
    id: number,
    text: string,
    link: string
}

interface IProps {
    page: TextLink
}

const containerStyle = {
    cursor: 'pointer',
    fontSize: '1.5rem',
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

function HomeOptionBox({ page }: IProps) {
    return (
        <Link to={page.link} style={containerStyle}>
            {page.text}
        </Link>
    )
}

export default HomeOptionBox