import  { useContext } from 'react';
import { RootStoreContext } from '../../App/Stores/rootstore';
import {Form as ReactForm, Field } from "react-final-form";
import { IRegister } from '../../App/Models/Forms';
import { Button, Form, Header } from 'semantic-ui-react';
import TextInput from '../../App/Util/TextInput';
import ErrorMessage from '../../App/Util/errormessage';
import { FORM_ERROR } from 'final-form';
import {combineValidators,isRequired} from 'revalidate';

const validate = combineValidators({
  username: isRequired("Username"),
  email: isRequired("E-mail"),
  password: isRequired("Password")
})


export const RegistrationForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {signin } = rootStore.userStore;
    return (
      <ReactForm
        onSubmit={(form: IRegister) => signin(form).catch(error => ({ [FORM_ERROR]: error }))}
        validate={validate}
        render={({handleSubmit,submitting, submitError,invalid, pristine,dirtySinceLastSubmit }) => 
        ( <Form onSubmit={handleSubmit} error>
            <Header as="h2"content="Sign Up" textAlign="center" color="green" />
            <Field name="username" component={TextInput} placeholder="Username" />
            <Field name="email" component={TextInput} placeholder="E-mail" />
            <Field name="password" component={TextInput} placeholder="Password" type="password"/>
            {submitError && !dirtySinceLastSubmit && (
              <ErrorMessage error={submitError} />
            )}
            <Button disabled={(invalid && !dirtySinceLastSubmit) || pristine}
              loading={submitting} content="Create" fluid  color="green"/>
          </Form>
        )}
      />
    );
  };