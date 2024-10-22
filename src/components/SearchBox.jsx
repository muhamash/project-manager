import { useState } from 'react';
import useTask from '../context/useTask';

export default function SearchBox() {
    const { filterTasks } = useTask();
    const [searchQuery, setSearchQuery] = useState('');

    const debounce = (func, delay) => {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const debouncedFilterTasks = debounce((query) => {
        filterTasks(query);
    }, 500);

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);
        debouncedFilterTasks(value);
    };

    return (
        <div className="mx-4 flex-1">
            <input
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={handleChange}
                className="w-full max-w-xl rounded-full bg-gray-700 px-4 py-2 text-white focus:outline-none"
            />
        </div>
    );
}
