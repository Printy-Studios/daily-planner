//Types
import Settings, { FontSize, ThemeOption } from 'types/Settings';

/*
    Defaults and placeholders.
*/

//Setting defaults.
const settings: Settings = {
    font_size: FontSize.M,
    default_task_group_color: '#4caf50',
    theme: ThemeOption.DARK
}

const defaults = {
    settings: settings
}

export default defaults