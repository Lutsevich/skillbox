import React from "react";

//функциональный компонент, у него нет своего состояния!!!
//т.е. чистая функция - всегда возращает один и тот же рез, при одних и тех же параметрах
const TodoItem = (props) => {
    console.log(props)
    const classN = props.checked ? 'checked' : ''

    return (
        <li 
            className={classN}
            onClick={props.toggleTodo}
        >
            {props.name}
        </li>
    );
}

export default TodoItem;