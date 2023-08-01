// Core
import defaults from 'const/defaults'
import { createContext } from 'react'

//Types
import Settings from 'types/Settings'

const SettingsContext = createContext<{
        settings: Settings, 
        updateSettings: ( updated_settings: Partial<Settings>) => void
    }>({
        settings: defaults.settings,
        updateSettings: () => {}
    })

export default SettingsContext