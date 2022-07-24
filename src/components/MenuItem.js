import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { LINK_EMBASSIES } from "../utils/Constants";

import Dropdown from "./DropDown";
import './MenuItem.css'

const MenuItem = ({ items, depthLevel, onClick, externalLinks = false }) => {
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    if (items.title === 'سفارت ها') {
      axios
        .get(LINK_EMBASSIES)
        .then(response => items.submenu = response.data.data)
        .then(data => console.log(data))
        .catch(error => alert(JSON.stringify(error.response.data.message)))
    }
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  return (
    <div
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{" "}
            {depthLevel > 0 ? <span>*</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            externalLink={externalLinks}
            dropdown={dropdown}
          />
        </>
      ) : (
        externalLinks ? <a href={items.path} target="_blank" rel="noreferrer" onClick={e => onClick()}>{items.title}</a> :
          <Link to={items.path} onClick={e => onClick()}>{items.title}</Link>
      )}
    </div>
  );
};

export default React.memo(MenuItem);