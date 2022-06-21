import {configure} from 'mobx';
import {createContext} from 'react';
import CommonStore from './commonstore';
import ModalStore from './modalStore';
import PlayerStore from './playerStore';
import PlaylistStore from './playlistStore';
import UserStore from './userstore';

configure({enforceActions: "always"});

//rootConstructor to inject all state management required for this app

export class RootStore {
    userStore : UserStore;
    commonStore: CommonStore;
    modalStore : ModalStore;
    playerStore: PlayerStore;
    playlistStore: PlaylistStore;
    
    constructor(){
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.playerStore = new PlayerStore(this);
        this.playlistStore = new PlaylistStore(this);
    }
}
export const RootStoreContext = createContext(new RootStore());
