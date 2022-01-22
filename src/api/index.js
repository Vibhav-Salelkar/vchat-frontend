import axios from 'axios'

const API = axios.create( {baseURL: 'http://localhost:5000'})

API.interceptors.request.use( (req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const findUser = (searchQuery) => API.get(`/user?search=${searchQuery}`);
export const createChat = (userId) => API.post('/chats', userId);
export const getChats = () => API.get('/chats');
export const createGroup = (groupData) => API.post('/chats/group',groupData);
export const editGroup = (editGroupData) => API.put('/chats/editgroup', editGroupData); 
export const addInGroup = (addGroupData) => API.put('/chats/addingroup', addGroupData);
export const removeFromGroup = (removeFromGroupData) => API.put('/chats/removefromgroup', removeFromGroupData);