// Primary color variations (green)
export const PRIMARY = {
    lightest: '#e8f5e9',
    lighter: '#c8e6c9',
    light: '#81c784',
    main: '#43a047',
    dark: '#388e3c',
    darker: '#2e7d32',
    darkest: '#1b5e20',
    contrastText: '#ffffff'
};

// Secondary color variations (teal)
    export const SECONDARY = {
    lightest: '#e0f2f1',
    lighter: '#b2dfdb',
    light: '#4db6ac',
    main: '#00bfa5',
    dark: '#00a896',
    darker: '#00897b',
    darkest: '#00695c',
    contrastText: '#ffffff'
};

// Neutral color variations
export const NEUTRAL = {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
};

// Additional semantic colors
export const INFO = {
    light: '#4fc3f7',
    main: '#29b6f6',
    dark: '#0288d1',
    contrastText: '#ffffff'
};

export const SUCCESS = {
    light: '#81c784',
    main: '#4caf50',
    dark: '#388e3c',
    contrastText: '#ffffff'
};

export const WARNING = {
    light: '#ffb74d',
    main: '#ff9800',
    dark: '#f57c00',
    contrastText: 'rgba(0, 0, 0, 0.87)'
};

export const ERROR = {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
    contrastText: '#ffffff'
};

// Usage example for Material UI theme
export const themeColors = {
primary: PRIMARY,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    neutral: NEUTRAL
};

export default themeColors;