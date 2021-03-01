//App.js
import {useSelector, useDispatch} from 'react-redux'
useEffect(()=>{
        dispatch({
            type:actionType.GET_ALL_TODO
        })
    }, [dispatch])

// Top.js
    const dispatch = useDispatch()

    const _handleKeyEvent = (e)=>{
        const lastTodoId = todos.length === 0 ? 0: todos[todos.length - 1].id
        if (13 === e.keyCode){
            const value = inputRef.current.value
            if (!value.trim()){
                alert('输入的内容不为空')
                return
            }
            const todo = {id:lastTodoId, title:value, finished:false}
            dispatch({
                type: actionType.ADD_ONE_TODO,
                payload: todo
            })
            inputRef.current.value = ''
        }
    }