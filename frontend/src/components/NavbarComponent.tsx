import React from 'react';
import {Navbar} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import Logo from "../logo.png";

const NavbarComponent = () => {
    return (
        <Navbar
            className="bg-white border-gray-100"
            fluid
        >

            <Navbar.Brand>
                <img
                    alt="Flowbite React Logo"
                    className="mr-3 h-6 sm:h-9"
                    src={Logo}
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                  <FormattedMessage id="app_title"/>
                </span>
            </Navbar.Brand>
        </Navbar>
    );
};

export default NavbarComponent;
