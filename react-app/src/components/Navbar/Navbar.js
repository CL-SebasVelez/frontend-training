import React from 'react';
import Nav from 'emerald-ui/lib/Nav';
import Icon from 'emerald-ui/lib/Icon';
import Avatar from 'emerald-ui/lib/Avatar';
import Navbar from 'emerald-ui/lib/Navbar';
import DropdownItem from 'emerald-ui/lib/DropdownItem';
import DropdownButton from 'emerald-ui/lib/DropdownButton';

const styles = {
  pageLogo: {
    width: '27.5%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  userAvatar: {
    width: '27.5%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  navBar: {
    position: 'fixed',
    top: 0,
    width: '100%',
  },
};

function NavbarComponent(props) {
  return (
    <Navbar breakAt="lg" style={styles.navBar}>
      <Navbar.Brand id="page-logo" style={styles.pageLogo}>
        <h2 style={{ margin: 0 }}>
          <a href="#foo">
            <img
              src="/images/logo.svg"
              alt="News,The best news."
              className="m-20"
            />
          </a>
        </h2>
      </Navbar.Brand>
      <Nav grow collapsible>
        <DropdownButton title="Services" id="dd1">
          <DropdownItem eventKey="1">
            <Icon name="sports_basketball" />
            Sports
          </DropdownItem>
          <DropdownItem eventKey="2">
            <Icon name="sports_esports" />
            Entertainment
          </DropdownItem>
          <DropdownItem eventKey="3">
            <Icon name="monetization_on" />
            Economics
          </DropdownItem>
          <DropdownItem eventKey="4">
            <Icon name="smartphone" />
            Technology
          </DropdownItem>
          <DropdownItem eventKey="5">
            <Icon name="favorite_border" />
            Health
          </DropdownItem>
        </DropdownButton>
        <a href="#foo">Editorial</a>
        <a href="#foo">Contact us</a>
      </Nav>
      <Nav collapsible style={styles.userAvatar}>
        <a href="#foo">
          <Avatar title="JS" />
        </a>
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
