import * as React from 'react';
import { GraphQLSchema } from '../../graphql/index';
import { Mutation } from 'react-apollo';
import { UserConsumer } from '../../context/userContext';

const LoginComponent: React.FC<any> = (props: any) => {
  let emailRef: HTMLInputElement | null;
  let passwordRef: HTMLInputElement | null;

  return (
    <UserConsumer>
      {({ setAuth }) => {
        return (
          <Mutation mutation={ GraphQLSchema.LOGIN }>
            {( login, { error, loading } ) => (
              <React.Fragment>
                <form onSubmit={e => {
                  e.preventDefault();
                  login({
                    variables: { 
                      username: emailRef!.value,
                      password: passwordRef!.value,
                    }
                  }).then ((res: any) => {
                    if (res != null) {
                      localStorage.setItem("token", res.data.login)
                      setAuth(true);
                    }
                  }).catch(e => {e.message});
                }}>
                <input type="email" ref={ node => emailRef = node }/>
                <input type="password" ref={ node => passwordRef = node }/>
                <button type="submit">Login</button>
                { loading && (
                  <p>{ loading }</p>
                )}
                { error && (
                  <p>{ error.message }</p>
                )}
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