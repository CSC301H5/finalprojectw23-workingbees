import React from "react";
import "./Style.css"

export default function SmallEntry({ name, children }) {
    return (
        <div class="nav">
            <h2>{name}</h2>
            {children}
        </div>
    )
}