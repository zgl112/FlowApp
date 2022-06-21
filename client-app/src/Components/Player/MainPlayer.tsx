import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Container, Item, Table,Image, Header } from "semantic-ui-react";
import { RootStoreContext } from "../../App/Stores/rootstore";
import Topbar from "./Player Components/Topbar";
import Bottombar from "./Player Components/Bottombar";
import Playlists from "./Player Components/Playlists";
import Extras from "./Player Components/Extras";
import Content from "./Player Components/Content";
import useWindowDimensions from "../../App/Util/useWindowDimension";

//main player component which includes all elements from the player page

 const MainPlayer = () => {
    const rootStore = useContext(RootStoreContext);
    const {currentSong,player,play,pause,icon,setSeek,getTime,onEnded,getCurrentTitle, onVolumeChange, iconVolume,loop,unloop,loopColor,next,previous,shuffle,isShuffle,cancelshuffle} = rootStore.playerStore;   
    const {getTracks, loading,songs,playlist} = rootStore.playlistStore ;
    const { width } = useWindowDimensions();

    
    useEffect(()=>{
         onEnded(songs);
         onVolumeChange();
        
    },[onEnded, getTracks,songs,onVolumeChange,playlist]);
    return(
        (width>450) ? (
        <Container className="masterplayer">
            <Playlists/>
            <Bottombar currentSong={currentSong} 
                player={player} 
                play={play} 
                pause={pause} 
                icon={icon} 
                setSeek={setSeek} 
                getTime={getTime} 
                iconVolume={iconVolume} 
                loop={loop} 
                unloop={unloop} 
                loopColor={loopColor}
                next={next}
                previous={previous}
                songs={songs}
                shuffle={shuffle}
                isShuffle={isShuffle}
                cancelshuffle={cancelshuffle}
                width={width}
            />
            <Extras/>
            <Topbar/> 
            <Content getCurrentTitle={getCurrentTitle} player={player}  loading={loading} songs={songs} />
        </Container>)
        
        :
        
        (<Container className="masterplayermobile">
            <Table>
                <Table.Row>   <Item>
                <Image  
                  src={require("../../App/Assets/logo.png")}
                  alt="logo"
                  centered
                 />
                <Header as="h1" inverted  >
                Flow 
                </Header></Item></Table.Row>
                <Table.Row><Content getCurrentTitle={getCurrentTitle} player={player}  loading={loading} songs={songs} /></Table.Row>
                 <Table.Row>   
                    <Bottombar currentSong={currentSong} 
                        player={player} 
                        play={play} 
                        pause={pause} 
                        icon={icon} 
                        setSeek={setSeek} 
                        getTime={getTime} 
                        iconVolume={iconVolume} 
                        loop={loop} 
                        unloop={unloop} 
                        loopColor={loopColor}
                        next={next}
                        previous={previous}
                        songs={songs}
                        shuffle={shuffle}
                        isShuffle={isShuffle}
                        cancelshuffle={cancelshuffle}
                        width={width}
                     />
                </Table.Row>
            </Table>
         
</Container>)  
        );
}
export default observer(MainPlayer)