import { toast } from 'react-toastify';

const showToast = (type='error', message, autoClose) => {
    return toast[type](message, { autoClose: autoClose,});
}

export default showToast;