import React from "react";
import ReactDOM from "react-dom";
import CommentItem from "./comment-item.js";

class CommentsApp extends React.Component {
    constructor (){
        super();

        if (localStorage.comments) {
            const comments = JSON.parse(localStorage.comments);
            this.state = {
                comments,
                newAuthor: '', 
                newDateTime: '', 
                newText: ''
            };
        } else {
            this.state = {
                comments: [
                    {author: 'Valery', dateTime: 1516648073108, text : 'initial test comments'},
                    {author: 'Sergey', dateTime: 1516648075308, text : 'initial test comment2'},
                    {author: 'Alex', dateTime: 1516648079708, text : 'initial test comment3'}
                ],
                newAuthor: '', 
                newDateTime: '', 
                newText: ''
            }
        }
    }

    addComment () {
        if (this.state.newAuthor !=='' && this.state.newText!==''){
            const comments = this.state.comments;
            const now = new Date();
            comments.push({
                author: this.state.newAuthor,
                dateTime: now.getTime(),
                text: this.state.newText
            });
    
            this.setState({ 
                comments, 
                newAuthor: '',
                newDateTime: '', 
                newText: ''
            });

            localStorage.comments = JSON.stringify(this.state.comments);
        } else {
            alert('Заполните все поля');
        }
    }

    delComment(i) {
        const comments = this.state.comments;
        comments.splice(i, 1);

        this.setState({ 
            comments
        });

        localStorage.comments = JSON.stringify(this.state.comments);
    }

    render () {
        return (
            <div>
                <h2>Comments</h2>
                <div>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </div>
                <ul>
                    {
                        this.state.comments.map((comment,i) =>  {
                            return (
                                <CommentItem
                                    key={i}
                                    author={comment.author}
                                    dateTime={comment.dateTime}
                                    delComment={this.delComment.bind(this, i)}
                                />
                            )
                        })
                    }
                </ul>
                <div>
                    <label>
                        Автор:<br/>
                        <input type="text"
                               value={this.state.newAuthor}
                               onChange={ev =>{
                                  this.setState({ newAuthor: ev.target.value})
                               }}
                        />
                    </label>
                    <br/>
                    <label>
                        Комментарий:<br/>
                        <textarea rows="4" cols="50"
                            onChange={ev =>{
                                this.setState({ newText: ev.target.value})
                            }}
                            value={this.state.newText}
                        ></textarea>
                    </label>
                    <br/>
                    <button
                        onClick={ev => {
                            this.addComment();
                        }}
                    >Добавить коммент</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <CommentsApp />,
    document.querySelector('#app')
);