import React from 'react';
import { Query } from "react-apollo";

const Detail = ({
    match: {
        params: { name }
    }
}) => {
    console.log(name);
    return (<div>{name}</div>);
};

export default Detail;