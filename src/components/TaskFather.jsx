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
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <TopBar />
            <div className="mx-auto max-w-7xl p-6">
                <ProjectifyHeader />
                <div className="-mx-2 mb-6 flex flex-wrap">
                    {
                        tasks?.map( (t,index) => (
                            <Projectify bgPropsData={t} key={ index } />
                        ))
                    }
                    {
                        tasks?.length === 0 && (
                            <p className="text-rose-600 text-2xl font-semibold">Task List is empty!</p>
                        )
                    }
                </div>
            </div>
        </main>
    );
}
