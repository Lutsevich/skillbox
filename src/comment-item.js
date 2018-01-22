import React from "react";

function normalTime (date) {
    let now = new Date(date);

    let timeObject = Object.create(null);

    timeObject.dd = now.getDate();
    timeObject.mm = now.getMonth()+1;
    timeObject.yyyy = now.getFullYear();
    timeObject.h = now.getHours();
    timeObject.m = now.getMinutes();
    timeObject.s = now.getSeconds();

    Number.prototype.withZero = function() {
        var value = this.valueOf();
        if (value < 10) {
            value = "0" + value;
        }
        return value;
    };

    for ( let key in timeObject) {
        timeObject[key] = timeObject[key].withZero();
    }

    return timeObject.dd + '.' + timeObject.mm  + '.' + timeObject.yyyy + ' ' +
           timeObject.h + ':' + timeObject.m + ':' + timeObject.s;
}

const CommentItem = (props) => {

    return (
        <li className="comment">
            <div className="comment__author">{props.author}</div>
            <div className="comment__date-time">{normalTime(props.dateTime)}</div>
            <div className="comment__text">{props.text}</div>
            <button
                onClick={props.delComment}
            >
                del
            </button>
        </li>
    );
}

export default CommentItem;