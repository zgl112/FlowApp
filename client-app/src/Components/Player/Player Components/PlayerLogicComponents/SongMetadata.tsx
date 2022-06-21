import { observer } from "mobx-react-lite";
import React from "react";
import { Container, Grid, GridColumn, GridRow, Icon,Image, Item ,Popup} from "semantic-ui-react"
import { IPlayer } from "../../../../App/Models/IPlayer";

const Songmeta:React.FC<{player :IPlayer, width:number}> = ({player, width})=> {

    return(
       (width > 450) ? ( <Grid > 
        <GridRow>
            <GridColumn width={5}>{player.currentSong &&
            <Popup  inverted position='top left'content={`${player.albumtitle}`} trigger={
            <Image src={player.albumcover_small ===null ? require("../../../../App/Assets/placeholder.png") :`${player.albumcover_small}`}/>} ></Popup>}
            </GridColumn>
            <GridColumn width ={11}>
                <Container>
                    <Item>{`${player.currentSong}`}</Item>
                </Container>
                <Item>{`${player.artistname}` } </Item>
            </GridColumn>
        </GridRow>
    </Grid>) : ( 
        <Container>
          { player.currentSong &&     <Popup  inverted position='top left'content={`${player.albumtitle}`} trigger={
                <Image src={player.albumcover_small ===null ? require("../../../../App/Assets/placeholder.png") :`${player.albumcover_small}`}/>} ></Popup>}
               
                        <Item>{`${player.currentSong}`}</Item>
                   
                    <Item>{`${player.artistname}` } </Item>
                    </Container>)
        );
          };

export default observer(Songmeta);