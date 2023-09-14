
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
    theme: ThemeOption
}

export default Settings;

export { FontSize, ThemeOption }