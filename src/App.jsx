import './App.css';
import SideBar from './components/SideBar';
import TaskFather from './components/TaskFather';

function App() {

  return (
    <body className="bg-gray-900 text-white">
      <div className="flex h-screen">
        <SideBar />
        <TaskFather/>
      </div>
    </body>
  );
}

export default App