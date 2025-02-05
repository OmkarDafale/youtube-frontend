import React from "react";

function Button({
    children,
    type = "button",
    bgColor = "blue",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            className={`${className} ${type} ${bgColor} ${textColor} duration-100 ease-in`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;