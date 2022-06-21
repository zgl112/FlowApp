import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import Friendstab from "./Friends";
import Settingstab from "./Settings";


const panes = [
    { menuItem: 'Friends', render: () => <Tab.Pane > <Friendstab/></Tab.Pane> },
    { menuItem: 'Settings', render: () => <Tab.Pane><Settingstab/></Tab.Pane> },
 
   
  ]

const Extras =() => {
    return (<Tab className="rightBar" panes={panes} />);
}
export default observer(Extras)