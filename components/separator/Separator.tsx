import React from "react";

const Separator = ({title='Separator', className = '', titleClassName=''}) => {
  return (
    <div className={`separator-line  border-gray-300 dark:border-gray-600 border-t-2 relative my-10 max-w-[960px] mx-auto ${className}`}>
      <div className={`text-xs font-normal text-gray-400 leading-tight bg-gray-100 dark:bg-gray-600  px-3 py-1 rounded-full absolute left-[50%] top-[50%] transform-[translate(-50%,-50%)] ${titleClassName}`}>
        {title}
      </div>
    </div>
  );
};

export default Separator;
