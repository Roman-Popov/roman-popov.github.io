import React, { Component } from 'react';

import sectionLogo from '../images/contacts.svg';
import gitHubIcon from '../images/github.svg';
import linkedInIcon from '../images/linkedin.svg';
import telegramIcon from '../images/telegram.svg';
import vkIcon from '../images/vkontakte.svg';

import ClipboardJS from 'clipboard';

class Contacts extends Component {

    state = {
        contactInfo: [
            {
                name: 'GitHub',
                link: 'https://github.com/Roman-Popov',
                img: gitHubIcon
            },
            {
                name: 'LinkedIn',
                link: 'https://linkedin.com/in/-roman-popov-/',
                img: linkedInIcon
            },
            {
                name: 'Telegram',
                link: 'https://t.me/Barmalew',
                img: telegramIcon
            },
            {
                name: 'Vkontakte',
                link: 'https://vk.com/vk.popovroman',
                img: vkIcon
            },
        ],

        clipboard: null
    }

    componentDidMount() {
        const clipboard = new ClipboardJS('.copy-to-clipboard');

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
            clipboard: clipboard
        })
    }

    componentWillUnmount() {
        this.state.clipboard && this.state.clipboard.destroy();
    }

    render() {
        return (
            <section className="section-large section-contacts">
                <div id="contacts" className="section-logo logo-contacts">
                    <img src={sectionLogo} alt="Contacts" />
                </div>
                    <h2>Want to work together?</h2>

                    <a className="btn-email" href="mailto:popov.r.k.18@gmail.com" title="Send an email">Get in touch!</a>

                    <p>
                        ...or just click on my email address
                        <button
                            id="email-adr"
                            className="copy-to-clipboard"
                            data-clipboard-target="#email-adr"
                            title="Copy to clipboard"
                        >
                            popov.r.k.18@gmail.com
                        </button>
                        to copy it to the clipboard.
                    </p>

                    <div className="alt-cnt-wrp">
                        <p>Also you can find me here:</p>

                        <div className="alt-cnt">
                            {this.state.contactInfo.map((contact, index) => (
                                <a key={index} href={contact.link} title={`Go to ${contact.name} profile`}>
                                    <p><img src={contact.img} alt={`${contact.name} icon`} />{contact.name}</p>
                                </a>
                            ))}
                        </div>
                    </div>
            </section>
        )
    }
}

export default Contacts
