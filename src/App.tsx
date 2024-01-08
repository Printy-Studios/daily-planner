//Core
import { useEffect, useReducer } from 'react';
import { 
  RouterProvider, 
  createBrowserRouter 
} from 'react-router-dom'

//Types
import Settings, { ThemeOption } from 'types/Settings';

//State
import { TaskGroupContext, TaskGroupDispatchContext } from 'state/TaskGroupContext';
import { TasksContext, TasksDispatchContext } from 'state/TasksContext';
import taskGroupReducer from 'state/taskGroupReducer';
import taskReducer from 'state/taskReducer';
import MiscContext from 'state/MiscContext';
import MiscState from 'types/MiscState';
import SettingsContext from 'state/SettingsContext';

//Pages
import SchedulePage from 'pages/SchedulePage';
import TaskGroupEditPage from 'pages/TaskGroupEditPage';
import TaskEditPage from 'pages/TaskEditPage';
import SettingsPage from 'pages/SettingsPage';

//Functions
import useStorage from 'functions/useStorage';
import useUpdatableState from 'functions/useUpdatableState';

//Const
import defaults from 'const/defaults';
import constant, { themes } from 'const/constant';
import Theme from 'types/Theme';


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

  //Functions
  const { setStorageItem, getStorageItem } = useStorage()

  //State
  const [taskGroups, dispatchTaskGroups] = useReducer(taskGroupReducer, getStorageItem(constant.storage_key.task_groups) || [])
  const [tasks, dispatchTasks] = useReducer(taskReducer, getStorageItem(constant.storage_key.tasks) || [])
  const [settings, updateSettings] = useUpdatableState<Settings>(getStorageItem(constant.storage_key.settings) || defaults.settings)
  const [miscState, updateMiscState] = useUpdatableState<MiscState>({
    selectedDate: new Date()
  })

  //Methods
  const updateCSSVars = (themeOption: ThemeOption) => {
    const r: HTMLElement = document.querySelector(':root')!;

    function setStyleVar(name: string, value: string) {
      r.style.setProperty(name, value)
    }

    const new_theme: Theme = themes[themeOption]


    Object.keys(new_theme.color).forEach(key => {
      setStyleVar(`--${key}`, new_theme.color[key as keyof Theme['color']])
    })
  }

  //-- Update localstorage if data changes --//
  useEffect(() => {
    setStorageItem(constant.storage_key.task_groups, taskGroups)
  }, [taskGroups, setStorageItem])
  useEffect(() => {
    setStorageItem(constant.storage_key.tasks, tasks)
  }, [tasks, setStorageItem])
  useEffect(() => {
    setStorageItem(constant.storage_key.settings, settings)
  }, [settings, setStorageItem])

  // useEffect(() => {
  //   dispatchTaskGroups({
  //     type: 'set-all',
  //     data: getStorageItem(constant.storage_key.task_groups)
  //   })
  // }, [])

  // /**
  //  * Update settings function. Pass any settings to modify, and only those
  //  * settings will be modified in the state
  //  * @param {Partial<Settings>} updated_settings Settings to update
  //  */
  // const updateSettings = (updated_settings: Partial<Settings>) => {
  //   const new_settings: Settings = {...settings, ...updated_settings}

  //   //Update new settings state with those settings that were provided(but not
  //   //those that weren't provided)
  //   // let key: keyof Settings
  //   // for (key in updated_settings) {
  //   //   const keyTyped = key as keyof Settings
  //   //   new_settings[keyTyped] = updated_settings[keyTyped]!
  //   // }

  //   setSettings(new_settings)
  // }

  // const updateMiscState = (updated_misc_state: Partial<MiscState>) => {
  //   const new_misc_state = {...miscState}

  //   //Update new settings state with those settings that were provided(but not
  //   //those that weren't provided)
  //   for (const key in updated_misc_state) {
  //     const keyTyped = key as keyof MiscState
  //     new_misc_state[keyTyped] = updated_misc_state[keyTyped]!
  //   }

  //   setMiscState(new_misc_state)
  // }

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

  useEffect(() => {

    updateCSSVars(settings.theme);

    // setStyleVar('--primary', new_theme.color.primary)
    // setStyleVar('--secondary', new_theme.color.secondary)
    // setStyleVar('--background', new_theme.color.background)
    // setStyleVar('--on-background', new_theme.color.onBackground)

  }, [settings.theme])

  useEffect(() => {
    updateCSSVars(settings.theme);
  }, [])

  return (
    <div className='h-full'>
      <MiscContext.Provider value={{ miscState, updateMiscState }}>
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
      </MiscContext.Provider>
    </div>
  );
}

export default App;
