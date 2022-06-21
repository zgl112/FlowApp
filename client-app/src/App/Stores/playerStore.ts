import { RootStore } from "./rootstore";
// eslint-disable-next-line
import { observable, action, runInAction, toJS} from "mobx";
import {  IPlayer } from "../Models/IPlayer";
import { IData, IIconVol, IShuffle } from "../Models/playerInterface";
import _ from 'underscore';

export default class PlayerStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
    @observable player : IPlayer = {
        currentSong: "",
        currentTime: 0,
        music: "",
        duration: 0 ,
        artistname: "",
        albumtitle: "",
        albumcover_small :""
    }
    @observable currentSong =  new Audio(); 
    @observable icon? :string = "play";
    @observable loopColor : string = "grey"; 
    @observable iconVolume : IIconVol ={
        iconName: "volume down",
        iconColor :"grey"
    } ; 
    @observable current = 0;
    @observable isShuffle : IShuffle = {
        isshuffle : false,
        iconColor : "grey"
    }

    @action getSongById = (songs:IData[], current:number) =>
    {
        const song = songs.find(song=> song.refNumber === current)
        return song;
    }

    @action  getCurrentTitle =(song: IData)=>{    
        try{
            runInAction( ()=> {
                this.stop();
                this.currentSong.src = song.preview;
                this.player.currentSong = song.title;
                this.player.albumtitle = song.albumtitle;
                this.player.artistname = song.artistname;
                this.player.albumcover_small = song.albumcover_small;
                this.current = song.refNumber!;
                this.play();
                this.icon="pause";
                this.currentSong.volume=0.5;
                this.currentSong.addEventListener('timeupdate',(e:any)=>{
                    runInAction(()=>
                    {
                        this.player.currentTime = e.target.currentTime
                    })
                  })
                this.currentSong.addEventListener('loadedmetadata',(e:any)=>{
                  runInAction(()=>
                  {
                      this.player.duration = e.target.duration
                  })
                })
              
            })
           return this.player;
        }catch(error){
            console.log(error)
        }
    }

    @action changeVolumeIcon = ()=>{
        const icon : IIconVol ={  
            iconName: "volume down",
            iconColor :"grey"};
        try {
            runInAction(()=>
            {
                if (this.currentSong.muted === true){
                    icon.iconName = "volume off"
                    icon.iconColor = "red"
                }
                else if(this.currentSong.volume  >= 80/100 ){
                    icon.iconName = "volume up"
                    icon.iconColor = "grey"
                }
                else if( this.currentSong.volume >= 79/100 && this.currentSong.volume >=1/100 ){  
                    icon.iconName = "volume down"
                    icon.iconColor = "grey"
                }

                else if( this.currentSong.volume <= 0/100 && this.currentSong.volume === 0/100){
                    icon.iconName = "volume off"
                    icon.iconColor = "grey"
                }
            this.iconVolume = icon;
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    @action previous = (songs : IData[])=> {
         try{
            if(this.isShuffle.isshuffle=== true){
             const song = _.sample(songs);
             console.log(song);
             this.getCurrentTitle(song!)
            }
        else{
            const song = this.getSongById(songs,this.current-1)
            this.getCurrentTitle(song!);}
        }catch(error){console.log(error)}
    }
    @action next =(songs : IData[])=> {
        try{
            if(this.isShuffle.isshuffle=== true){
             const song = _.sample(songs);
             this.getCurrentTitle(song!)
            }
        else{
            const song = this.getSongById(songs,this.current+1)
            this.getCurrentTitle(song!);}
        }catch(error){console.log(error)}
    }

    @action loop =()=> {
        try{
            runInAction("loopcurrent",()=> {
                this.currentSong.loop = true;
                this.loopColor = "teal"
            })
        }catch(error){console.log(error)}
    
    }
    @action unloop =()=> {
        try{
            runInAction("loopcurrent",()=> {
                this.currentSong.loop = false;
                this.loopColor = "grey";
            })
        }catch(error){console.log(error)}
    }
    
    @action shuffle =()=> {
        const shuffle : IShuffle= {
            isshuffle:false,
            iconColor:""
        }
        try{
            runInAction("shuffle",()=> {
            shuffle.isshuffle=true;
            shuffle.iconColor="teal"
            this.isShuffle = shuffle
            })
        }catch(error){console.log(error)}
    
    }
    @action cancelshuffle =()=> {
        const shuffle : IShuffle= {
            isshuffle:false,
            iconColor:""
        }
        try{
            runInAction("cancel shuffle",()=> {
            shuffle.isshuffle=false;
            shuffle.iconColor="grey"
            this.isShuffle = shuffle
            })
        }catch(error){console.log(error)}
    }




   @action onEnded =(songs: IData[])=> {
       try{
        runInAction("end song",()=>{
            this.currentSong.addEventListener("ended",(e:any)=>{
                runInAction(()=>{
                    this.next(songs) 
                })
            })
        })
       }catch(error){console.log(error)}

       }
   
       @action onVolumeChange =()=> {
        try{
         runInAction("end song",()=>{
             this.currentSong.addEventListener("volumechange",(e:any)=>{
                 runInAction(()=>
                 {
                    this.changeVolumeIcon() 
                 })
             })
         })
        }catch(error){console.log(error)}
 
        }
    

    @action play = () => {
        try{
            runInAction("play song",()=>{
                this.currentSong.play();
                this.player.music = "playing";
                this.icon="pause";
            })
        }catch(error){
            console.log(error)
        }
    }
    

    @action pause = () => {
        try{
            runInAction("pause song",()=>{
                this.currentSong.pause();
                this.player.music = "paused";
                this.icon="play"
            })
        }catch(error){
            console.log(error)
        }
    }

     @action stop = () => {
         try{
            runInAction("stop song", ()=> {
                this.currentSong.pause();
                this.currentSong.currentTime = 0;
                this.icon="play";
                this.player.music = "paused";
            })
         }catch(error){
             console.log(error)
         }

    }


    @action setSeek = (value :number) => {
        try{
            runInAction(()=> {
                this.currentSong.currentTime = value;
            })
        }catch(error){
            console.log(error)
        }
    }


    @action getTime(time:number) {
        if (!isNaN(time)) {
          return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
          );
        }
    }

}

