export const taskReducer = ( state, action ) =>
{
    switch ( action.type )
    {
        case 'ADD_TASK': {
            const { category, task } = action.payload;
            const foundCategory = state.tasks.find( ( t ) => t[ category ] );

            if ( !foundCategory )
            {
                console.error( `Category ${category} not found.` );
                return state;
            }

            const updatedCategory = [
                ...foundCategory[ category ],
                task,
            ];

            return {
                ...state,
                tasks: state.tasks.map( ( t ) =>
                    t[ category ] ? { ...t, [ category ]: updatedCategory } : t
                ),
                filteredTasks: state.filteredTasks.map( ( t ) =>
                    t[ category ] ? { ...t, [ category ]: updatedCategory } : t
                ),
            };
        }

        case 'EDIT_TASK': {
            const { category, taskId, updatedTask } = action.payload;
            const { newCategory } = updatedTask;

            if ( newCategory && newCategory !== category )
            {
                const updatedOldCategory = state.tasks
                    .find( ( t ) => t[ category ] )[ category ]
                    .filter( ( task ) => task.id !== taskId );

                const updatedNewCategory = [
                    ...state.tasks.find( ( t ) => t[ newCategory ] )[ newCategory ],
                    { ...updatedTask, id: Date.now().toString() }
                ];

                return {
                    ...state,
                    tasks: state.tasks.map( ( t ) =>
                        t[ category ]
                            ? { ...t, [ category ]: updatedOldCategory }
                            : t[ newCategory ]
                                ? { ...t, [ newCategory ]: updatedNewCategory }
                                : t
                    ),
                    filteredTasks: state.filteredTasks.map( ( t ) =>
                        t[ category ]
                            ? { ...t, [ category ]: updatedOldCategory }
                            : t[ newCategory ]
                                ? { ...t, [ newCategory ]: updatedNewCategory }
                                : t
                    ),
                };
            } else
            {

                const updatedTasks = state.tasks.map( ( t ) =>
                {
                    if ( t[ category ] )
                    {
                        const updatedCategoryTasks = t[ category ].map( ( task ) =>
                            task.id === taskId ? { ...task, ...updatedTask } : task
                        );
                        return { ...t, [ category ]: updatedCategoryTasks };
                    }
                    return t;
                } );

                return { ...state, tasks: updatedTasks, filteredTasks: updatedTasks };
            }
        };

        case 'SORT_BY_DATE': {
            const { category, direction } = action.payload;
            const tasksToSort = state.filteredTasks.length > 0 ? state.filteredTasks : state.tasks;

            const sortedTasks = ( tasks ) =>
                tasks.map( ( categoryObj ) =>
                {
                    if ( categoryObj[ category ] )
                    {
                        const sortedCategory = [ ...categoryObj[ category ] ].sort( ( a, b ) =>
                            direction === 'asc'
                                ? new Date( a.date ) - new Date( b.date )
                                : new Date( b.date ) - new Date( a.date )
                        );

                        return { ...categoryObj, [ category ]: sortedCategory };
                    }
                    return categoryObj;
                } );

            return {
                ...state,
                tasks: sortedTasks( state.tasks ),
                filteredTasks: sortedTasks( tasksToSort ),
            };
        }

        case 'SEARCH_TASKS': {
            const { query } = action.payload;

            if ( !query )
            {
                return {
                    ...state,
                    filteredTasks: state.tasks,
                    searchTerm: query,
                };
            }

            const filteredTasks = state.tasks.map( ( category ) =>
            {
                const categoryName = Object.keys( category ).find( ( key ) => key !== 'id' );

                const filteredCategory = category[ categoryName ].filter( ( task ) =>
                    Object.values( task ).some( ( value ) =>
                        String( value ).toLowerCase().includes( query.toLowerCase() )
                    )
                );

                return {
                    id: category.id,
                    [ categoryName ]: filteredCategory,
                };
            } ).filter( ( category ) =>
            {
                const categoryName = Object.keys( category ).find( ( key ) => key !== 'id' );
                return category[ categoryName ].length > 0;
            } );

            return {
                ...state,
                filteredTasks,
                searchTerm: query,
            };
        }

        case 'DELETE_TASK': {
            const { category, taskId } = action.payload;

            // Find the category and filter out the task to be deleted
            const updatedCategory = state.tasks
                .find( ( t ) => t[ category ] )[ category ]
                .filter( ( task ) => task.id !== taskId );

            // Update both tasks and filteredTasks, taking into account the search term
            return {
                ...state,
                tasks: state.tasks.map( ( t ) =>
                    t[ category ] ? { ...t, [ category ]: updatedCategory } : t
                ),
                filteredTasks: state.searchTerm
                    ? state.filteredTasks.map( ( t ) =>
                        t[ category ] ? { ...t, [ category ]: updatedCategory } : t
                    )
                    : state.tasks.map( ( t ) =>
                        t[ category ] ? { ...t, [ category ]: updatedCategory } : t
                    ),
            };
        };

            // return {
            //     ...state,
            //     tasks: state.searchTerm ? state.tasks : updatedTasks,
            //     filteredTasks: updatedTasks,
            // };


        default:
            return state;
    }
};