import { AuthProvider } from '@firebase/auth';
import React, { useContext, useState } from "react";
import { useHistory } from 'react-router';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import CenterPiece from '../components/CenterPiece';
import ErrorText from '../components/ErrorText';
import LoadingComponent from '../components/LoadingComponent';
import { Providers } from '../config/firebase';
import logging from '../config/logging';
import UserContext from '../contexts/user';
import IPageProps from '../interfaces/page';
import { SignInWithSocialMedia as SocialMediaPopup } from '../modules/auth';

const LoginPage: React.FunctionComponent<IPageProps> = props => {
    const [authentication, setAuthentication] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const userContext = useContext(UserContext);
    const history = useHistory();
    const isLogin = window.location.pathname.includes("login");

    const SignInWithSocialMedia = (provider: AuthProvider) => {
        if (error !== "") {
            setError("");
        }

        setAuthentication(true);
        SocialMediaPopup(provider).then(async (result) => {
            // logging.info(result); // Fixme: tsc error, TS2345
            logging.info(JSON.stringify(result)); // todo: check
            let user = result.user;
            if (user) {
                let uid = user.uid;
                let name = user.displayName;

                if (name) {
                    try {
                        let fire_token = await user.getIdToken();
                        /** if we get a token, auth with the backend */
                    } catch (error) {
                        setError("Invalid token.");
                        logging.error(JSON.stringify(error)); // Fixme: tsc error, TS2345
                        setAuthentication(false);
                    }
                } else {
                    /**
                     * If no name is returned, we could have a custom form
                     * here getting the user`s name, depending on the provider
                     * you are using. Goolge generally returns ones, let`s just use that for new.
                     */
                    setError("The identify provider does not have a name");
                    setAuthentication(false);
                }
            } else {
                setError("The identity privder is missing a lot of necessary information. Please try another account or provider");
                setAuthentication(false);
            }
        }).catch(error => {
            setError(error.message);
            setAuthentication(false);
        });
    };

    return (
        <CenterPiece>
            <Card>
                <CardHeader>
                    {isLogin ? "Login" : "Sign Up"}
                </CardHeader>
                <CardBody>
                    <ErrorText error={error} />
                    <Button block
                        disabled={authentication}
                        onClick={() => SignInWithSocialMedia(Providers.google)}
                        style={{ backgroundColor: "#EA4335", borderColor: "#EA4335" }}>
                        <i className="fab fa-google mr-2" />
                        Sign {isLogin ? "in" : "up"} with Google
                    </Button>
                    {authentication && <LoadingComponent card={false} />}
                </CardBody>
            </Card>
        </CenterPiece>
    );
};

export default LoginPage;