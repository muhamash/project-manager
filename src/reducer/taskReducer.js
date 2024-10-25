export const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK': {
            const { category, task } = action.payload;
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [category]: [...(state.tasks[category] || []), task],
                },
                filteredTasks: {
                    ...state.filteredTasks,
                    [category]: [...(state.filteredTasks[category] || []), task],
                },
            };
        }

        case 'EDIT_TASK': {
            const { currentCategory, taskId, updatedTask } = action.payload;
            const { newCategory } = updatedTask;

            if ( newCategory && newCategory !== currentCategory )
            {
                // Move task to a new category
                const updatedOldCategory = ( state.tasks[ currentCategory ] || [] ).filter( task => task.id !== taskId );
                const updatedNewCategory = [
                    ...( state.tasks[ newCategory ] || [] ),
                    { ...updatedTask, id: Date.now() },
                ];

                return {
                    ...state,
                    tasks: {
                        ...state.tasks,
                        [ currentCategory ]: updatedOldCategory,
                        [ newCategory ]: updatedNewCategory,
                    },
                    filteredTasks: {
                        ...state.filteredTasks,
                        [ currentCategory ]: updatedOldCategory,
                        [ newCategory ]: updatedNewCategory,
                    },
                };
            } else
            {
                const updatedCategoryTasks = ( state.tasks[ currentCategory ] || [] ).map( task =>
                    task.id === taskId ? { ...task, ...updatedTask } : task
                );

                return {
                    ...state,
                    tasks: {
                        ...state.tasks,
                        [ currentCategory ]: updatedCategoryTasks,
                    },
                    filteredTasks: {
                        ...state.filteredTasks,
                        [ currentCategory ]: updatedCategoryTasks,
                    },
                };
            }
        };

        case 'SORT_BY_DATE': {
            const { category, direction } = action.payload;
            const sortedCategory = [ ...( state.tasks[ category ] || [] ) ].sort( ( a, b ) =>
            {
                const dateA = new Date( a.date );
                const dateB = new Date( b.date );
                return direction === 'asc' ? dateA - dateB : dateB - dateA;
            } );
            console.log( `Sorted ${category} tasks:`, sortedCategory ); 

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
        };



        case 'SEARCH_TASKS': {
            const { query } = action.payload;
            const filteredTasks = Object.fromEntries(
                Object.entries(state.tasks).map(([category, tasks]) => [
                    category,
                    (tasks || []).filter(task =>
                        Object.values(task).some(value =>
                            String(value).toLowerCase().includes(query.toLowerCase())
                        )
                    ),
                ])
            );

            return {
                ...state,
                filteredTasks,
                searchTerm: query,
            };
        }

        case 'DELETE_TASK': {
            const { category, taskId } = action.payload;
            const updatedCategory = (state.tasks[category] || []).filter(task => task.id !== taskId);

            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [category]: updatedCategory,
                },
                filteredTasks: {
                    ...state.filteredTasks,
                    [category]: updatedCategory,
                },
            };
        }

        default:
            return state;
    }
};