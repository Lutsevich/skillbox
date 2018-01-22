import React from "react";
import ReactDOM from "react-dom";
import TodoItem from "./todo-item";

//React-компонент (class-based)
class TodoApp extends React.Component {
    constructor (){
        super();//конструктор из React.Component

        //исходное состояние приложения
        this.state = {
            todos: [
                {name : 'Настроить webpack', checked: true},
                {name : 'Запустить webpac-dev-server', checked: true},
                {name : 'Написать TodoApp', checked: false}
            ],
            newTodoText: ''
        }
    }

    toggleTodo(key) {
        console.log(key);
        const todos = this.state.todos.map((todo, i) => {
            if(key === i) {
                return {
                    name: todo.name,
                    checked: !todo.checked
                }
            }
            else {
                return todo;
            }
        });

        //есть у каждого реакт компонента, после его вызова обновляется state и рендерится с новыми данными
        this.setState({todos});//эквивалентно {tasks: tasks} 
    }

    addTodo (value) {
        const todos = this.state.todos;
        todos.push({
            name: this.state.newTodoText,
            checked: false
        });

        this.setState({ 
            todos, 
            newTodoText: ''
        });
    }

    render () {//вместо просто return
        console.log('render');
        //JSX-cинтаксис
        return (
            <div>
                <h2>Todo List</h2>

                <ol>
                    {
                        this.state.todos.map((todo,i) =>  {
                             /* const classN = todo.checked ? 'checked' : ''


                            //JSX -> React.createElement('...')
                            return (
                                <li 
                                    key={i} 
                                    className={classN}
                                    onClick={ev => {this.toggleTodo(i)}}
                                >
                                    {todo.name}
                                </li>
                            )*/
                            
                            return (
                                <TodoItem
                                    key={i}
                                    name={todo.name}
                                    checked={todo.checked}
                                    toggleTodo={this.toggleTodo.bind(this, i)} //!bind
                                />
                            )


                        })
                    }

                </ol>

                <input type="text"
                        placeholder="Новая задача"
                        value={this.state.newTodoText}
                        onChange={ev =>{
                            this.setState({ newTodoText: ev.target.value})
                        }}          
                        onKeyUp={ev => {
                            if (ev.keyCode === 13) {//Enter
                                this.addTodo();
                            }
                        }}
                />
                <div> {this.state.newTodoText} </div>
            </div>
        );
    }
}

ReactDOM.render(
    <TodoApp />,
    document.querySelector('#app')
);