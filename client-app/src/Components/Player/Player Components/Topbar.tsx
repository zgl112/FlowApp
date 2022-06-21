import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Container, Dropdown, Menu,Image } from 'semantic-ui-react';
import { RootStoreContext } from '../../../App/Stores/rootstore';


const Topbar = () => {
    const rootStore = useContext(RootStoreContext);
    const { logout, user, guestTemp  } = rootStore.userStore;
    return(
    <Container className="topbar">
        
        <Menu.Item position="right">{user?.username !== null ? user?.username : "Guest"} </Menu.Item>
        {!guestTemp &&<Image centered 
            src={require("../../../App/Assets/user.png")}
            alt="logo"
            circular
            avatar
          />
        }
        <Dropdown pointing="top right">
           {guestTemp ? <Dropdown.Menu>
                <Dropdown.Item onClick={logout} text="Log in" icon="power"></Dropdown.Item>
            </Dropdown.Menu> : 
            <Dropdown.Menu>
                <Dropdown.Item onClick={logout} text="Log out" icon="power"></Dropdown.Item>
            </Dropdown.Menu>
            }
        </Dropdown>
    </Container>
    );
}
export default observer(Topbar);