 
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
            case "To-Do": return "bg-indigo-600";
            case "On Progress": return "bg-yellow-600";
            case "Done": return "bg-teal-600";
            case "Revise": return "bg-rose-600";
            default: return "bg-white";
        }
    };

    console.log( bgPropsData, tasks );

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
                    <p className="text-black">Empty Task List!!!!!</p>
                ) }
            </div>
        </div>
        </div>
    );
}
