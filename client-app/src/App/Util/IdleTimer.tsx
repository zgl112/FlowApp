import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import IdleTimer from 'react-idle-timer';
import { Button, Card,Header} from 'semantic-ui-react';
import { RootStoreContext } from '../Stores/rootstore';

const Idle = ()=> {
const rootStore = useContext(RootStoreContext);
const {openModal,closeModal} = rootStore.modalStore;
    return(
      
            <IdleTimer 
            timeout={30000}
            onIdle={()=>{
                openModal(
                    <Card centered>
                        <Card.Content>
                            <Header color="green">Power saving mode is on!</Header>
                            <Header as="h5">Media player will still run on the background!</Header>
                        </Card.Content>
                        <Card.Content>
                            <Button fluid basic onClick={(()=>{closeModal()})}>
                                Return to player!
                            </Button>
                        </Card.Content>
                      </Card>
                )}}/>
    );
}

export default observer(Idle);
