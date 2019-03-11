import * as React from 'react';
import { GraphQLSchema } from '../graphql/index';
import { Mutation } from 'react-apollo';

interface IAppProps {
}

const LoginComponent: React.FC<IAppProps> = (props) => {
  let emailRef: HTMLInputElement | null;
  let passwordRef: HTMLInputElement | null;

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
         <input type="password" ref={node => passwordRef = node }/>
         <button type="submit">Login</button>
         { loading && (
           <p>{ loading }</p>
         )}
         { error && (
           <p>{ error.message }</p>
         )}
         { data && (
           <p>{ data.login }</p>
         )}
        </form>
       </React.Fragment>
     )}
    </Mutation>
  );
};

export default LoginComponent;