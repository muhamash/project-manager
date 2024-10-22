import './App.css';
import SideBar from './components/SideBar';
import TaskFather from './components/TaskFather';
import { TaskProvider } from './context/TaskProvider';

function App() {

  return (
    <div className="bg-gray-900 text-white">
      <div className="flex h-screen">
        <TaskProvider>
          <SideBar />
          <TaskFather />
        </TaskProvider>
      </div>
    </div>
  );
}

export default App