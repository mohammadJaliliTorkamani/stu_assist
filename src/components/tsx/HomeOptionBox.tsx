import { Link } from "react-router-dom";
import "../css/Button.css";

interface TextLink {
    id: number,
    text: string,
    link: string
}

interface IProps {
    page: TextLink,
    className?: string

}

function HomeOptionBox({ page, className }: IProps) {
    return (
        <Link to={page.link} className={"btn " + className} >
            {page.text}
        </Link >
    )
}

export default HomeOptionBox