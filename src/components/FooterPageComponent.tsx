import { Link } from "react-router-dom";

interface IProps {
    page: FooterPageLink
}

interface FooterPageLink {
    text: string,
    link: string
}

const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    height: '0.06rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '0.7rem',
    paddingRight: '0.7rem',
    marginLeft: '0.15rem',
    marginRight: '0.15rem',
    border: '1px solid white',
    borderRadius: '3px',
    fontSize: '0.60rem',
    textDecoration: 'none',
    cursor: 'pointer',
    alignItems: 'center'
}

function FooterPageComponent(props: IProps) {
    return (
        <Link style={pageStyle}
            to={props.page.link === "/" ? "/" : ("/" + props.page.link)}>
            {props.page.text}
        </ Link >
    )
}

export default FooterPageComponent