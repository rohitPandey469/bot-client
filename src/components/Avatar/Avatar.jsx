import React from "react";

const Avatar = ({
  children,
  backgroundColor,
  px,
  py,
  color,
  borderRadius,
  fontSize,
  cursor,
}) => {
  return (
    <div
      style={{
        backgroundColor,
        padding: `${py} ${px}`,
        color: color || "black",
        borderRadius,
        fontSize,
        textAlign: "center",
        cursor: cursor || null,
        textDecoration: "none",
      }}
    >
      {children}
    </div>
  );
};

export default Avatar;
