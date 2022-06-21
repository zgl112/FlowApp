import React, { useContext } from "react";
import { Button, Container, Header } from "semantic-ui-react";
import { RootStoreContext } from "../../../App/Stores/rootstore";

const Friendstab= () => {
return(<Container>
    <Header as="h3" inverted content="Additional features to be added soon!"/>
    <Header as="h3" inverted content="See what your friends are playing"/>
    <Button >Find Friends</Button>
</Container>);
}
export default Friendstab;