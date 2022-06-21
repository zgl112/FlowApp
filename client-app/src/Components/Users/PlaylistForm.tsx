import React, { useContext } from "react";
import {Form as ReactForm, Field } from "react-final-form";
import { Button, Form, Header, Icon, Modal } from "semantic-ui-react";
import { IPlaylist } from "../../App/Models/Playlist";
import { IUser } from "../../App/Models/User";
import { RootStoreContext } from "../../App/Stores/rootstore";
import TextInput from "../../App/Util/TextInput";
import {toast} from "react-toastify"

const Playlistform= () => {
  const rootStore = useContext(RootStoreContext);
  const{createPlaylist}=rootStore.playlistStore;
  const [open, setOpen] = React.useState(false)
  return(
        <Modal
          size="tiny"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Icon name="add"></Icon>}>
            <Modal.Content > 
              <ReactForm
              onSubmit={(name : IPlaylist) =>{
                toast.error("Playlist feature is not released yet!")
                let parseUser = JSON.parse(sessionStorage.getItem("user")!);
                const user : IUser = parseUser;
                name.userid =user.id;
                createPlaylist(name);
                setOpen(false);
               
              }}
              render={({handleSubmit})=> 
              (
                <Form onSubmit={handleSubmit}>
                  <Header as="h4"content="Create a new playlist!"textAlign="center" color="orange" />
                    <Field name="playlistname" component={TextInput} placeholder="Playlist name..."/>
                  <Button content="Create" color="orange" />
                  <Button content="Cancel" onClick={()=>setOpen(false)}  />
                </Form>
              )}/>
             </Modal.Content>
        </Modal>
   )
}
export default Playlistform;