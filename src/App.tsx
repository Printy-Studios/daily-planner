//Core
import { useReducer } from 'react';
import { 
  RouterProvider, 
  createBrowserRouter 
} from 'react-router-dom'

//Types

//State
import { TaskGroupContext, TaskGroupDispatchContext } from 'state/TaskGroupContext';
import { TasksContext, TasksDispatchContext } from 'state/TasksContext';
import taskGroupReducer from 'state/taskGroupReducer';

//Pages
import SchedulePage from 'pages/SchedulePage';
import TaskGroupEditPage from 'pages/TaskGroupEditPage';
import TaskEditPage from 'pages/TaskEditPage';
import SettingsPage from 'pages/SettingsPage';

//Const
import sample from 'const/sample_data';
import taskReducer from 'state/taskReducer';


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
  },
  {
    path: '/settings',
    element: <SettingsPage />
  }
])

function App() {

  const [taskGroups, dispatchTaskGroups] = useReducer(taskGroupReducer, sample.task_groups)
  const [tasks, dispatchTasks] = useReducer(taskReducer, sample.tasks)

  return (
    <div className='h-full'>
      <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatchTasks}>
          <TaskGroupContext.Provider value={taskGroups} >
            <TaskGroupDispatchContext.Provider value={dispatchTaskGroups}>
              <RouterProvider router={router} />
            </TaskGroupDispatchContext.Provider>
          </TaskGroupContext.Provider>
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    </div>
  );
}

export default App;
