

import { Navbar, Nav, Dropdown } from 'rsuite'

function TopNav() {
    return (
        <div>
            <Navbar>
                <Navbar.Brand href="#">
                    RSUITE
                </Navbar.Brand>
                <Nav>
                    <Nav.Item>Home</Nav.Item>
                    <Nav.Item>News</Nav.Item>
                    <Nav.Item>Products</Nav.Item>
                    <Dropdown title="About">
                        <Dropdown.Item>Company</Dropdown.Item>
                        <Dropdown.Item>Team</Dropdown.Item>
                        <Dropdown.Item>Contact</Dropdown.Item>
                    </Dropdown>
                </Nav>
                <Nav pullRight>
                    <Nav.Item>Settings</Nav.Item>
                </Nav>
            </Navbar>
        </div>
    );
}

export default TopNav;


