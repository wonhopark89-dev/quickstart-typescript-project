import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavbarBrand } from 'reactstrap';
import { IApplicationProps } from '../../application';

export interface INavigationProps { }

const Navigation: React.FunctionComponent<IApplicationProps> = props => {
    return (
        <Navbar color="light" ligh sticky="top" expand="md">
            <Container>
                <NavbarBrand tag={Link} to={"/"}>📝</NavbarBrand>
                <Nav className="mr-auto" navbar />
            </Container>
        </Navbar>);
};

export default Navigation;
