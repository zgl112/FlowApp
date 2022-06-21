import { action, computed, observable, runInAction, toJS } from "mobx";
import agent from "../API/agent";
import { ILogin, IRegister } from "../Models/Forms";
import { IUser } from "../Models/User";
import { RootStore } from "./rootstore";
import {history} from '../../index';
import arraysongstwo from "../Util/localFiles";


export default class UserStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }
    @observable user: IUser | null =null;
    @observable guestTemp: boolean = false;
    
    @computed get isLoggedIn()
    {
        return !!this.user;
    }
    
    @action login = async (form : ILogin) => {
        try{
            const user = await agent.user.login(form);
            var token = user.token;
            this.rootStore.commonStore.setToken(token);
            runInAction(async()=>{
                this.rootStore.userStore.guestTemp = false
                await this.storeUser(user);
                await this.getUser();
                this.rootStore.modalStore.closeModal();
                this.rootStore.playlistStore.getPlaylists();
                history.push("/player");
            })
        }catch(error){
                console.log(error);
            }
    }

    @action signin = async (form : IRegister) => {
        try{
            const user : IUser = await agent.user.register(form);
            var token = user.token;
            this.rootStore.commonStore.setToken(token);
            
            runInAction(async()=>{
                this.rootStore.userStore.guestTemp = false
                await this.storeUser(user);
                await this.getUser();
                this.rootStore.modalStore.closeModal();
                this.rootStore.playlistStore.getPlaylists();

                history.push("/player");
            })
        }catch(error){
            console.log(error);
        }
    }

    @action guestTemps = async () => {
        try{
            runInAction(async()=>{
                this.rootStore.userStore.guestTemp = true
                this.rootStore.modalStore.closeModal();
                this.rootStore.playlistStore.getTracks(arraysongstwo);
                history.push("/player");
            })
        }catch(error){
                console.log(error);
            }
    }

    @action storeUser = async (user: IUser) => {
        try{
            window.sessionStorage.setItem("user",JSON.stringify(user));
        }catch(error){
            console.log(error);
        }
    }

    @action getUser = async () => {
        try{
            let parseUser = JSON.parse(sessionStorage.getItem("user")!);
            this.user = parseUser;
        }catch(error){
            console.log(error);
        }
    }

    @action logout = () => {
        window.sessionStorage.removeItem("user");
        window.localStorage.removeItem("jwt");
        this.rootStore.playlistStore.playlistsReg.clear();
        this.user = null;
        history.push("/")
        
      };

    @action click = () => {
        console.log(localStorage.getItem("jwt"));
        console.log(toJS(this.user));
    }
}