export const taskReducer = ( state, action ) =>
{
    switch ( action.type )
    {
        case 'ADD_TASK': {
            const { category, task } = action.payload;
            const updatedCategory = [ ...state.tasks.find( t => t[ category ] )[ category ], task ];
            return {
                ...state,
                tasks: state.tasks.map( ( t ) =>
                    t[ category ] ? { ...t, [ category ]: updatedCategory } : t
                ),
            };
        }

        case 'UPDATE_TASK': {
            const { category, task } = action.payload;
            const updatedCategory = state.tasks
                .find( t => t[ category ] )[ category ]
                .map( ( t ) => ( t.id === task.id ? task : t ) );

            return {
                ...state,
                tasks: state.tasks.map( ( t ) =>
                    t[ category ] ? { ...t, [ category ]: updatedCategory } : t
                ),
            };
        }

        case 'DELETE_TASK': {
            const { category, taskId } = action.payload;
            const updatedCategory = state.tasks
                .find( t => t[ category ] )[ category ]
                .filter( ( t ) => t.id !== taskId );

            return {
                ...state,
                tasks: state.tasks.map( ( t ) =>
                    t[ category ] ? { ...t, [ category ]: updatedCategory } : t
                ),
            };
        }

        case 'SORT_BY_DATE': {
            const { category, direction } = action.payload;

            const updatedTasks = state.filteredTasks.map( ( categoryObj ) =>
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
                // console.log(state, state.filteredTasks)
                return categoryObj;
            } );


            console.log(updatedTasks)
            return {
                ...state,
                tasks: updatedTasks[category],
            };
        };


            
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

            const filteredTasks = state.tasks.map( category =>
            {
                const categoryName = Object.keys( category ).find( key => key !== 'id' );

                const filteredCategory = category[ categoryName ].filter( task =>
                    Object.values( task ).some( value =>
                        String( value ).toLowerCase().includes( query.toLowerCase() )
                    )
                );

                return {
                    id: category.id,
                    [ categoryName ]: filteredCategory,
                };
            } ).filter( category =>
            {
                const categoryName = Object.keys( category ).find( key => key !== 'id' );
                return category[ categoryName ].length > 0;
            } );

            return {
                ...state,
                filteredTasks,
                searchTerm: query,
            };
        };

            
        default:
            return state;
    }
};