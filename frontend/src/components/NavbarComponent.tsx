import React from 'react';
import {Navbar} from "flowbite-react";
import {FormattedMessage} from "react-intl";

const NavbarComponent = () => {
    return (
        <Navbar
            fluid
            rounded
        >

            <Navbar.Brand
                href="https://flowbite-react.com"
            >
                <img
                    alt="Flowbite React Logo"
                    className="mr-3 h-6 sm:h-9"
                    src="/favicon.svg"
                />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              <FormattedMessage id="app_title"/>
            </span>
            </Navbar.Brand>

            <Navbar.Toggle />

            <Navbar.Collapse>
                <Navbar.Link
                    active
                    href="#"
                >
                    <p>
                        Home
                    </p>
                </Navbar.Link>
                <Navbar.Link
                    href="#"
                >
                    <p>
                        About
                    </p>
                </Navbar.Link>
                <Navbar.Link href="#">
                    Services
                </Navbar.Link>
                <Navbar.Link href="#">
                    Pricing
                </Navbar.Link>
                <Navbar.Link href="#">
                    Contact
                </Navbar.Link>
            </Navbar.Collapse>

        </Navbar>
    );
};

export default NavbarComponent;
