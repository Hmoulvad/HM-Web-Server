import * as React from 'react';

interface IGrid {
    noPadding?: boolean;
    className?: string;
    children: any;
}

const LayoutContainer: React.FC<IGrid> = ({noPadding, className, children}) => {
  return (
      <div className={`layout ${className ? className : ""} ${noPadding ? "layout--no-padding" : ""}`}>
        {children}
      </div>
  )
};

export default LayoutContainer;