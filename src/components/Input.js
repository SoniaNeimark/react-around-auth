import React from "react";

const Input = React.forwardRef((props, ref) => <input ref={ref} {...props} />);

export default Input;
