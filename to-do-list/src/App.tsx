import Homepage from './Pages/HomePage';
import { TaskProvider } from './Context/TaskContext/TaskProvider';
import { ThemeProvider } from './Context/ThemeContext/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="app-container">
          <Homepage />
        </div>
      </TaskProvider>
      </ThemeProvider>
  );
}