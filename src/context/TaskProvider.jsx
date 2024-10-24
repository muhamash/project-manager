/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import taskData from '../db/database.js';
import { taskReducer } from '../reducer/taskReducer.js';

// Initial state
const initialState = {
  tasks: taskData,
  searchTerm: '',
};

export const TaskContext = createContext();

export const TaskProvider = ( { children } ) =>
{
    const [ state, dispatch ] = useReducer( taskReducer, {
        ...initialState,
        filteredTasks: initialState.tasks,
    } );
    // const [ currentTask, setCurrentTask ] = useState( null );

    const tasksToDisplay = state.filteredTasks;

    const addTask = ( category, task ) =>
    {
        const newTask = { ...task, id: Date.now().toString() };
        dispatch( { type: 'ADD_TASK', payload: { category, task: newTask } } );
    };

    const editTask = ( taskId, updatedTask ) =>
    {
        const { category, ...taskDetails } = updatedTask;
        dispatch( {
            type: 'EDIT_TASK',
            payload: {
                category,
                taskId,
                updatedTask: { ...taskDetails, newCategory: category }
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
                // currentTask,
                // setCurrentTask,
            } }
        >
            { children }
        </TaskContext.Provider>
    );
};