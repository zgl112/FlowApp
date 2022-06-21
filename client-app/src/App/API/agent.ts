import axios, {AxiosResponse} from 'axios';
import { toast } from 'react-toastify';
import { IRegister, ILogin, ID } from '../Models/Forms';
import { IUser } from '../Models/User';
import {history} from '../../index';
import { IData } from '../Models/playerInterface';
import { IPlaylist } from '../Models/Playlist';


axios.defaults.baseURL = "https://localhost:44316/";

axios.interceptors.request.use(
    config => {
        const token = window.localStorage.getItem("jwt");
        if(token) config.headers.Authorization = ` Bearer ${token} `;
        return config;
    },
    error => { 
        return Promise.reject(error)
    }
);

axios.interceptors.response.use(undefined,error=> {

const {status} = error.response;

    if(error.message === "Network Error" && !error.response)
    {
        toast.error("Network error - Our API is currently offline");
    }
    if(status===404){
        history.push("/notfound")
        toast.error("Could not find what you are looking for!")
    }
    if(status===500){
        toast.error("Server error - please check the terminal for more information");
    }
    throw error.response;
});



const respBody = (response : AxiosResponse) => response.data;

const requests = {
    get: (url:string)=>axios.get(url).then(respBody),
    post: (url:string, body: {})=>axios.post(url,body).then(respBody),
    put: (url:string, body: {})=>axios.put(url,body).then(respBody),
    delete: (url:string, body: {})=>axios.put(url,body).then(respBody),
}

const user = {
    login: (form : ILogin) : Promise<IUser> => requests.post("/api/user/authenticate",form),
    register: (form : IRegister) : Promise<IUser> => requests.post("/api/user/register",form),
    test: ( ) => requests.get("/api/user/")
}
const playlist = {
    get: (id: ID) :Promise<IPlaylist[]> => requests.post("/api/playlist/lists",id),
    add: (form : IPlaylist) => requests.post("/api/playlist/create",form),
    delete: (form: IPlaylist) => requests.delete("/api/playlist/delete",form)
}

const songs = {
    get: (playlistName: string) : Promise<IData[]> => requests.post("/api/song/lists",{playlistName}),
    getResults: (search: IData) : Promise<IData[]> => requests.post("/api/song/results",search),
    add: (form : IData) => requests.post("/api/song/create",form),
    delete: (form: IData) => requests.delete("/api/song/delete",form)
}


export default {
    user,
    playlist,
    songs
}