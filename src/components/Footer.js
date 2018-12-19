import React, { Component } from 'react';

import Logo from './Logo';


class Footer extends Component {
    render() {
        const year = new Date().getFullYear();

        return (
            <footer className="footer">
                    <div className="logo-wrapper">
                        <Logo
                            style={{ width: '60px' }}
                            type="small"
                            href="#"
                        />
                    </div>
                <p>© 2018 {year > 2018 ? `– ${year}` : ''} Roman Popov All Rights Reserved</p>
            </footer>
        )
    }
}

export default Footer
