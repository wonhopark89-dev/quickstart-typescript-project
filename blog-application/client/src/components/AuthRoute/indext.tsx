import React, { useContext } from "react";
import { Redirect } from 'react-router';
import logging from '../../config/logging';
import UserContext from '../../contexts/user';

export interface IAuthRouteProps { }

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props;

    const { user } = useContext(UserContext).userState; // context api

    // chech auth
    if (user._id === "") {
        logging.info("Unauthorized, redirectiong ....");
        return <Redirect to="/login" />;
    } else {
        return <>{children}</>;
    }
};

export default AuthRoute;