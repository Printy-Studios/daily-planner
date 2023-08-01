//Core
import { useReducer, useState } from 'react';
import { 
  RouterProvider, 
  createBrowserRouter 
} from 'react-router-dom'

//Types
import Settings from 'types/Settings';

//State
import { TaskGroupContext, TaskGroupDispatchContext } from 'state/TaskGroupContext';
import { TasksContext, TasksDispatchContext } from 'state/TasksContext';
import taskGroupReducer from 'state/taskGroupReducer';
import taskReducer from 'state/taskReducer';

//Pages
import SchedulePage from 'pages/SchedulePage';
import TaskGroupEditPage from 'pages/TaskGroupEditPage';
import TaskEditPage from 'pages/TaskEditPage';
import SettingsPage from 'pages/SettingsPage';

//Const
import sample from 'const/sample_data';
import defaults from 'const/defaults';
import SettingsContext from 'state/SettingsContext';


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
  const [settings, setSettings] = useState<Settings>(defaults.settings)

  const updateSettings = (updated_settings: Partial<Settings>) => {
    console.log('updated settings: ', updated_settings)
    const new_settings = {...settings}

    for (const key in updated_settings) {
      const keyTyped = key as keyof Settings
      new_settings[keyTyped] = updated_settings[keyTyped]!
    }

    console.log('setting new settings to: ', new_settings)
    setSettings(new_settings)
  }

  return (
    <div className='h-full'>
      <SettingsContext.Provider value={{ settings, updateSettings }}>
        <TasksContext.Provider value={tasks}>
          <TasksDispatchContext.Provider value={dispatchTasks}>
            <TaskGroupContext.Provider value={taskGroups} >
              <TaskGroupDispatchContext.Provider value={dispatchTaskGroups}>
                <RouterProvider router={router} />
              </TaskGroupDispatchContext.Provider>
            </TaskGroupContext.Provider>
          </TasksDispatchContext.Provider>
        </TasksContext.Provider>
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
