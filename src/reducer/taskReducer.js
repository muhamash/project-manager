export const taskReducer = ( state, action ) =>
{
    switch ( action.type )
    {
        case 'ADD_TASK': {
            const { category, task } = action.payload;
            const updatedCategory = [
                ...state.tasks.find( ( t ) => t[ category ] )[ category ],
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
            const updatedCategory = state.tasks
                .find( ( t ) => t[ category ] )[ category ]
                .map( ( task ) =>
                    task.id === taskId ? { ...task, ...updatedTask } : task
                );

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


        case 'SORT_BY_DATE': {
            const { category, direction } = action.payload;

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
                filteredTasks: sortedTasks( state.filteredTasks ),
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

            const filteredTasks = state.tasks
                .map( ( category ) =>
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
                } )
                .filter( ( category ) =>
                {
                    const categoryName = Object.keys( category ).find( ( key ) => key !== 'id' );
                    return category[ categoryName ].length > 0;
                } );

            const sortedFilteredTasks = filteredTasks.map( ( categoryObj ) =>
            {
                const categoryName = Object.keys( categoryObj ).find( ( key ) => key !== 'id' );
                if ( state.sortDirection )
                {
                    categoryObj[ categoryName ].sort( ( a, b ) =>
                        state.sortDirection === 'asc'
                            ? new Date( a.date ) - new Date( b.date )
                            : new Date( b.date ) - new Date( a.date )
                    );
                }
                return categoryObj;
            } );

            return {
                ...state,
                filteredTasks: sortedFilteredTasks,
                searchTerm: query,
            };
        };
            
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
        };
            

        default:
            return state;
    }
};