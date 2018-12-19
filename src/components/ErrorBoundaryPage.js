import React, { Component } from 'react';

import gmailIcon from '../images/gmail.svg';
import gitHubIcon from '../images/github.svg';
import linkedInIcon from '../images/linkedin.svg';
import telegramIcon from '../images/telegram.svg';
import vkIcon from '../images/vkontakte.svg';

import ClipboardJS from 'clipboard';

class ErrorBoundaryPage extends Component {
    state = {
        error: null,
        errorInfo: null,
        clipboard: null
    }

    componentDidCatch(error, errorInfo) {
        var clipboard = new ClipboardJS('.copy-to-clipboard');

        clipboard.on('success', function (e) {
            e.trigger.classList.add('success')

            setTimeout(() => {
                e.trigger.classList.remove('success')
            }, 1250);
            e.clearSelection();
        });

        clipboard.on('error', function (e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
        });

        this.setState({
            error: error,
            errorInfo: errorInfo,
            clipboard: clipboard
        })
    }

    componentWillUnmount() {
        this.state.clipboard && this.state.clipboard.destroy();
    }

    render() {
        const { error, errorInfo } = this.state,
            year = new Date().getFullYear();

        if (errorInfo) {
            // Error path
            const subject = encodeURIComponent('Event-planner bug report'),
                location = window.location.href,
                shortErrStack = error.stack.split('\n').slice(0,6).join('\n'),
                description = encodeURIComponent(`Location: ${location}\n\nError: ${error.toString()}\n\nError stack: ${shortErrStack}\n\nError info componentStack: ${errorInfo.componentStack}`);

            window.scrollTo(0, 0);

            return (
                <section className="error-boundary-page">

                    <header>
                        <h2>...Oops</h2>
                        <h2>An error has occurred!</h2>
                    </header>

                    <main>
                        <button
                            className="summary"
                            title="Toggle technical details section visibility"
                            onClick={(e) => {
                                const bugInfo = e.target.nextElementSibling;

                                bugInfo.classList.toggle('visible');
                                bugInfo.classList.contains('visible') ?
                                    e.target.innerText = 'Hide technical details' :
                                    e.target.innerText = 'Show technical details';
                            }}
                        >
                            Show technical details
                        </button>

                        <div className="bug-info-wrapper">
                            <article id="bug-info">
                                <div><b>Location:</b> {location}</div>
                                <div><b>Error:</b> {error.toString()}</div>
                                <div>
                                    <b>Error stack:</b>
                                    <ul>
                                        {error.stack.split('\n').map((line, index) => {
                                            return line ? (
                                                <li key={index}>{line}</li>
                                            ) : ''
                                        })}
                                    </ul>
                                </div>
                                <div>
                                    <b>Error componentStack:</b>
                                    <ul>
                                        {errorInfo.componentStack.split('\n').map((line, index) => {
                                            return line ? (
                                                <li key={index}>{line}</li>
                                            ) : ''
                                        })}
                                    </ul>
                                </div>
                            </article>

                            <div className="copy-panel">
                                <button
                                    className="copy-to-clipboard btn"
                                    data-clipboard-target="#bug-info"
                                    title="Copy whole information about error to clipboard"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>

                        <a
                            href={`mailto:popov.r.k.18@gmail.com?subject=${subject}&body=${description}`}
                            className="btn btn-send-report"
                            title="Click to create an email automatically"
                            draggable="false"
                        >
                            Send bug report
                        </a>

                        <p className="send-report-notes">Your default mail client for sending an email will be open</p>

                        <p>or</p>

                        <button
                            className="btn"
                            title="Try to reload the page"
                            onClick={() => window.location.replace(process.env.PUBLIC_URL || '/')}
                        >
                            Try to reload the page
                        </button>
                    </main>




                    <footer className="footer">
                        <div className="contacts">
                            <a href="mailto:popov.r.k.18@gmail.com" title="popov.r.k.18@gmail.com">
                                Email <img src={gmailIcon} alt="Email" />
                            </a>
                            <a href="https://github.com/Roman-Popov" title="GitHub">
                                GitHub <img src={gitHubIcon} alt="GitHub" />
                            </a>
                            <a href="https://linkedin.com/in/-roman-popov-/" title="LinkedIn">
                                LinkedIn <img src={linkedInIcon} alt="LinkedIn" />
                            </a>
                            <a href="https://t.me/Barmalew" title="Telegram">
                                Telegram <img src={telegramIcon} alt="Telegram" />
                            </a>
                            <a href="https://vk.com/vk.popovroman" title="Vkontakte">
                                Vkontakte <img src={vkIcon} alt="Vkontakte" />
                            </a>
                        </div>
                        <span className="copyright">© 2018 {year > 2018 ? `– ${year}` : ''} Roman Popov All Rights Reserved</span>
                    </footer>
                </section>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}

export default ErrorBoundaryPage
