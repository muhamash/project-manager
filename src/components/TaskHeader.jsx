/* eslint-disable react/prop-types */
import { useState } from 'react';
import useTask from '../context/useTask';

export default function TaskHeader({ title, items }) {
  const [ sortDirection, setSortDirection ] = useState( 'asc' );
  const { sortTasksByDate } = useTask();

  const handleSort = () =>
  {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection( newDirection );
    sortTasksByDate( title, newDirection );
  };


  const catTitle = title === 'toDo' ? 'To-Do' :
    title === 'onProgress' ? 'On Progress' :
      title === 'done' ? 'Done' :
        title === 'revise' ? 'Revise' : '';

  return (
    <div className="mb-2 flex items-center justify-between">
      <h3 className="text-lg font-semibold">
        { catTitle } <span>({ items })</span>
      </h3>
      {/* sort icon */ }
      <svg
        onClick={ handleSort }
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-sort-descending cursor-pointer"
      >
        { sortDirection === 'asc' ? (
          <>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l9 0" />
            <path d="M4 12l7 0" />
            <path d="M4 18l7 0" />
            <path d="M15 15l3 -3l3 3" />
            <path d="M18 18l0 -12" />
          </>
        ) : (
          <>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l9 0" />
            <path d="M4 12l7 0" />
            <path d="M4 18l7 0" />
            <path d="M15 15l3 3l3 -3" /> 
            <path d="M18 6l0 12" />
          </>
        ) }
      </svg>
    </div>
  );
};
