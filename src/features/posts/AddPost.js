import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// nanoId help to generate random id 
import { addNewPost, postAddded } from './postsSlice'
import { selectALlUser } from '../users/userSlice'
export default function AddPost() {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
    const dispatch = useDispatch()
    const users = useSelector(selectALlUser)
    const onSaveCliced = () => {
        if (canSave) {
            try {
                setAddRequestStatus('peding')
                dispatch(addNewPost({ title, body: content, userId })).unwrap()
                // unwrap () to return a promise ==> in trycatch
                // in case error ==> catch will ben run. 
                setTitle('')
                setContent("")
                setUserId('')
                setAddRequestStatus('idle')
            } catch (error) {
                console.log(error)
            } finally {
            }
        }
    }


    const userOptions = users?.map(user => {
        return <option key={user} value={user.id}>
            {user.name}
        </option>
    })
    return (
        <section>
            <h2>
                Add a new post
            </h2>
            <form>
                <label htmlFor='postTitle'>Post Title: </label>
                <input
                    type={'text'}
                    id='postTitle'
                    name='postTitle'
                    value={title}
                    onChange={onTitleChanged}
                ></input>
                <label htmlFor='content'>Post Content: </label>
                <textarea
                    type={'text'}
                    id='content'
                    name='content'
                    value={content}
                    onChange={onContentChanged}
                ></textarea>
                <label htmlFor='postAuthor' >Author:</label>
                <select id='postAuthor' value={userId} onChange={onAuthorChanged}>
                    {userOptions}
                </select>
                <button type='button' onClick={onSaveCliced} disabled={!canSave}>Save Button</button>
            </form>
        </section>
    )
}
