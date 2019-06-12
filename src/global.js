export const url = 'https://shard-backend.herokuapp.com/api';
export const appName = 'POS';
export const customerStyles = { 
    control: (styles, {isFocused}) => ({ 
        ...styles, 
        backgroundColor: 'transparent',
        boxShadow: isFocused ? '0 0.313rem 0.719rem rgba(0,123,255,.1), 0 0.156rem 0.125rem rgba(0,0,0,.06)' : 'none'
    }),
};