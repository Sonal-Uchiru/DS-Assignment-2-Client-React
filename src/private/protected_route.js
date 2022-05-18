import { Navigate } from 'react-router-dom';

export const Private = ({Component}) => {
    const auth = localStorage.getItem('moon-cinema-token');

    return true ? <Component/>  : <Navigate to="/" />
}