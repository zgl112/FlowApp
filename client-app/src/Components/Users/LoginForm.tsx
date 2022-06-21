import React, { useContext } from 'react';
import { RootStoreContext } from '../../App/Stores/rootstore';
import {Form as ReactForm, Field } from "react-final-form";
import { ILogin } from '../../App/Models/Forms';
import { Button, Form, Header } from 'semantic-ui-react';
import TextInput from '../../App/Util/TextInput';
import ErrorMessage from '../../App/Util/errormessage';
import {combineValidators,isRequired} from 'revalidate';
import { FORM_ERROR } from 'final-form';

const validate = combineValidators({
  email: isRequired("Email"),
  password: isRequired("Password")
})

 export const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {login} = rootStore.userStore;
    return(
        <ReactForm
         onSubmit={(form : ILogin) =>login(form).catch(error =>
            ({[FORM_ERROR]: error}))}
        validate={validate}
        render={({handleSubmit,submitting,submitError,invalid,pristine, dirtySinceLastSubmit})=> 
        (
          <Form onSubmit={handleSubmit} error>
            <Header as="h2"content="Login"textAlign="center" color="green" />
            <Field name="email" component={TextInput} placeholder="E-mail" />
            <Field name="password" component={TextInput} placeholder="Password" type="password"
            />
            {submitError && !dirtySinceLastSubmit && (
              <ErrorMessage error={submitError} text="Invalid e-mail or password!"/>)
            }
            <Button
              disabled={(invalid && !dirtySinceLastSubmit) || pristine}loading={submitting}content="Login"fluid color="green" />
          </Form>
          
        )}
      />
    );
}
