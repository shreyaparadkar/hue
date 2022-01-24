import React from "react";

const Tooltip = ({ children, tooltipText }) => {
  const tipRef = React.createRef(null);
  const handleMouseEnter = () => {
    tipRef.current.style.opacity = 1;
    tipRef.current.style.marginLeft = "20px";
  };
  const handleMouseLeave = () => {
    tipRef.current.style.opacity = 0;
    tipRef.current.style.marginLeft = "10px";
  };
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="hidden md:absolute text-sm whitespace-no-wrap dark:bg-gray-800 bg-gray-200 text-black 
        dark:text-white px-3 py-2 rounded md:flex items-center transition-all duration-150 w-fit"
        style={{ opacity: 0 }}
        ref={tipRef}
      >
        {tooltipText}
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
