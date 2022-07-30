import { Link } from "react-router-dom";
import "../css/HomeOptionBox.css";

interface TextLink {
    id: number,
    text: string,
    link: string
}

interface IProps {
    page: TextLink,
    className?: string

}

function HomeOptionBox({ page }: IProps) {
    return (
        <Link to={page.link} className={"homeoptionbox-container"} >
            {page.text}
        </Link >
    )
}

export default HomeOptionBox