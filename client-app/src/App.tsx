import './App.css';
import { Fragment, useContext, useEffect } from 'react';
import { RootStoreContext } from './App/Stores/rootstore';
import {Route, Switch, withRouter} from 'react-router-dom';
import {Homepage}  from './Components/Homepage/homepage';
import  MainPlayer  from './Components/Player/MainPlayer';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import { LoadingComponent } from './App/Util/Loading';
import ModalContainers from './App/Util/ModalContainers';
import NotFound from './App/Util/NotFoundComponent';

// main component App called in index.html file as div "root"

const App = ()=> {
  //instantiate state management - keeps logic out of components
  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded,token,appLoaded} =rootStore.commonStore;
  const {getUser,isLoggedIn} = rootStore.userStore;
  const {songs,getPlaylists} = rootStore.playlistStore;
  useEffect(() => {
    if (isLoggedIn) {
     getUser().finally(()=>setAppLoaded()).then(()=>getPlaylists());
    } else {
      setAppLoaded();
    }
   
  }, [setAppLoaded, getUser, token,songs,isLoggedIn,getPlaylists]);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;

  return (
      <Fragment>
        <ToastContainer position="top-right"/>
        <ModalContainers />
        <Route exact path="/" component={Homepage} />
        <Route
          path={"/(.+)"}
          render={() => (
            <Fragment>
                <Switch>
                  <Route exact path="/player" component={MainPlayer} />
                  <Route component={NotFound} /> 
                </Switch>
            </Fragment>
          )}
        />
      </Fragment>
    );
 
}
 
export default withRouter(observer(App));
