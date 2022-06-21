import React, {  useContext } from 'react'
import { RootStoreContext } from '../../App/Stores/rootstore';
import { toast } from 'react-toastify';

import TextInput from '../../App/Util/TextInput';
import {Form as ReactForm, Field } from "react-final-form";
import { Button, Menu ,Form} from 'semantic-ui-react';
import { IData } from '../../App/Models/playerInterface';
const SearchForm = ()=>{
    const rootStore = useContext(RootStoreContext);
    const {searchSongs} = rootStore.playlistStore;
    return(
        <Menu.Item>
         <ReactForm
              onSubmit={(search : IData) =>{
              searchSongs(search);
              toast.error("Search feature is in development phase!")
              }}
              render={({handleSubmit})=> 
              (
                <Form onSubmit={handleSubmit} size="tiny" >
                  <Field name="title" component={TextInput} placeholder="Search artists, songs or albums...">
                  <Button icon="search"  color="orange" /></Field>
                  
                </Form>
              )}/>
    </Menu.Item>
    );
}
export default SearchForm;