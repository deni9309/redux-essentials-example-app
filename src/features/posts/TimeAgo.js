import React from "react";
import { getDistanceToNow } from "../../utils/dateUtils";

export const TimeAgo = ({
    timestamp,
}) => {
   
    return (
        <span title={timestamp}>
            &nbsp;<i className="semi-small-italic">{getDistanceToNow(timestamp)}</i>
        </span>
    );
};