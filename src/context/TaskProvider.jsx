/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import taskData from '../db/database.js';
import { taskReducer } from '../reducer/taskReducer.js';

const initialState = {
    tasks: {
        toDo: taskData[ "toDo" ],
        onProgress: taskData[ "onProgress" ],
        done: taskData[ "done" ],
        revise: taskData[ "revise" ],
    },
    filteredTasks: {
        toDo: taskData[ "toDo" ],
        onProgress: taskData[ "onProgress" ],
        done: taskData[ "done" ],
        revise: taskData[ "revise" ],
    },
    searchTerm: {
        toDo: "",
        onProgress: "",
        done: "",
        revise: "",
    },
};

// console.log(taskData)

export const TaskContext = createContext();

export const TaskProvider = ( { children } ) =>
{
    const [ state, dispatch ] = useReducer( taskReducer, initialState );

    const tasksToDisplay = state.filteredTasks;

    const addTask = ( category, task ) =>
    {
        const newTask = { ...task, id: Date.now().toString() };
        dispatch( { type: 'ADD_TASK', payload: { category, task: newTask } } );
    };

    const editTask = ( currentCategory, taskId, updatedTask ) =>
    {
        const { category: newCategory, ...taskDetails } = updatedTask;
        dispatch( {
            type: 'EDIT_TASK',
            payload: {
                currentCategory,
                taskId,
                updatedTask: { ...taskDetails, newCategory: newCategory || currentCategory },
            },
        } );
    };


    const deleteTask = ( category, taskId ) =>
    {
        dispatch( { type: 'DELETE_TASK', payload: { category, taskId } } );
    };

    const sortTasksByDate = ( category, direction ) =>
    {
        dispatch( { type: 'SORT_BY_DATE', payload: { category, direction } } );
    };

    const filterTasks = ( query ) =>
    {
        dispatch( { type: 'SEARCH_TASKS', payload: { query } } );
    };

    return (
        <TaskContext.Provider
            value={ {
                tasks: tasksToDisplay,
                addTask,
                editTask,
                deleteTask,
                sortTasksByDate,
                filterTasks,
            } }
        >
            { children }
        </TaskContext.Provider>
    );
};