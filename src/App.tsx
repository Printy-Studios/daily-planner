import { useReducer, useState } from 'react';

import { 
  RouterProvider, 
  createBrowserRouter 
} from 'react-router-dom'

//Types

//State
import { TaskGroupContext, TaskGroupDispatchContext } from 'state/TaskGroupContext';
import taskGroupReducer from 'state/taskGroupReducer';

//Pages
import SchedulePage from 'pages/SchedulePage';
import TaskGroupEditPage from 'pages/TaskGroupEditPage';
import sample from 'const/sample_data';
import { TasksContext } from 'state/TasksContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SchedulePage />
  },
  {
    path: '/task-group-edit',
    element: <TaskGroupEditPage />
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
