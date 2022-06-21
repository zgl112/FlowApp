import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button,Image } from "semantic-ui-react";
import { RootStoreContext } from "../../App/Stores/rootstore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useWindowDimensions from '../../App/Util/useWindowDimension';


//homepage including a conditional statement based if a user is logged in or a guest 

export const Homepage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user, guestTemps } = rootStore.userStore;
  const { width } = useWindowDimensions();


    return (
      (width > 450) ? (<Segment  textAlign="center" vertical className="homemaster">   
      <Container text >
        <Image centered src={require("../../App/Assets/logo.png")} alt="logo" />
        <Header as="h1" inverted >
         Flow
        </Header>
       {!isLoggedIn && <Header as="h2" inverted content="Brings music to life."/>}
        {isLoggedIn && user ? (
          <Fragment>
            <Header
              as="h2"
              inverted
            >Welcome, {user.username}!</Header>
            <Button as={Link} to="/player" size="medium" >
              Launch the web player!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              onClick={() => guestTemps()}
              size="medium"
              content="Guest Mode"
              />
              <Fragment>
            <Button
              onClick={() =>{
            toast.error("User authentication to be implemented in next release")}
            }
              size="medium"
              content="Log in"
              />
              
          </Fragment>
          </Fragment>
        )}
      </Container>
    </Segment>) 
    
    :
    
    (<Segment  textAlign="center" vertical className="homemastermobile">   
    <Container text >
      <Image centered src={require("../../App/Assets/logo.png")} alt="logo" />
      <Header as="h1" inverted >
       Flow
      </Header>
     {!isLoggedIn && <Header as="h2" inverted content="Brings music to life."/>}
      {isLoggedIn && user ? (
        <Fragment>
          <Header
            as="h2"
            inverted
          >Welcome, {user.username}!</Header>
          <Button as={Link} to="/player" size="medium" >
            Launch the web player!
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <Button
            onClick={() => guestTemps()}
            size="medium"
            content="Guest Mode"
            />
            <Fragment>
          <Button
            onClick={() =>{
          toast.error("User authentication to be implemented in next release")}
          }
            size="medium"
            content="Log in"
            />
            
        </Fragment>
        </Fragment>
      )}
    </Container>
  </Segment>)
    );
};

