import React, {  useState } from "react"
import { Container, Icon, Popup } from "semantic-ui-react";
import { IIconVol } from "../../../../App/Models/playerInterface";


const Volume:React.FC<{currentSong: HTMLAudioElement, iconVolume: IIconVol}> = ({currentSong,iconVolume})=> {

    const [volume, setVolume]=useState(50)
    currentSong.volume=volume/100;

    const muted = () =>{
        return currentSong.muted === false ? currentSong.muted = true : currentSong.muted = false
    }
    
    return(
        <Container>
            <Popup  inverted position='top center' content={currentSong.muted ? "Unmute" : "Mute"} trigger={
            <Icon onClick={(()=>currentSong.muted = muted())} name={iconVolume.iconName} size="large" color={iconVolume.iconColor}inverted />}/>
            <Popup  inverted position='top center' content={`Volume: ${volume} %`} trigger={<input type="range" min={-0.5} max={101} value={volume} onChange={((event: React.ChangeEvent<HTMLInputElement>)=> {
            setVolume(parseInt(event.currentTarget.value));
            })} />}/>
        </Container>
    );
}
export default Volume
