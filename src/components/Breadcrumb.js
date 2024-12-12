import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ links }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {links.map((link, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${index === links.length - 1 ? "active" : ""}`}
            aria-current={index === links.length - 1 ? "page" : undefined}
          >
            {index === links.length - 1 ? (
              link.label
            ) : (
              <Link to={link.path}>{link.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
