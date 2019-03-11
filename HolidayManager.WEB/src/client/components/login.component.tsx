import * as React from 'react';
import { GraphQLSchema } from '../graphql/index';
import { Mutation } from 'react-apollo';
import { UserConsumer } from '../context/userContext';

const redirect = (data: any, props: any) => {
  localStorage.setItem("token", data.login);
  props.history.push("/protected");
}

const LoginComponent: React.FC<any> = (props: any) => {
  let emailRef: HTMLInputElement | null;
  let passwordRef: HTMLInputElement | null;

  return (
    <UserConsumer>
      {({ setAuth }) => {
        return (
          <Mutation mutation={ GraphQLSchema.LOGIN }>
            {( login, { data, error, loading } ) => (
              <React.Fragment>
                <form onSubmit={e => {
                  e.preventDefault();
                  login({
                    variables: { 
                      username: emailRef!.value,
                      password: passwordRef!.value,
                    }
                  });
                }}>
                <input type="email" ref={ node => emailRef = node }/>
                <input type="password" ref={ node => passwordRef = node }/>
                <button type="submit">Login</button>
                { loading && (
                  <p>{ loading }</p>
                )}
                { error && (
                  <p>{ error.message }, { props.history.length }</p>
                )}
                { data && redirect(data, props)}
                </form>
              </React.Fragment>
            )}
          </Mutation>
        )
      }}
    </UserConsumer>
  );
};

export default LoginComponent;