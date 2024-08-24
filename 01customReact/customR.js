// function mainContainerBasic(reactElement, container) {
//    const domElement = document.createElement(reactElement.type)
//    domElement.innerHTML = reactElement.childen
//    domElement.setAttribute('href', reactElement.href)
//    document.setAttribute('target', reactElement.props)
//    container.appendChild(domElement)
// }

function customRender(reactElement, container) {
    const domElement = document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.childen
    for (const prop in reactElement.props) {
       if(prop === 'children') continue;
        domElement.setAttribute(prop, reactElement.props[prop])
    }
    container.appendChild(domElement);
}

const reactElement = {
    type: 'a',
    props: {
        href: "https://rokiroy.web.app",
        target: '_blank'
    },
    childen: 'Click me to see my resume'
}

const mainContainer = document.querySelector('#root')

customRender(reactElement , mainContainer)