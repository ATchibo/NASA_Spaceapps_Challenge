import React from 'react';
import NavbarComponent from "../components/NavbarComponent";
import MainChat from "../components/MainChat";
import {FormattedMessage} from "react-intl";

const HomePage = () => {
    return (
        <div>
            <NavbarComponent />
            <h5
                className="
                    text-4xl
                    font-bold
                    tracking-tight
                    text-gray-900
                    text-center
                    mt-8
                    mb-10
                "
            >
                <FormattedMessage id="main_page_title" />
            </h5>
            <MainChat />
        </div>
    );
};

export default HomePage;
