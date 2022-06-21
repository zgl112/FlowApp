import { RootStore } from "./rootstore";
import { observable, action, runInAction, computed, toJS } from "mobx";
import { IData } from "../Models/playerInterface";
import _ from 'underscore';
import agent from "../API/agent";
import { IPlaylist } from "../Models/Playlist";
import { IUser } from "../Models/User";
import { ID } from "../Models/Forms";
export default class PlaylistStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

    @observable loading = false;
    @observable playlistReg = new Map();
    @observable playlistsReg = new Map();
    @observable playlist : IPlaylist[] = [];
    @observable songs : IData[] = [] ;
    @computed get playlists () {
        return Array.from(this.playlistsReg.values());
    }
   
    @action getTracks = async(array: any[])=>{
        runInAction("loadingTracks", ()=> { 
            this.playlistReg.clear();
            this.songs! = Array.from(this.playlistReg.values());
            this.loading = true;
        });
        let i = 1;
        Array.from(array).forEach((element : IData)=> {
            element.refNumber = i++;
            this.playlistReg.set(element.refNumber,element);
            this.loading = false;
        });
        this.songs! =  Array.from(this.playlistReg.values());
        return this.songs!;
        }
        catch(error : any){
            runInAction("loadingTracks", ()=> {
            this.loading = false;
            })
            console.log(error)
    }

    @action sortAscArtist = (songs: IData[]) =>{
        const sorted = _.sortBy(songs, "artistname" );
        this.playlistReg.clear();
        runInAction(()=>{
            this.playlistReg.clear();
            this.getTracks(sorted);}) 
    }

    @action sortDescArtist = async (songs: IData[]) =>{
        const sorted = _.sortBy(songs, "artistname" );
        this.playlistReg.clear();
        runInAction(()=>{
            this.getTracks(sorted.reverse());
            }) 
    }

    @action sortAscAlbum = (songs: IData[]) =>{
        const sorted = _.sortBy(songs, "albumtitle" );
        this.playlistReg.clear();
        runInAction(()=>{
            this.getTracks(sorted);
            }) 
    }

    @action sortDescAlbum = async (songs: IData[]) =>{
        const sorted = _.sortBy(songs, "albumtitle" );
        this.playlistReg.clear();
        runInAction(()=>{
            this.getTracks(sorted.reverse());
          })   
    }
 
    @action getPlaylists = async () => {
        
        let parseUser = JSON.parse(sessionStorage.getItem("user")!);
        const user : IUser = parseUser;
        const send : ID = {userid:user.id}
        try{
            const playlist = await agent.playlist.get(send);
            var i = 1;
            runInAction(()=>{
                Array.from(playlist).forEach((element : IPlaylist)=> {
                    element.refNumber = i++;
                    this.playlistsReg.set(element.refNumber,element);
                    this.loading = false;
                });
                this.playlist = Array.from(this.playlistsReg.values());
                console.log(toJS(this.playlist))
            })
        }catch(err){console.log(err)}
    }
    @action createPlaylist = async (form: IPlaylist) => {
        try{ 
            runInAction(async()=>{
                await agent.playlist.add(form);
                await this.getPlaylists();
            })
        }catch(err){console.log(err)}
    }
    @action deletePlaylist = async (form:IPlaylist) => {
        try{
            await agent.playlist.delete(form);
            
        }catch(err){console.log(err)}
    }

    @action searchSongs = (form:IData) => {
        try{
            runInAction(async()=>{
                this.loading = true;
                const response = await agent.songs.getResults(form);
                await this.getTracks(response);
            })
            runInAction(()=>this.loading=false);
        }catch(e){
            console.log(e)
        }
    }
    @action getSongsByPlaylist = (playlistName: string) => {
        runInAction(async()=>{
               const songs = await agent.songs.get(playlistName);
               console.log(songs);
               this.getTracks(songs);

        })
    }
}

