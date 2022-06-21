import { observer } from "mobx-react-lite";
import React from "react";
import { Container, Icon, Popup } from "semantic-ui-react";
import { IData, IShuffle } from "../../../../App/Models/playerInterface";


 const PlayerButtons:React.FC<({play:()=> void,pause:()=>void,icon?: string, loop :()=> void,
    unloop :()=>void,loopColor : string, previous: (songs: IData[]) => void,
    next: (songs: IData[]) => void,
    songs : IData[] |undefined,
    cancelshuffle: () => void,
    shuffle: () => void,
    isShuffle: IShuffle,
    
})> = ({play,pause,icon,loop,unloop,loopColor,next,previous,songs,shuffle,isShuffle,cancelshuffle})=>{
    
   
     return(
        <Container  >
            <Popup inverted size="mini" position='top center' content={isShuffle.iconColor === "grey" ? "Shuffle" : "Disable shuffle"} trigger={
                <Icon  name="shuffle" color={isShuffle.iconColor} onClick={(()=>
                    {
                        isShuffle.iconColor === "grey" ? shuffle() : cancelshuffle();
                    })}/>  
                }/> 
            <Popup inverted size="mini" position='top center' content={"Previous"} trigger={
                <Icon  onClick={(()=>previous(songs!))}  name="step backward" color="grey"/>}/>
            <Popup inverted size="mini" position='top center' content={icon === "pause" ? "Pause" : "Play"} trigger={
                <Icon size="large"  name={icon} color="grey" onClick={(()=>
                    {
                        icon === "pause" ? pause() : play();
                    })}/>  
                }/>
            <Popup inverted size="mini" position='top center' content={"Next"} trigger={
                <Icon   name="step forward" color="grey" onClick={(()=>next(songs!))} />}/>
            <Popup inverted size="mini" position='top center' content={loopColor === "grey" ? "Loop": "Disable loop"} trigger={
                <Icon name="repeat" color={loopColor} onClick={(()=>
                    {
                        loopColor === "grey" ? loop() : unloop();
                    })}/>  
                }/> 
        </Container>
     );
 }
 export default observer(PlayerButtons)