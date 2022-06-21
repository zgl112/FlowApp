import React from 'react';
import { Container, Grid, GridRow } from 'semantic-ui-react';
import { IPlayer } from '../../../App/Models/IPlayer';
import { IData, IIconVol, IShuffle } from '../../../App/Models/playerInterface';
import Timeseek from './PlayerLogicComponents/Timeseek';
import Volume from './PlayerLogicComponents/Volume';
import Songmeta from './PlayerLogicComponents/SongMetadata';
import Playerbuttons from "./PlayerLogicComponents/Playerbuttons";
import useWindowDimensions from '../../../App/Util/useWindowDimension';

const Bottombar : React.FC<{
    player:IPlayer,
    currentSong: HTMLAudioElement,
    icon? : string,
    loopColor : string,
    play :()=> void,
    previous: (songs: IData[]) => void,
    next: (songs: IData[]) => void,
    songs : IData[] |undefined,
    pause :()=>void,
    loop :()=> void,
    cancelshuffle: () => void,
    shuffle: () => void,
    isShuffle: IShuffle,
    unloop :()=>void,
    setSeek: (value :number)=>void,
    getTime: (value :number)=>string | undefined,
    iconVolume: IIconVol
    width : number
    }> =({player, currentSong,icon,pause,play,setSeek,getTime,iconVolume,loop,unloop,loopColor,next,previous,songs,shuffle,isShuffle,cancelshuffle, width})=> {
   
    return (  
        (width > 450) ? (<Container className="playerBar">
         
        <Grid >
            <Grid.Row>
                <Grid.Column width={3}>
                    <Songmeta player={player} width={width}/>
                </Grid.Column>

                <Grid.Column width={1}/>

                <Grid.Column width={8} >
                    <Playerbuttons play={play} pause={pause} icon={icon} loop={loop} unloop={unloop} loopColor={loopColor} next={next} previous={previous} songs={songs}  shuffle={shuffle}
                isShuffle={isShuffle}
                cancelshuffle={cancelshuffle}/>
                    <GridRow>
                        <Timeseek setSeek={setSeek} getTime={getTime} player={player}/>
                    </GridRow>
                </Grid.Column>

                <Grid.Column width={2}/>
        
                <Grid.Column width={2}>
                    <Volume currentSong={currentSong} iconVolume={iconVolume}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>)
    
    :
    
    (<Container className="playerBarmobile">
         <Playerbuttons play={play} pause={pause} icon={icon} loop={loop} unloop={unloop} loopColor={loopColor} next={next} previous={previous} songs={songs}  shuffle={shuffle} isShuffle={isShuffle}
            cancelshuffle={cancelshuffle}/>
          <Timeseek setSeek={setSeek} getTime={getTime} player={player}/>
              
   
                <Songmeta player={player} width={width}/>
         

         
          
               
                  
              

          
    
</Container>)   
    
    );
}
export default Bottombar; 