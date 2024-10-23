 /* eslint-disable react/prop-types */
import React from 'react';
import useTask from '../context/useTask';
import AddTask from "./AddTask";

export default function TaskCard ( { task, categoryKey } )
{
    // console.log( task, categoryKey );
    const [ isModalOpen, setIsModalOpen ] = React.useState( false );
    const { deleteTask} = useTask();

    // const handleCloseModal = () =>
    // {
    //     setIsModalOpen( false );
    // };
    
    // const handleEditClick = () =>
    // {
    //     setIsModalOpen( true );
    // };

    const colorFunction = ( id ) =>
    {
        switch ( id )
        {
            case "To-Do": return "text-indigo-600";
            case "On Progress": return "text-yellow-600";
            case "Done": return "text-teal-600";
            case "Revise": return "text-rose-600";
            default: return "text-white";
        }
    };

    const handleCloseModal = () =>
    {
        setIsModalOpen( false );
    };

    return (
        <>
            <div className="mb-4 rounded-lg bg-gray-800 p-4">
                <div className="flex justify-between">
                    <h4 className={ `mb-2 font-semibold ${colorFunction( categoryKey )}` }>
                        { task.title || "default title" }
                    </h4>
                    <div className="flex gap-2">
                        {/* delete */ }
                        <svg
                            onClick={ ()=>  deleteTask( categoryKey, task.id )}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 cursor-pointer text-zinc-300"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 7l16 0" />
                            <path d="M10 11l0 6" />
                            <path d="M14 11l0 6" />
                            <path
                                d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                            />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>

                        {/* edit */ }
                        <svg
                            onClick={ () =>
                            {
                                // editTask( task.id, categoryKey, task )
                                setIsModalOpen( true );
                            } }
                            className="h-4 w-4 cursor-pointer text-zinc-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            ></path>
                        </svg>
                    </div>
                </div>
                <p className="mb-2 text-sm text-zinc-200">
                    { task.description || "default textdfg" }
                </p>

                <p className="mt-6 text-xs text-zinc-400">
                    { new Date( task.date ).toLocaleDateString( 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' } ) }
                </p>
            </div>
            { isModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-5">
                <AddTask categoryKey={categoryKey} onClose={ handleCloseModal } task={ task } />
            </div> }
        </>
    );
}
