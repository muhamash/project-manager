 
/* eslint-disable react/prop-types */
// import React from 'react';
import TaskCard from "./TaskCard";
import TaskHeader from "./TaskHeader";

export default function Projectify ( { bgPropsData, tasks } )
{
    const bgFunction = ( id ) =>
    {
        switch ( id )
        {
            case "toDo": return "bg-indigo-600";
            case "onProgress": return "bg-yellow-600";
            case "done": return "bg-teal-600";
            case "revise": return "bg-rose-600";
            default: return "bg-white";
        }
    };

    // console.log( bgPropsData, tasks );

    return (
        <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
            <div className={ `rounded-lg ${bgFunction( bgPropsData )} p-4` }>
            <TaskHeader  items={ tasks.length } title={ bgPropsData } />
            <div>
                { tasks?.length > 0 ? (
                    tasks?.map( ( task ) => (
                        <TaskCard categoryKey={ bgPropsData } task={ task } key={ task.id } />
                    ) )
                ) : (
                    <p className="text-white">Task list is empty!</p>
                ) }
            </div>
        </div>
        </div>
    );
}
