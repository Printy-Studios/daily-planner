//Core
import { useEffect, useReducer, useState } from 'react';
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

//Router
const router = createBrowserRouter([
  {//Schedule page
    path: '/',
    element: <SchedulePage />
  },
  {//Task group edit page
    path: '/task-group-edit',
    element: <TaskGroupEditPage />
  },
  {//Task edit page
    path: '/task-edit',
    element: <TaskEditPage />
  },
  {//Settings page
    path: '/settings',
    element: <SettingsPage />
  }
])

/**
 * Main app component
 */
function App() {

  //State
  const [taskGroups, dispatchTaskGroups] = useReducer(taskGroupReducer, sample.task_groups)
  const [tasks, dispatchTasks] = useReducer(taskReducer, sample.tasks)
  const [settings, setSettings] = useState<Settings>(defaults.settings)

  /**
   * Update settings function. Pass any settings to modify, and only those
   * settings will be modified in the state
   * @param {Partial<Settings>} updated_settings Settings to update
   */
  const updateSettings = (updated_settings: Partial<Settings>) => {
    const new_settings = {...settings}

    //Update new settings state with those settings that were provided(but not
    //those that weren't provided)
    for (const key in updated_settings) {
      const keyTyped = key as keyof Settings
      new_settings[keyTyped] = updated_settings[keyTyped]!
    }

    setSettings(new_settings)
  }

  /**
   * On font_size setting change, update the base REM unit to the corresponding
   * font size.
   */
  useEffect(() => {
    const font_size_mappings = {
      S: '14px',
      M: '16px',
      L: '18px',
      XL: '20px'
    }

    //Update document root with new base font size
    document.documentElement.style.fontSize = font_size_mappings[settings.font_size]
  }, [settings.font_size])

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
