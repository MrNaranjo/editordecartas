import React from 'react';

class Editor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return <div className="editor">
            <Menus></Menus>
            <Ferramentas></Ferramentas>
            <Biblioteca></Biblioteca>
            <AreaTrabalho></AreaTrabalho>
        </div>;
    }
}

class Menus extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="menus">Menus</div>;
    }
}

class Ferramentas extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="ferramentas">Ferramentas</div>;
    }
}

class Biblioteca extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="biblioteca">Biblioteca</div>;
    }
}

class AreaTrabalho extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="area-trabalho">Área de Trabalho</div>;
    }
}

export default Editor;