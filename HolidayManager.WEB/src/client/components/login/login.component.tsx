import * as React from 'react';
import { GraphQLSchema } from '../../graphql/index';
import { Mutation } from 'react-apollo';
import { AppContext } from '../../context/appContext';
import LayoutContainer from '../../layout';
import { Redirect } from 'react-router';

const LoginComponent: React.FC<any> = (props: any) => {
	let emailRef: HTMLInputElement | null;
	let passwordRef: HTMLInputElement | null;
	const { setAuth, isAuth, isApp } = React.useContext(AppContext);

	if ( isAuth && isApp === false) {
		return (
			<Redirect to="/holidayrequest" />
		)
	}

	return (
		<LayoutContainer>
		<div className="login">
			<Mutation mutation={ GraphQLSchema.LOGIN }>
				{( login, { error } ) => (
					<div className="login__container">
						<h4 className="login__header">Signin to IMPACT HM</h4>
						<form className="login__form" onSubmit={e => {
							e.preventDefault();
							login({
							variables: { 
								username: emailRef!.value,
								password: passwordRef!.value,
							}}).then ((res: any) => {
								if (res != null) {
									localStorage.setItem("token", res.data.login);
									setAuth(true);
								}
							}).catch (e => {e.message});
						}}>
							<input className="login__input" placeholder="E-mail address" type="email" ref={ node => emailRef = node }/>
							<input className="login__input" placeholder="Password" type="password" ref={ node => passwordRef = node }/>
							<button className="login__submit" type="submit">Login</button>
							{ error && (
							<p>{ error.message }</p>
						)}
						</form>
					</div>
				)}
			</Mutation>
		</div>
		</LayoutContainer>
	);
};

export default LoginComponent;