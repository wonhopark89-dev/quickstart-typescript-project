import React, { useEffect, useReducer, useState } from 'react';
import { Route, RouteChildrenProps, Switch } from 'react-router';
import AuthRoute from './components/AuthRoute/indext';
import LoadingComponent from './components/LoadingComponent';
import logging from './config/logging';
import routes from './config/route';
import { initialUserState, IUserContextProps, UserContextProvider, userReducer } from './contexts/user';
import { Validate } from './modules/auth';
export interface IApplicationProps {

}

const Application: React.FunctionComponent<IApplicationProps> = props => {
    const [userState, userDispatch] = useReducer(userReducer, initialUserState);
    const [loading, setLoading] = useState<boolean>(true);

    /** User for debugging */
    const [authStage, setAuthStage] = useState<string>("Checking localstorage....");

    useEffect(() => {
        setTimeout(() => {
            CheckLocalStorageForCredintials();
        }, 1000);
    }, []);

    /** 
     * Check to see if we have a token
     * If we do, verify it with the backend
     * If not, we are logged out initially/
     */
    const CheckLocalStorageForCredintials = () => {
        setAuthStage("Checking credentials ...");
        const fire_token = localStorage.getItem("fire_token");

        if (fire_token === null) {
            userDispatch({ type: "logout", payload: initialUserState });
            setAuthStage("No credentials found.");
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } else {
            /** validate with the backend */
            setAuthStage("Credentials found. validateing ...");

            return Validate(fire_token, (error, user) => {
                if (error) {
                    logging.error(error);
                    setAuthStage("User not valid, logging out ...");
                    userDispatch({ type: "logout", payload: initialUserState });
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                } else if (user) {
                    setAuthStage("User authenticated ...");
                    userDispatch({ type: "login", payload: { user, fire_token } });
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                }
            });
        }
    };

    const userContextValues: IUserContextProps = {
        userState,
        userDispatch,
    };


    if (loading) {
        return <LoadingComponent>{authStage}</LoadingComponent>;
    }

    return (
        <UserContextProvider value={userContextValues}>
            <Switch>
                {routes.map((route, index) => {
                    // 각 라우터들의 Auth 를 체크
                    if (route.auth) {
                        <Route key={index} exact={route.exact} path={route.path}
                            render={(routeProps: RouteChildrenProps<any>) =>
                                <AuthRoute>
                                    <route.component {...routeProps} />
                                </AuthRoute>
                            }
                        />;
                    }

                    return (
                        <Route key={index} exact={route.exact} path={route.path}
                            render={(routeProps: RouteChildrenProps<any>) =>
                                <route.component {...routeProps} />}
                        />
                    );
                })}
            </Switch>
        </UserContextProvider>
    );
};

export default Application;