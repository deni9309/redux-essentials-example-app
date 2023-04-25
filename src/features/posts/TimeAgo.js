import React from "react";
import { getDistanceToNow } from "../../utils/dateUtils";

export const TimeAgo = ({
    timestamp,
}) => {
   
    return (
        <span title={timestamp}>
            &nbsp; <i>{getDistanceToNow(timestamp)}</i>
        </span>
    );
};