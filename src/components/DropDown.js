
import MenuItem from "./MenuItem";
import './DropDown.css'
const Dropdown = ({ submenus, dropdown, depthLevel, onClick,externalLink }) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`} onClick={onClick}>
      {submenus.map((submenu, index) => (
        <MenuItem items={submenu} key={index} depthLevel={depthLevel} externalLinks = {externalLink} />
      ))}
    </ul>
  );
};

export default Dropdown;