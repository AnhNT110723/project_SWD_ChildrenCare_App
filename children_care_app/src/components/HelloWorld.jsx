import React from "react";
import { Button } from "antd"
;
const hello = () => {

    return (
        <div className="container">
            <a href="/detail">View Detail</a>
            <h2>Hello World!</h2>
            <Button type="primary">Save</Button>
        </div>
    )
};
export default hello;
