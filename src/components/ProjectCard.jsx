// import React from 'react'

import ProjectHeader from "./TaskHeader";
import TaskCard from "./TaskCard";

export default function ProjectCard() {
    return (
        <div className="rounded-lg bg-indigo-600 p-4">
            <ProjectHeader />
            {/* render with map */}
            <TaskCard/>
        </div>
    );
}
