import { Tab } from "semantic-ui-react"
import { LoginForm } from "./LoginForm"
import { RegistrationForm } from "./RegistrationForm"

const panes = [
    {menuItem: "Log in", render: ()=> <Tab.Pane><LoginForm/></Tab.Pane>},
    {menuItem: "Register", render: ()=> <Tab.Pane><RegistrationForm/></Tab.Pane>}
]
export const Usertab = () => <Tab panes={panes}/>

