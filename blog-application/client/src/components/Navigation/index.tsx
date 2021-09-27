import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Nav, Navbar, NavbarBrand, NavbarText } from 'reactstrap';
import { IApplicationProps } from '../../application';
import UserContext, { initialUserState } from '../../contexts/user';

export interface INavigationProps { }

const Navigation: React.FunctionComponent<IApplicationProps> = props => {
    const userContext = useContext(UserContext);
    const { user } = userContext.userState;

    const logout = () => userContext.userDispatch({ type: "logout", payload: initialUserState });

    return (
        <Navbar color="light" light sticky="top" expand="md">
            <Container>
                <NavbarBrand tag={Link} to={"/"}>📝</NavbarBrand>
                <Nav className="mr-auto" navbar />
                {user._id === "" ?
                    <div>
                        <NavbarText tag={Link} to={"/login"}>Login</NavbarText>
                        <NavbarText className="mr-2 ml-2" >|</NavbarText>
                        <NavbarText tag={Link} to={"/register"}>Sign Up</NavbarText>
                    </div>
                    :
                    <div>
                        <Button outline tag={Link} to={"/edit"}>Post a Blog</Button>
                        <NavbarText className={"mr-2 ml-2"}>|</NavbarText>
                        <Button outline size="sm" onClick={() => logout()}>Logout</Button>
                    </div>
                }
            </Container>
        </Navbar>
    );
};

export default Navigation;
