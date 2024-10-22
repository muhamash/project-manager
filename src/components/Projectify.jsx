/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react';

import ProjectCard from "./ProjectCard";

export default function Projectify({bgPropsData}) {
    return (
        <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
            <ProjectCard bgPropsData={ bgPropsData } />
        </div>
    );
}
