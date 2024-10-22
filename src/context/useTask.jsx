import { useContext } from 'react';
import { TaskContext } from '../context/TaskProvider.jsx';

export default function useTask() {
    return useContext(TaskContext);
};