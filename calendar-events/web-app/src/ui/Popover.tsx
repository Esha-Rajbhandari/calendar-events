import React from "react";

interface PopoverWrapperProps {
  children?: React.ReactNode;
}

const PopoverWrapper = React.forwardRef<HTMLInputElement, PopoverWrapperProps>(
  (props, ref) => {
    const { children } = props;

    if (!children) {
      return <></>;
    }

    return (
      <div className="absolute bottom-12" ref={ref}>
        {children}
      </div>
    );
  }
);

export default PopoverWrapper;
