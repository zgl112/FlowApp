import { observer } from "mobx-react-lite";
import React from "react";
import { Container } from "semantic-ui-react";
import { IPlayer } from "../../../../App/Models/IPlayer";


const TimeSeek:React.FC<{setSeek : (value:number)=>void,getTime: (value:number)=>string|undefined,player:IPlayer}> = ({setSeek,getTime,player}) => {
  
    return(<Container>
       {player.currentSong !== null && <label>  {getTime(player.currentTime)}</label>}
            <input type="range" value={player.currentTime} max={player.duration} onChange={
                        ((event: React.ChangeEvent<HTMLInputElement>)=>{
                            setSeek(parseInt(event.currentTarget.value))
                            console.log(event.currentTarget.value)
                        })
            }/>
        {player.currentSong !== null && <label>{getTime(player.duration)}</label>}
    </Container>);
}
export default observer(TimeSeek)