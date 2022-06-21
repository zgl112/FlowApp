import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container, Dimmer, Dropdown, DropdownHeader, Icon,   Input,   Item,   Loader,  Menu,  Table } from "semantic-ui-react";
import { IPlayer } from "../../../App/Models/IPlayer";
import { IData } from "../../../App/Models/playerInterface";
import { RootStoreContext } from "../../../App/Stores/rootstore";
import SearchForm from "../../Users/SearchForm";

const Content :React.FC<{ 
    songs: IData[],
    getCurrentTitle: (playlist: IData)=> IPlayer | undefined,
    loading : boolean,
    player: IPlayer}> =({
        songs,
        player,
        loading,
        getCurrentTitle})=> {
            const rootstore = useContext(RootStoreContext);
         const {sortDescArtist,sortAscArtist,sortAscAlbum,sortDescAlbum} = rootstore.playlistStore;
    return (     
        
    <Container className="playerContent">
       <Dimmer active={loading}>
      <Loader content="Loading your playlist"/>
    </Dimmer>
       {!loading && <Table >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell >Title</Table.HeaderCell>
                    <Table.HeaderCell >Artist</Table.HeaderCell>
                    <Table.HeaderCell>Album</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                   {songs.length > 2 && <Table.HeaderCell>
                        <SearchForm/>
                    </Table.HeaderCell>
                    }
                    <Table.HeaderCell positive>Sort
                        <Dropdown pointing="top right">
                            <Dropdown.Menu>
                                <Dropdown.Item  text="Album ascending" icon="sort alphabet down"onClick={(()=>sortAscAlbum(songs!))}></Dropdown.Item>
                                <Dropdown.Item  text="Album descending" icon="sort alphabet up" onClick={(()=>sortDescAlbum(songs!))} ></Dropdown.Item>
                                <Dropdown.Item  text="Artist ascending" icon="sort alphabet down" onClick={(()=>sortAscArtist(songs!))}></Dropdown.Item>
                                <Dropdown.Item  text="Artist descending" icon="sort alphabet up" onClick={(()=>sortDescArtist(songs!))}></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Table.HeaderCell>
                </Table.Row>
                
            </Table.Header>
            <Table.Body>
                {songs.map(song=>
                (
                    <Table.Row key={song.refNumber} >
                        <Table.Cell ><Item onClick={(()=>getCurrentTitle(song))}>{song.title} {player.currentSong === song.title && <Icon name="volume up" color="green"></Icon>}</Item> </Table.Cell>
                        <Table.Cell>{song.artistname}</Table.Cell>
                        <Table.Cell>{song.albumtitle}</Table.Cell>
                    </Table.Row> 
                ))}
            </Table.Body>
        </Table>}
    </Container>
    );
}
export default observer(Content); 