// import React from 'react'

import useTask from "../context/useTask";
import Projectify from "./Projectify";
import ProjectifyHeader from "./ProjectifyHeader";
import TopBar from "./TopBar";

export default function TaskFather ()
{
    const { tasks } = useTask();
    // console.log( tasks );

    return (
        <main className="flex-1  overflow-y-auto w-full overflow-x-hidden">
            <TopBar />
            <div className="mx-auto max-w-7xl p-6">
                <ProjectifyHeader />
                <div className="-mx-2 mb-6 flex flex-wrap">
                    <Projectify bgPropsData={ "toDo" } tasks={ tasks.toDo } />
                    <Projectify bgPropsData={ "onProgress" } tasks={ tasks.onProgress } />
                    <Projectify bgPropsData={"done"} tasks={tasks.done} />
                    <Projectify bgPropsData={ "revise" } tasks={ tasks.revise } />
                </div>
            </div>
        </main>
    );
}
