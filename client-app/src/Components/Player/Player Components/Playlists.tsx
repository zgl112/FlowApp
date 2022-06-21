import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import {  Container, Header, Image, Item,  Table, TableBody, TableCell, TableRow} from "semantic-ui-react";
import { IPlaylist } from "../../../App/Models/Playlist";
import { RootStoreContext } from "../../../App/Stores/rootstore";
import arraysongstwo from "../../../App/Util/localFiles";
import arraysongs from "../../../App/Util/localMusicData";
import Playlistform from "../../Users/PlaylistForm";


const Playlists = () => {
  const rootStore = useContext(RootStoreContext);

  const {getTracks,playlists}= rootStore.playlistStore;
  const{logout}=rootStore.userStore
  useEffect(()=>{
      
  },[playlists])
 
    return (      
          <Container className="playlists">
            <Container onClick={()=>logout()}>
              <Item>
                <Image  
                  src={require("../../../App/Assets/logo.png")}
                  alt="logo"
                  centered
                 />
                <Header as="h1" inverted  >
                Flow 
                </Header></Item>
            </Container>
            <Container className="lists">
            <Table >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Playlists</Table.HeaderCell>
                </Table.Row>
                <TableRow>
                <Table.HeaderCell>Create a playlist!<Playlistform/>
                </Table.HeaderCell>
              </TableRow>
            </Table.Header>
            <TableBody>
              <TableRow>
                <TableCell onClick={(()=>getTracks(arraysongs))}>Preview playlist</TableCell>
              </TableRow>
              <TableRow>
                <TableCell onClick={(()=>getTracks(arraysongstwo))}>Deezer Preview</TableCell>
              </TableRow>
              {playlists.map((playlist :IPlaylist )=>
                <TableRow key={playlist.refNumber}>
                    <TableCell >{playlist.playlistName}</TableCell>
                </TableRow>
              )}
            </TableBody>
            </Table>
            </Container>
          </Container>
    );
}
export default observer(Playlists); 