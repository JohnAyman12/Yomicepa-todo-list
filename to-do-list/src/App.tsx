import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/HomePage';
import TaskPage from './Pages/TaskPage'
import NotFoundPage from './Pages/NotFoundPage';
import { TaskProvider } from './Context/TaskContext/TaskProvider';
import { ThemeProvider } from './Context/ThemeContext/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="app-container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/task/:id" element={<TaskPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}