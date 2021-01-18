import React from 'react';
const { ImagemBiblioteca } = require('../Models/Editor.js');

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.onUploadImg = this.onUploadImg.bind(this);
        this.downloadCard = this.downloadCard.bind(this);
        this.novaCarta = this.novaCarta.bind(this);

        this.state = {
            card: {

            },
            collections: {}
        };
    }

    onUploadImg(imagem, nome, collection) {
        this.setState(prevState => {
            let altered = Object.assign({}, prevState);
            if (!Array.isArray(altered.collections[collection])) {
                altered.collections[collection] = [];
            }
            altered.collections[collection].push(new ImagemBiblioteca({
                nome,
                imagem
            }));
            return altered;
        });
    }

    downloadCard(){
        console.log("downloadCard");
    }

    novaCarta(){
        console.log("novaCarta");
    }

    render() {

        return <div className="editor">
            <Menus
                onUploadImg={this.onUploadImg} 
                downloadCard={this.downloadCard}
                novaCarta={this.novaCarta}/>
            <Ferramentas />
            <AreaTrabalho />
            <Biblioteca
                collections={this.state.collections} />
        </div>;
    }
}

class Menus extends React.Component {
    constructor(props) {
        super(props);

        this.novoClick = this.novoClick.bind(this);
        this.downloadClick = this.downloadClick.bind(this);
        this.carregarImagemClick = this.carregarImagemClick.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.adicionarImagem = this.adicionarImagem.bind(this);
        this.limparCarregamento = this.limparCarregamento.bind(this);

        this.state = {
            mostrarModal: false,
            carregamento: {
                nome: "",
                collection: "",
                imagem: null
            }
        };
    }

    novoClick(e) {
        //TODO Criar modal de confirmação
        this.props.novaCarta();
    }

    downloadClick(e) {
        this.props.downloadCard();
    }

    carregarImagemClick(e) {
        this.setState(prevState => {
            let altered = Object.assign({}, prevState);
            altered.mostrarModal = true;
            return altered;
        });
    }

    fecharModal() {
        this.setState(prevState => {
            let altered = Object.assign({}, prevState);
            altered.mostrarModal = false;
            return altered;
        });
    }

    adicionarImagem(e) {
        let { carregamento } = this.state;
        this.props.onUploadImg(carregamento.imagem, carregamento.nome, carregamento.collection);
        this.fecharModal();
        this.limparCarregamento();
    }

    limparCarregamento() {
        this.setState(prevState => {
            var altered = Object.assign({}, prevState);
            altered.carregamento = {
                nome: "",
                collection: "",
                imagem: null
            };
            return altered;
        });
    }

    atribuirCarregamento(campo, e) {
        var valor = e.target.value;
        this.setState(prevState => {
            var altered = Object.assign({}, prevState);
            altered.carregamento[campo] = valor;
            return altered;
        });
    }

    render() {
        let menu = <ul>
            <li><a onClick={this.novoClick}>Novo</a></li>
            <li><a onClick={this.downloadClick}>Download</a></li>
            <li><a onClick={this.carregarImagemClick}>Carregar Imagem</a></li>
        </ul>;

        let modal = (!this.state.mostrarModal) ? null :
            <div id="modalCarregamentoImagem" className="modal">
                <div className="conteudo-modal">
                    <span className="fechar" onClick={this.fecharModal}>&times;</span>
                    <h3>Escolha uma imagem</h3>
                    <div>
                        <p>
                            <span>Nome: </span>
                            <input
                                type="text"
                                value={this.state.carregamento.nome}
                                onChange={this.atribuirCarregamento.bind(this, "nome")}></input>
                        </p>
                        <p>
                            <span>Collection: </span>
                            <input
                                type="text"
                                value={this.state.carregamento.collection}
                                onChange={this.atribuirCarregamento.bind(this, "collection")}></input>
                        </p>
                        <p>
                            <span>Imagem: </span>
                            <input type="button" value="Localizar Imagem ..."></input>
                            <input type="file"></input>
                        </p>
                    </div>
                    <div>
                        <input type="button" value="Adicionar" onClick={this.adicionarImagem}></input>
                    </div>
                </div>
            </div>;

        return <div className="menus">
            {menu}
            {modal}
        </div>;
    }
}

class Ferramentas extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="ferramentas area">
            <ul>
                <li>Mover</li>
                <li>Texto</li>
                <li>Imagem</li>
            </ul>
        </div>;
    }
}

class Biblioteca extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let hierarquia = Object.keys(this.props.collections).map((value, index, array) => {
            let collection = `[${this.props.collections[value].length}] ${value}`;

            let imgs = this.props.collections[value].map((value, index, array) => {
                return <li className="imagem-biblioteca" key={`coll${index}`}>
                    <img className="miniatura" src={value.imagem}></img>
                    {value.nome}
                </li>
            });

            return <li className="collection" key={value}> <span className="caret" onClick={(e) => {
                e.target.parentElement.querySelector(".aninhado").classList.toggle("ativo");
                e.target.classList.toggle("caret-down");
            }}>{collection}</span>
                <ul className="aninhado">{imgs}</ul>
            </li>;
        });

        return <div className="biblioteca area">
            <p>[{Object.keys(this.props.collections).length}] Collections</p>
            <div>
                <ul className="hierarquia">
                    {hierarquia}
                </ul>
            </div>
        </div>;
    }
}

class AreaTrabalho extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="area-trabalho area">
            <canvas id="card">

            </canvas>
        </div>;
    }
}

export default Editor;