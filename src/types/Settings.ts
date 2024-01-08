
//Font size
enum FontSize {
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
}

enum ThemeOption {
    DARK = 'DARK',
    LIGHT = 'LIGHT'
}

type Settings = {
    font_size: FontSize
    default_task_group_color: string
    theme: ThemeOption
}

export default Settings;

export { FontSize, ThemeOption }