//Core
import { useReducer, useState } from 'react';
import { 
  RouterProvider, 
  createBrowserRouter 
} from 'react-router-dom'

//Types

//State
import { TaskGroupContext, TaskGroupDispatchContext } from 'state/TaskGroupContext';
import { TasksContext } from 'state/TasksContext';
import taskGroupReducer from 'state/taskGroupReducer';

//Pages
import SchedulePage from 'pages/SchedulePage';
import TaskGroupEditPage from 'pages/TaskGroupEditPage';
import TaskEditPage from 'pages/TaskEditPage';

//Const
import sample from 'const/sample_data';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SchedulePage />
  },
  {
    path: '/task-group-edit',
    element: <TaskGroupEditPage />
  },
  {
    path: '/task-edit',
    element: <TaskEditPage />
  }
])

function App() {

  const [taskGroups, dispatchTaskGroups] = useReducer(taskGroupReducer, sample.task_groups)
  const [tasks, setTasks] = useState(sample.tasks)

  return (
    <div className='h-full'>
      <TasksContext.Provider value={tasks}>
        <TaskGroupContext.Provider value={taskGroups} >
          <TaskGroupDispatchContext.Provider value={dispatchTaskGroups}>
            <RouterProvider router={router} />
          </TaskGroupDispatchContext.Provider>
        </TaskGroupContext.Provider>
      </TasksContext.Provider>
    </div>
  );
}

export default App;
