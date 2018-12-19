import React, { Component } from 'react';

import sectionLogo from '../images/gears.svg';
import timetablePlaceholder from '../images/project-TimeTable.jpg';
import neighborhoodPlaceholder from '../images/project-NeighborhoodMap.jpg';
import myReadsPlaceholder from '../images/project-MyReads.jpg';
import diamondRushPlaceholder from '../images/project-DiamondRush.jpg';
import restaurantPlaceholder from '../images/project-RestaurantReviews.jpg';
import readerTestingPlaceholder from '../images/project-Testing.jpg';
import memoryGamePlaceholder from '../images/project-MemoryGame.jpg';
import pixelArtPlaceholder from '../images/project-PixelArt.jpg';
import animalCardPlaceholder from '../images/project-AnimalCard.jpg';
import comingSoonPlaceholder from '../images/project-ComingSoon.png';


class Projects extends Component {

    state = {
        projectsInfo: [
            {
                name: 'Timetable for sole proprietors',
                link: 'https://roman-popov.github.io/event-planner/',
                img: timetablePlaceholder
            },
            {
                name: 'Neighborhood Map',
                link: 'https://roman-popov.github.io/neighborhood-map/',
                img: neighborhoodPlaceholder
            },
            {
                name: 'MyReads',
                link: 'https://roman-popov.github.io/my-reads/',
                img: myReadsPlaceholder
            },
            {
                name: 'Diamond Rush Game',
                link: 'https://roman-popov.github.io/frogger-game-project/',
                img: diamondRushPlaceholder
            },
            {
                name: 'Restaurant Reviews',
                link: 'https://roman-popov.github.io/restaurant-reviews/',
                img: restaurantPlaceholder
            },
            {
                name: 'Feed Reader Testing',
                link: 'https://roman-popov.github.io/feed-reader-testing-project/',
                img: readerTestingPlaceholder
            },
            {
                name: 'Memory Game',
                link: 'https://roman-popov.github.io/memory-game-project/',
                img: memoryGamePlaceholder
            },
            {
                name: 'Pixel Art Maker',
                link: 'https://roman-popov.github.io/pixel-art-maker/',
                img: pixelArtPlaceholder
            },
            {
                name: 'Animal Trading Card',
                link: 'https://roman-popov.github.io/animal-trading-card/',
                img: animalCardPlaceholder
            }
        ]
    }

    render() {
        return (
            <section className="section-large section-projects">
                <div id="projects" className="section-logo logo-projects">
                    <img src={sectionLogo} alt="Projects" />
                </div>

                <section className="section-medium">
                    <h2>My projects</h2>

                    <div className="tiles">

                        {this.state.projectsInfo.map((proj, index) => (
                            <figure key={index}>
                                <a
                                    href={proj.link}
                                    className="project-link"
                                    title={`View project: ${proj.name}`}
                                    tabIndex="-1"
                                >
                                    <img src={proj.img} alt={proj.name} />
                                </a>
                                <figcaption>
                                    <a href={proj.link} title={`View project: ${proj.name}`}>{proj.name}</a>
                                </figcaption>
                            </figure>
                        ))}

                        <figure>
                            <span
                                className="project-link coming-soon"
                                title="There will be more projects soon..."
                            >
                                <img src={comingSoonPlaceholder} alt="Coming soon..." />
                            </span>
                            <figcaption><div className="coming-soon" title="There will be more projects soon...">Coming soon...</div></figcaption>
                        </figure>
                    </div>
                </section>
            </section>
        )
    }
}

export default Projects
