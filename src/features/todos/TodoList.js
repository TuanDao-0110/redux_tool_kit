// add imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"
import { useGetTodosQuery, useAddToDoMutation, useDeleteTodoMutation, useUpdateToDoMutation } from '../api/apiSlice'
const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')
    // 1. destructed porperty from get
    const {
        // 1. data if we get it
        data: todos,
        // 2.  three situation when data loading
        isLoading,
        isSuccess,
        isError,
        // 3. error in case isError is true ==> that means no data found ==> no data ==> error shown
        error
    } = useGetTodosQuery()
    // 2. 

    const [addToDo] = useAddToDoMutation()
    const [updateToDo] = useUpdateToDoMutation()
    const [deleteTodo] = useDeleteTodoMutation()
    const handleSubmit = (e) => {
        e.preventDefault();
        addToDo({ userId: 1, title: newTodo, completed: false })
        setNewTodo('')
    }

    const newItemSection =
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>


    let content;
    // Define conditional content

    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = todos?.slice(todos.length - 10, todos.length).map((todo, index) => {
            return <article key={todo.id}>
                <div className="todo">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        id={todo.id}
                        onChange={() => updateToDo({ ...todo, completed: !todo.completed })}
                    />
                    <label htmlFor={todo.id}>{todo.title}</label>
                </div>
                <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </article>
        })
    } else if (isError) {
        content = <p>{error}</p>
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}
export default TodoList