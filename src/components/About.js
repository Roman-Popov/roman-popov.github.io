import React, { Component } from 'react';

import sectionLogo from '../images/about.svg';
import udacityCert from '../images/udacity-cert.png';

import htmlLogo from '../images/html5.svg';
import cssLogo from '../images/css3.svg';
import jsLogo from '../images/js.svg';
import reactLogo from '../images/react.svg';
import gitLogo from '../images/git.svg';
import jqueryLogo from '../images/jquery.svg';
import responsiveLogo from '../images/responsive-design.png';

class About extends Component {

    state = {
        certificatesInfo: [
            {
                name: 'Udacity Front-End Web Developer Nanodegree',
                link: 'https://confirm.udacity.com/AYHE9SHP',
                img: udacityCert
            }
        ],

        skillsInfo: [
            {
                name: 'HTML5',
                description: 'HTML is the World Wide Web’s core markup language used to describe a web documents and applications',
                img: htmlLogo
            },
            {
                name: 'CSS3',
                description: 'Cascading Style Sheets (CSS) is a simple mechanism for adding style (e.g., fonts, colors, spacing) to Web documents',
                img: cssLogo
            },
            {
                name: 'JavaScript',
                description: 'JavaScript is a high-level, interpreted programming language used to make web pages interactive',
                img: jsLogo
            },
            {
                name: 'React',
                description: 'React is an open-source JavaScript library which is used for building user interfaces specifically for single page applications',
                img: reactLogo
            },
            {
                name: 'Git',
                description: 'Git is a version control system designed to handle everything from small to very large projects with speed and efficiency',
                img: gitLogo
            },
            {
                name: 'jQuery',
                description: 'jQuery is a JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, animation, and Ajax',
                img: jqueryLogo
            },
            {
                name: 'Responsive Design',
                description: 'Responsive Web Design is about using HTML and CSS to automatically resize, hide, shrink, or enlarge, a website, to make it look good on all devices (desktops, tablets, and phones)',
                img: responsiveLogo
            }
        ]
    }

    render() {
        const { certificatesInfo, skillsInfo } = this.state;

        return (
            <section className="section-large section-about">
                <div id="about" className="section-logo logo-about">
                    <img src={sectionLogo} alt="Info"/>
                </div>

                <section className="section-medium">
                    <h2>My certificates</h2>

                    <div className="tiles">
                        {certificatesInfo.map((cert, index) => (
                            <figure key={index}>
                                <a
                                    href={cert.link}
                                    className="cert-link"
                                    title={`View certificate: ${cert.name}`}
                                    tabIndex="-1"
                                >
                                    <img src={cert.img} alt={`${cert.name} Certificate`} />
                                </a>
                                <figcaption>
                                    <a href={cert.link} title={`View certificate: ${cert.name}`}>{cert.name}</a>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </section>

                <section className="section-medium">
                    <h2>My skills</h2>

                    {skillsInfo.map((skill, index) => (
                        <div className="skills" key={index}>
                            <header>{skill.name}</header>
                            <img src={skill.img} alt={skill.name} />
                            <p>{skill.description}</p>
                        </div>
                    ))}

                </section>
            </section>
        )
    }
}

export default About
