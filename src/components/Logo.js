import React, { Component } from 'react'
import s from '../logo.scss';

class Logo extends Component {

    state = {
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        wrapper: undefined,
        logo: undefined,
        resizeDetector: undefined,
        observer: undefined,
        orientationTrigger: window.matchMedia("(orientation:landscape)")
    }

    componentWillUnmount() {
        const { resizeDetector, observer, orientationTrigger } = this.state;

        observer.disconnect();
        resizeDetector.removeEventListener('transitionend', this.resizeLogo);
        orientationTrigger.removeListener(this.resizeLogo);
    }

    componentDidMount() {
        const { id, orientationTrigger } = this.state,
            wrapper = document.getElementById(`wrapper-${id}`),
            logo = document.getElementById(`logo-${id}`),
            resizeDetector = document.getElementById(`resize-detector-${id}`),
            observer = new MutationObserver(this.resizeLogo);

        orientationTrigger.addListener(this.resizeLogo);

        if (!wrapper.style.cssText.includes('--vwCalcSize')) {
            wrapper.style.cssText += `--vwCalcSize: ${(wrapper.clientHeight / window.innerWidth * 100).toFixed(2)}vw;`
            observer.observe(logo, { attributes: true, attributeFilter: ['class'] });
            resizeDetector.addEventListener('transitionend', this.resizeLogo);
        }

        // for avoid "animation-jumping" in case of --width was set by relative value
        setTimeout(() => {
            wrapper.dataset.init = true;
        }, 1);

        this.setState({
            wrapper: wrapper,
            logo: logo,
            resizeDetector: resizeDetector,
            observer: observer
        })
    }

    resizeLogo = (arg) => {
        const { wrapper, resizeDetector } = this.state;

        wrapper.dataset.init = false;

        if (resizeDetector.clientWidth !== wrapper.clientWidth || arg[0] instanceof MutationRecord) {
            const currentCssText = wrapper.style.cssText,
                heightVW = `${(wrapper.clientHeight / window.innerWidth * 100).toFixed(2)}vw;`;

            currentCssText.includes('--vwCalcSize') ?
                wrapper.style.cssText = currentCssText.replace(/--vwCalcSize:(?: |\w|\.)*;(?! *\*\/)/, `--vwCalcSize: ${heightVW}`) :
                wrapper.style.cssText += `--vwCalcSize: ${heightVW}`

            setTimeout(() => {
                wrapper.dataset.init = true;
            }, 1);

        } else {
            wrapper.dataset.init = true;
        }
    }

    render() {
        const { style, href, type } = this.props,
            { id } = this.state,
            localType = typeof (type) === 'string' ? type.split(' ').map((el) => (el === '') ? '' : s[el]).join(' ') : '',
            logoStyle = style ? {
                '--width': !(typeof (type) === 'string' && type.includes('tiny')) ? (style.width || style.height) :
                        style.width ? style.width :
                        style.height ? style.height.replace(/\d*\.*\d*/, (str) => str * 10 / 7.7) : undefined,
                '--bgColor': style.bgColor,
                '--logoColor': style.logoColor,
                '--shadowColor': style.shadowColor,
                'margin': style.margin
            } : {}

        return (
            <custom-div id={`wrapper-${id}`} style={logoStyle} data-type={type} class={`${s['wrapper']} ${type ? localType : ''}`}>
                <custom-resize-detector id={`resize-detector-${id}`} class={s['resize-detector']}></custom-resize-detector>
                <a href={href ? href : '/'} id={`logo-${id}`} className={`${s['logo']} ${type ? localType : ''}`} draggable="false">
                    <custom-div class={`${s['hex-corner']} ${s['hex-pt1']}`}></custom-div>
                    <custom-div class={`${s['hex-corner']} ${s['hex-pt2']}`}></custom-div>

                    <custom-p class={s['letter']}>
                        <custom-span class={s['text']}>
                            R <custom-span class={s['name']}>OMAN</custom-span>
                        </custom-span>
                    </custom-p>


                    <custom-p class={s['letter']}>
                        <custom-span class={s['text']}>
                            P <custom-span class={s['name']}>OPOV</custom-span>
                        </custom-span>
                    </custom-p>
                </a>
            </custom-div>
        )
    }
}

export default Logo
