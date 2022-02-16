import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from '../App/useUser';
import { createUseStyles } from 'react-jss';
import { LinkContainer } from 'react-router-bootstrap';

const useStyles = createUseStyles({
    wrapper: {
        padding: [15],
    }
});

export default function Navigation() {
    const classes = useStyles();
    const { user, removeUser } = useContext(UserContext);
    return (
        <div className={classes.wrapper}>
            <Navbar className="justify-content-between" expand="lg">
                <LinkContainer to="/"><Navbar.Brand>
                    Chocolate Fiesta Cloud β
                </Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/library"><Nav.Link>Models Library</Nav.Link></LinkContainer>
                        <LinkContainer to="/draw-print"><Nav.Link>Drawing Print</Nav.Link></LinkContainer>
                        <LinkContainer to="/stl-generator"><Nav.Link>3D Text Generator</Nav.Link></LinkContainer>
                        {/* <Nav.Link href="#">Слайсер</Nav.Link> */}
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link disabled={true}>You are logged in as {user.user.email}</Nav.Link>
                        <Nav.Link onClick={removeUser}>Log out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}