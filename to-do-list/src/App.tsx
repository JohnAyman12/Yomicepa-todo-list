import Homepage from './Pages/HomePage';
import { TaskProvider } from './Context/TaskContext/TaskProvider';

export default function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <Homepage />
      </div>
    </TaskProvider>
  );
}