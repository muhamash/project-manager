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
        };
            
        case 'EDIT_TASK': {
            const { category, taskId, updatedTask } = action.payload;

            console.log( `Attempting to edit task in category: ${category}` );

            // Create a variable to hold the original category of the task being edited
            let originalCategory = '';
    
            // Remove the task from its original category
            const updatedTasks = state.tasks.map( ( t ) =>
            {
                // Find the task in the current category
                const taskList = Object.values( t ).flat().find( ( task ) => task.id === taskId );
                if ( taskList )
                {
                    // Identify the original category of the task being edited
                    originalCategory = Object.keys( t ).find( ( key ) => t[ key ].some( ( task ) => task.id === taskId ) );
                }

                // If the original category is found, filter out the task from that category
                if ( originalCategory && t[ originalCategory ] )
                {
                    const filteredTasks = t[ originalCategory ].filter( task => task.id !== taskId );
                    return { ...t, [ originalCategory ]: filteredTasks };
                }

                return t; // Return the category unchanged if no task is found
            } );

            // Check if the new category exists
            const foundNewCategory = updatedTasks.find( ( t ) => t[ category ] );

            if ( !foundNewCategory )
            {
                console.error( `Category '${category}' not found in state.` );
                return state; // Return the original state if the new category doesn't exist
            }

            // Generate a new ID for the updated task (if needed)
            const newTaskId = Date.now(); // Use a better ID generation strategy as required

            // Add the updated task to the new category with the new ID
            const updatedCategoryTasks = [
                ...( foundNewCategory[ category ] || [] ),
                { ...updatedTask, id: newTaskId } // Assign the new ID for the updated task
            ];

            return {
                ...state,
                tasks: updatedTasks.map( ( t ) =>
                    t[ category ] ? { ...t, [ category ]: updatedCategoryTasks } : t
                ),
                filteredTasks: updatedTasks.map( ( t ) =>
                    t[ category ] ? { ...t, [ category ]: updatedCategoryTasks } : t
                ),
            };
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