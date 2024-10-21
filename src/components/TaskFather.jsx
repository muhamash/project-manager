// import React from 'react'

import Projectify from "./Projectify";
import ProjectifyHeader from "./ProjectifyHeader";
import TopBar from "./TopBar";

export default function TaskFather() {
    return (
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <TopBar />
            <div className="mx-auto max-w-7xl p-6">
                <ProjectifyHeader />
                <div className="-mx-2 mb-6 flex flex-wrap">
                    {/* render with map */ }
                    <Projectify />
                </div>
            </div>
        </main>
    );
}
