export const taskReducer = ( state, action ) =>
{
    switch ( action.type )
    {
        case 'ADD_TASK': {
            const { category, task } = action.payload;
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [ category ]: [ ...state.tasks[ category ], task ],
                },
                filteredTasks: {
                    ...state.filteredTasks,
                    [ category ]: [ ...state.filteredTasks[ category ], task ],
                },
            };
        }

        case 'EDIT_TASK': {
            const { category, taskId, updatedTask } = action.payload;
            const { newCategory } = updatedTask;

            if ( newCategory && newCategory !== category )
            {
                // Remove from old category and add to new category
                const updatedOldCategory = state.tasks[ category ].filter( task => task.id !== taskId );
                const updatedNewCategory = [
                    ...state.tasks[ newCategory ],
                    { ...updatedTask, id: taskId },
                ];

                return {
                    ...state,
                    tasks: {
                        ...state.tasks,
                        [ category ]: updatedOldCategory,
                        [ newCategory ]: updatedNewCategory,
                    },
                    filteredTasks: {
                        ...state.filteredTasks,
                        [ category ]: updatedOldCategory,
                        [ newCategory ]: updatedNewCategory,
                    },
                };
            } else
            {
                // Update task in the same category
                const updatedCategoryTasks = state.tasks[ category ].map( task =>
                    task.id === taskId ? { ...task, ...updatedTask } : task
                );

                return {
                    ...state,
                    tasks: {
                        ...state.tasks,
                        [ category ]: updatedCategoryTasks,
                    },
                    filteredTasks: {
                        ...state.filteredTasks,
                        [ category ]: updatedCategoryTasks,
                    },
                };
            }
        }

        case 'SORT_BY_DATE': {
            const { category, direction } = action.payload;
            const sortedCategory = [ ...state.tasks[ category ] ].sort( ( a, b ) =>
                direction === 'asc' ? new Date( a.date ) - new Date( b.date ) : new Date( b.date ) - new Date( a.date )
            );

            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [ category ]: sortedCategory,
                },
                filteredTasks: {
                    ...state.filteredTasks,
                    [ category ]: sortedCategory,
                },
            };
        }

        case 'SEARCH_TASKS': {
            const { query } = action.payload;
            const filteredTasks = Object.fromEntries(
                Object.entries( state.tasks ).map( ( [ category, tasks ] ) => [
                    category,
                    tasks.filter( task =>
                        Object.values( task ).some( value =>
                            String( value ).toLowerCase().includes( query.toLowerCase() )
                        )
                    ),
                ] )
            );

            return {
                ...state,
                filteredTasks,
                searchTerm: query,
            };
        }

        case 'DELETE_TASK': {
            const { category, taskId } = action.payload;
            const updatedCategory = state.tasks[ category ].filter( task => task.id !== taskId );

            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [ category ]: updatedCategory,
                },
                filteredTasks: {
                    ...state.filteredTasks,
                    [ category ]: updatedCategory,
                },
            };
        }

        default:
            return state;
    }
};