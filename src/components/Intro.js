import React, { Component } from 'react';

import Logo from './Logo';

class Intro extends Component {

    state = {
        available: false,
        orientationTrigger: window.matchMedia('(orientation:landscape)'),
        logoChangeTypeTrigger: window.matchMedia('(max-width: 750px) and (min-aspect-ratio: 1/2)'),
        logoChangeType: window.matchMedia('(max-width: 750px) and (min-aspect-ratio: 1/2)').matches
    }

    componentDidMount() {
        const { orientationTrigger, logoChangeTypeTrigger } = this.state,
            blinkText = document.getElementById('blink-text'),
            blinkLetters = [...blinkText.querySelectorAll('i:not(.underscore)')],
            blinkUnderscore = blinkText.querySelector('.underscore'),
            status = blinkText.querySelector('.status');
        let i = 0;

        const interval = setInterval(() => {
            if (i > blinkLetters.length - 1) {
                clearInterval(interval);
                blinkUnderscore.classList.remove('hidden');
                status.classList.remove('hidden');
            } else {
                blinkLetters[i].classList.remove('hidden');
                i++;
            }
        }, 50);

        orientationTrigger.addListener(this.handleMobileHeight);
        logoChangeTypeTrigger.addListener(this.changeLogoType);
    }

    componentWillUnmount() {
        const { orientationTrigger, logoChangeTypeTrigger } = this.state;

        orientationTrigger.removeListener(this.handleMobileHeight);
        logoChangeTypeTrigger.removeListener(this.changeLogoType);
    }

    generateBlinkText = (textString) => {
        return [...textString].map((letter, idx) => <i key={idx} className="hidden">{letter}</i>)
    }

    toggleMenu = () => {
        document.getElementById('hamburger-icon').classList.toggle('active');
        document.getElementById('menu').classList.toggle('visible');
    }

    handleKeyboard = (e) => {
        const root = document.getElementById('root'),
            menu = document.getElementById('menu'),
            firstItem = document.getElementById('hamburger-icon'),
            lastItem = document.querySelector('#menu a:last-child'),
            key = e.key;

        if ((key === 'Tab') && (menu.clientWidth === root.clientWidth)) {
            if (e.shiftKey && (e.target === firstItem)) {
                e.preventDefault();
                lastItem.focus();
            } else if (!e.shiftKey && (e.target === lastItem)) {
                e.preventDefault();
                firstItem.focus();
            }
        }

        if (key === 'Escape' && menu.classList.contains('visible')) {
            this.toggleMenu();
        }

        if (key === 'Space' || key === 'Spacebar' || key === ' ') {
            e.preventDefault();
            e.target.click();
        }
    }

    closeModal = (e) => {
        const root = document.getElementById('root'),
            menu = document.getElementById('menu');

        if ((e.target === menu) && (menu.clientWidth === root.clientWidth)) {
            this.toggleMenu();
        }
    }

    handleMobileHeight = () => {
        const vh = `${window.innerHeight / 100}px`,
            vmin = `${Math.min(window.innerHeight, window.innerWidth) / 100}px`;

        document.getElementById('intro').style.cssText = `height: ${window.innerHeight}px; --vh: ${vh}; --vmin: ${vmin}`;
    }

    changeLogoType = () => {
        const { logoChangeTypeTrigger } = this.state;
        this.setState({ logoChangeType: logoChangeTypeTrigger.matches })
    }


    render() {
        const { available, logoChangeType } = this.state,
            vh = `${window.innerHeight / 100}px`,
            vmin = `${Math.min(window.innerHeight, window.innerWidth) / 100}px`;

        return (
            <header id='intro' style={{ height: `${window.innerHeight}px`, '--vh': `${vh}`, '--vmin': `${vmin}` }}>
                <h1 id="home">Roman Popov Web Developer</h1>

                <div id="menu-wrapper" onKeyDown={this.handleKeyboard} onClick={this.closeModal}>
                    <button
                        id="hamburger-icon"
                        onClick={this.toggleMenu}
                        title="Toggle menu visibility"
                    >
                        <span><i></i></span>
                        <b>Menu</b>
                    </button>

                    <nav id="menu">
                        {['Home', 'About', 'Projects', 'Contacts'].map((elem, index) => (
                            <a
                                key={index}
                                className="nav-item"
                                href={`#${elem.toLocaleLowerCase()}`}
                                onClick={this.toggleMenu}
                                title={`Go to ${elem} section`}
                            >
                                {elem}
                            </a>
                        ))}
                    </nav>
                </div>


                <div id="blink-text">
                    <div className="logo-wrapper">
                        <Logo
                            style={logoChangeType ? { height: '4em' } : { height: '100%' }}
                            type={logoChangeType ? 'tiny anim' : 'medium'}
                        />
                    </div>

                    <p>{this.generateBlinkText('Hello, my name is Roman Popov')}</p>
                    <p>{this.generateBlinkText('I am Front-End Web Developer')}</p>
                    <p>
                        <span>
                            {this.generateBlinkText('Current status:')}
                            <i className="hidden underscore"></i>
                        </span>

                        {available ?
                            <a href="#contacts" className="hidden status available" title="Go to contacts section">Available for hire</a> :
                            <span className="hidden status busy">Unavailable</span>
                        }
                    </p>
                </div>

                <button
                    className="arrow"
                    onClick={() => document.querySelector('.section-logo').scrollIntoView()}
                    title="Skip to content"
                >
                    <span>Explore portfolio</span>
                </button>

            </header>
        )
    }
}

export default Intro
