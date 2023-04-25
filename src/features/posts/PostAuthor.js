import React from "react";
import { useSelector } from "react-redux";

export const PostAuthor = ({
    userId,
}) => {
    const author = useSelector(state => state.users.find(u => u.id === userId));

    return (
        <cite>by {author ? author.name : 'Unknown author'}</cite>
    );
};