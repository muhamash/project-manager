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
            const isCategoryChanged = updatedTask.category && updatedTask.category !== category;

            if ( isCategoryChanged )
            {
                const originalCategory = category;
                const newCategory = updatedTask.category;

                // Remove task from original category
                const updatedTasks = state.tasks.map( ( catObj ) =>
                {
                    if ( catObj[ originalCategory ] )
                    {
                        const updatedCategoryTasks = catObj[ originalCategory ].filter( ( task ) => task.id !== taskId );
                        return { ...catObj, [ originalCategory ]: updatedCategoryTasks };
                    }
                    return catObj;
                } );

                // Check if new category exists
                const foundNewCategory = updatedTasks.find( ( catObj ) => catObj[ newCategory ] );

                if ( !foundNewCategory )
                {
                    console.error( `Category '${newCategory}' not found in state.` );
                    return state; // If the new category doesn't exist, return the original state
                }

                // Add the updated task to the new category
                const updatedNewCategory = updatedTasks.map( ( catObj ) =>
                {
                    if ( catObj[ newCategory ] )
                    {
                        return {
                            ...catObj,
                            [ newCategory ]: [ ...catObj[ newCategory ], { ...updatedTask, id: taskId } ]
                        };
                    }
                    return catObj;
                } );

                // Update the task state
                return {
                    ...state,
                    tasks: updatedNewCategory,
                    filteredTasks: updatedNewCategory,
                };
            } else
            {
                // No category change, just update the task in place
                const updatedTasks = state.tasks.map( ( catObj ) =>
                {
                    if ( catObj[ category ] )
                    {
                        const updatedCategoryTasks = catObj[ category ].map( ( task ) =>
                            task.id === taskId ? { ...task, ...updatedTask } : task
                        );
                        return { ...catObj, [ category ]: updatedCategoryTasks };
                    }
                    return catObj;
                } );

                return {
                    ...state,
                    tasks: updatedTasks,
                    filteredTasks: updatedTasks,
                };
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

            const updatedCategory = state.tasks
                .find( ( t ) => t[ category ] )[ category ]
                .filter( ( task ) => task.id !== taskId );

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

        default:
            return state;
    }
};