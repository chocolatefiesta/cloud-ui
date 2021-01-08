import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from '../App/useUser';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        padding: [15],
    }
});

export default function Navigation() {
    const classes = useStyles();
    const { user, removeUser } = useContext(UserContext);
    console.log(user);
    return (
        <div className={classes.wrapper}>
            <Navbar className="justify-content-between" expand="lg">
                <Navbar.Brand href="/">
                    Chocolate Fiesta Cloud
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/library">Библиотека моделей</Nav.Link>
                        <Nav.Link href="/drawing-print">Печать рисунка</Nav.Link>
                        <Nav.Link href="/draw">Рисование</Nav.Link>
                        <Nav.Link href="/text2stl">Конструктор 3D текста</Nav.Link>
                        <Nav.Link href="#">Слайсер</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link disabled={true}>Вы вошли как {user.user.email}</Nav.Link>
                        <Nav.Link onClick={removeUser}>Выйти</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}