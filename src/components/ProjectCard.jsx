/* eslint-disable react/prop-types */
// import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskHeader from "./TaskHeader";

export default function ProjectCard ( { bgPropsData } )
{
    // const [ sortDirection, setSortDirection ] = useState( 'asc' );
    // const { sortTasksByDate } = useTask();
    
    const taskCategoryKey = Object.keys( bgPropsData ).find( ( key ) => key !== "id" );
    const tasks = bgPropsData[ taskCategoryKey ] || [];

    const bgFunction = ( id ) =>
    {
        switch ( id )
        {
            case 1: return "bg-indigo-600";
            case 2: return "bg-yellow-600";
            case 3: return "bg-teal-600";
            case 4: return "bg-rose-600";
            default: return "bg-white";
        }
    };

    // const handleSort = () =>
    // {
    //     const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    //     setSortDirection( newDirection );
    //     sortTasksByDate( taskCategoryKey, newDirection );
    // };

    return (
        <div className={ `rounded-lg ${bgFunction( bgPropsData.id )} p-4` }>
            <TaskHeader  items={ tasks.length } title={ taskCategoryKey } />
            <div>
                { tasks.length > 0 ? (
                    tasks.map( ( task ) => (
                        <TaskCard categoryKey={ taskCategoryKey } task={ task } key={ task.id } />
                    ) )
                ) : (
                    <p className="text-yellow-500">No task remaining!</p>
                ) }
            </div>
        </div>
    );
};