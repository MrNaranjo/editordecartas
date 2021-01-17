import React from 'react';

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="page">
            <Cabecalho></Cabecalho>
            <div className="conteudo">
                {this.props.children}
            </div>
            <Rodape></Rodape>
        </div>;
    }
}

class Cabecalho extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="cabecalho">
            <h1>Editor de Cartas</h1>
        </div>;
    }
}

class Rodape extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = new Date().getFullYear();

        if (data > 2021) {
            data = "2021 - " + data;
        }

        return <div className="rodape">
            &copy; {data} Naranjo Tech
        </div>;
    }
}

export default Page;