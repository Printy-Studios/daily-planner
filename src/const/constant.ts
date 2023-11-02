import { ThemeOption } from 'types/Settings'
import Theme from 'types/Theme'

const constant = {
    storage_key: {
        task_groups: 'task-groups',
        tasks: 'tasks',
        settings: 'settings'
    }
}



const themes: Record<ThemeOption, Theme> = {
    DARK: {
        color: {
            primary: '#34a1eb',
            secondary: '#2b2b2b',
            background: '#404040',
            "on-background": '#ffffff',
            "on-background-dark": '#c2c2c2',
            "on-primary": '#ffffff'
        }
    },
    LIGHT: {
        color: {
            primary: '#34a1eb',
            secondary: '#ededed',
            background: '#ffffff',
            "on-background": '#000000',
            "on-background-dark": '#595959',
            "on-primary": '#TODO'
        }
    }
}

export { themes }

export default constant