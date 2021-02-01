import React from 'react';
const { ImagemBiblioteca, Camada } = require('../Models/Editor.js');

const ferramentas = {
    mover: 0,
    texto: 1,
    imagem: 2,
    redimencionar: 3,
    rotacionar: 4
}

const tipos = {
    texto: 0,
    imagem: 1
}

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.onUploadImg = this.onUploadImg.bind(this);
        this.downloadCarta = this.downloadCarta.bind(this);
        this.novaCarta = this.novaCarta.bind(this);
        this.selecionarFerramenta = this.selecionarFerramenta.bind(this);
        this.renderizarCarta = this.renderizarCarta.bind(this);
        this.adicionarCamada = this.adicionarCamada.bind(this);
        this.alterarCamada = this.alterarCamada.bind(this);
        this.selecionarCamada = this.selecionarCamada.bind(this);
        this.deletarCamada = this.deletarCamada.bind(this);
        this.ordenarCamada = this.ordenarCamada.bind(this);
        this.mostrarBiblioteca = this.mostrarBiblioteca.bind(this);

        this.state = {
            carta: {
                camadas: [],
                camada: null
            },
            ferramenta: ferramentas.mover,
            collections: {},
            mostrarBiblioteca: true
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

    downloadCarta() {
        console.log("downloadCarta");
        var link = document.createElement('a');
        link.download = 'carta.png';
        link.href = document.getElementById('card').toDataURL()
        link.click();
    }

    novaCarta() {
        console.log("novaCarta");
        let canvas = document.getElementById('card');
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        this.setState({
            carta: {
                camadas: [],
                camada: null
            }
        });
    }

    selecionarFerramenta(ferramenta) {
        this.setState({ ferramenta });
    }

    renderizarCarta(canvas) {
        console.log("renderizarCarta");
        if (!!canvas && this.state.carta.camadas.length > 0) {

            let context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);

            this.state.carta.camadas.forEach((camada, index, arr) => {
                context.drawImage(camada.imagem,
                    camada.x,
                    camada.y,
                    camada.largura,
                    camada.altura);
            });
        }
    }

    adicionarCamada(camada) {
        console.log("adicionarCamada");
        this.setState(prevState => {
            let altered = Object.assign({}, prevState);
            altered.carta.camadas.push(camada);
            return altered;
        });
    }

    alterarCamada(camada) {
        console.log("alterarCamada");
        this.setState(prevState => {
            let altered = Object.assign({}, prevState);
            //altered.carta.camadas.indexOf = camada;
            altered.carta.camada = camada;
            return altered;
        });
    }

    ordenarCamada() {
        console.log("ordenarCamada");
    }

    selecionarCamada(camada) {
        console.log("selecionarCamada");
        this.setState(prevState => {
            let altered = Object.assign({}, prevState);
            altered.carta.camada = camada;
            return altered;
        });
    }

    deletarCamada() {
        this.setState(prevState => {
            let altered = Object.assign({}, prevState);
            let idx = altered.carta.camadas.indexOf(altered.carta.camada);
            altered.carta.camadas.splice(idx, 1);
            if (altered.carta.camadas.length > 0) {
                altered.carta.camada = altered.carta.camadas[0];
            } else {
                altered.carta.camada = null;
            }
            return altered;
        });
    }

    mostrarBiblioteca(mostrar) {
        this.setState({ mostrarBiblioteca: mostrar });
    }

    render() {
        let painelDireito = (this.state.mostrarBiblioteca) ?
            <Biblioteca
                collections={this.state.collections}
                camadas={this.state.carta.camadas}
                adicionarCamada={this.adicionarCamada} /> :
            <Camadas
                camadas={this.state.carta.camadas}
                camada={this.state.carta.camada}
                adicionarCamada={this.adicionarCamada}
                selecionarCamada={this.selecionarCamada}
                deletarCamada={this.deletarCamada}
                ordenarCamada={this.ordenarCamada} />;

        return <div className="editor">
            <Menus
                onUploadImg={this.onUploadImg}
                downloadCarta={this.downloadCarta}
                novaCarta={this.novaCarta}
                mostrarBiblioteca={this.mostrarBiblioteca} />
            <Ferramentas
                ferramenta={this.state.ferramenta}
                selecionarFerramenta={this.selecionarFerramenta} />
            <AreaTrabalho
                ferramenta={this.state.ferramenta}
                renderizarCarta={this.renderizarCarta}
                adicionarCamada={this.adicionarCamada}
                alterarCamada={this.alterarCamada}
                camada={this.state.carta.camada}
                camadas={this.state.carta.camadas} />
            {painelDireito}
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
        this.apresentarBiblioteca = this.apresentarBiblioteca.bind(this);
        this.apresentarCamadas = this.apresentarCamadas.bind(this);
        this.selecionarImagem = this.selecionarImagem.bind(this);
        this.escolherImagem = this.escolherImagem.bind(this);

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
        this.props.downloadCarta();
    }

    carregarImagemClick(e) {
        this.setState({ mostrarModal: true });
    }

    fecharModal() {
        this.setState({ mostrarModal: false });
    }

    adicionarImagem(e) {
        let { carregamento } = this.state;
        this.props.onUploadImg(carregamento.imagem, carregamento.nome, carregamento.collection);
        this.fecharModal();
        this.limparCarregamento();
    }

    limparCarregamento() {
        this.setState({
            carregamento: {
                nome: "",
                collection: "",
                imagem: null
            }
        });
    }

    escolherImagem(e) {
        document.querySelector("#uploadFile").click();
    }

    selecionarImagem(e) {
        if (e.target.files && e.target.files[0]) {

            var FR = new FileReader();
            var self = this;

            FR.addEventListener("load", function (e) {
                new Promise(res => {
                    let img = new Image();
                    img.onload = () => {
                        res(img);
                    };
                    img.src = e.target.result;
                }).then(img => {
                    self.setState(prevState => {
                        var altered = Object.assign({}, prevState);
                        altered.carregamento.imagem = img;
                        return altered;
                    });
                });
            });

            FR.readAsDataURL(e.target.files[0]);
        }
    }

    atribuirCarregamento(campo, e) {
        var valor = e.target.value;
        this.setState(prevState => {
            var altered = Object.assign({}, prevState);
            altered.carregamento[campo] = valor;
            return altered;
        });
    }

    apresentarBiblioteca() {
        this.props.mostrarBiblioteca(true);
    }

    apresentarCamadas() {
        this.props.mostrarBiblioteca(false);
    }

    render() {
        let menu = <ul>
            <li><a onClick={this.novoClick}>Novo</a></li>
            <li><a onClick={this.downloadClick}>Download</a></li>
            <li><a onClick={this.carregarImagemClick}>Carregar Imagem</a></li>
            <li><a onClick={this.apresentarBiblioteca}>Biblioteca</a></li>
            <li><a onClick={this.apresentarCamadas}>Camadas</a></li>
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
                            <input type="button" value="Localizar Imagem ..." onClick={this.escolherImagem}></input>
                            <input id="uploadFile" type="file" style={{ display: "none" }} onChange={this.selecionarImagem}></input>
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
                <li><a onClick={() => { this.props.selecionarFerramenta(ferramentas.mover); }}
                    className={(this.props.ferramenta == ferramentas.mover) ? "selecionada" : ""}>Mover</a></li>
                <li><a onClick={() => { this.props.selecionarFerramenta(ferramentas.texto); }}
                    className={(this.props.ferramenta == ferramentas.texto) ? "selecionada" : ""}>Texto</a></li>
                <li><a onClick={() => { this.props.selecionarFerramenta(ferramentas.imagem); }}
                    className={(this.props.ferramenta == ferramentas.imagem) ? "selecionada" : ""}>Imagem</a></li>
                <li><a onClick={() => { this.props.selecionarFerramenta(ferramentas.redimencionar); }}
                    className={(this.props.ferramenta == ferramentas.redimencionar) ? "selecionada" : ""}>Transformar</a></li>
                <li><a onClick={() => { this.props.selecionarFerramenta(ferramentas.rotacionar); }}
                    className={(this.props.ferramenta == ferramentas.rotacionar) ? "selecionada" : ""}>Rotacionar</a></li>
            </ul>
        </div>;
    }
}

class Biblioteca extends React.Component {
    constructor(props) {
        super(props);

        this.adicionarCamada = this.adicionarCamada.bind(this);
    }

    adicionarCamada(imgBiblioteca) {
        let camada = new Camada({
            id: this.props.camadas.length,
            nome: `${imgBiblioteca.nome}_${this.props.camadas.length}`,
            imagem: imgBiblioteca.imagem,
            tipo: tipos.imagem
        });
        this.props.adicionarCamada(camada);
    }

    render() {
        let hierarquia = Object.keys(this.props.collections).map((value, index, array) => {
            let collection = `[${this.props.collections[value].length}] ${value}`;

            let imgs = this.props.collections[value].map((value, index, array) => {
                return <li className="item" key={`coll${index}`} onDoubleClick={() => { this.adicionarCamada(value) }}>
                    <img className="miniatura" src={value.imagem.src}></img>
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
            <p style={{ padding: "5px" }}>[{Object.keys(this.props.collections).length}] Biblioteca</p>
            <div>
                <ul className="hierarquia">
                    {hierarquia}
                </ul>
            </div>
        </div>;
    }
}

class Camadas extends React.Component {
    constructor(props) {
        super(props);

        this.adicionarCamada = this.adicionarCamada.bind(this);
        this.removerCamada = this.removerCamada.bind(this);
        this.selecionarCamada = this.selecionarCamada.bind(this);
    }

    adicionarCamada() {
        let camada = new Camada({ id: this.props.camadas.length, imagem: "", tipo: tipos.imagem });
        this.props.adicionarCamada(camada);
        this.props.selecionarCamada(camada);
    }

    removerCamada() {
        this.props.deletarCamada(this.props.camada);
    }

    selecionarCamada(index) {
        let camada = this.props.camadas[index];
        this.props.selecionarCamada(camada);
    }

    render() {
        let camadas = this.props.camadas.map((value, index, array) => {
            return <li className="item" key={`cam${index}`}>
                <a onClick={() => { this.selecionarCamada(index) }}>
                    {index}
                    <img className="miniatura" src={value.imagem.src}></img>
                </a>
            </li>
        });

        return <div className="camadas area">
            <p style={{ padding: "5px" }}>[{this.props.camadas.length}] Camadas</p>
            <div>
                <ul className="hierarquia">
                    {camadas}
                </ul>
            </div>
            <ul className="actions">
                <li><a onClick={this.adicionarCamada}>+</a></li>
                <li><a onClick={this.removerCamada}>-</a></li>
            </ul>
        </div>;
    }
}

class AreaTrabalho extends React.Component {
    constructor(props) {
        super(props);

        this.canvas = React.createRef();
        this.active = false;

        this.state = {
            startX: null,
            startY: null,
            x: null,
            y: null
        }

        this.acao = this.acao.bind(this);
        this.onMouseDownCanvas = this.onMouseDownCanvas.bind(this);
        this.onMouseMoveCanvas = this.onMouseMoveCanvas.bind(this);
        this.onMouseUpCanvas = this.onMouseUpCanvas.bind(this);
        this.getCursorPosition = this.getCursorPosition.bind(this);
    }

    componentDidMount() {
        this.props.renderizarCarta(this.canvas.current); //document.querySelector("#card")
    }

    acao(e) {
        var camada;
        switch (this.props.ferramenta) {
            case ferramentas.mover:
                console.log("Movendo");

                break;
            case ferramentas.texto:
                console.log("Escrevendo");
                camada = new Camada({ id: this.props.camadas.length, imagem: "", tipo: tipos.texto });
                this.props.adicionarCamada(camada);
                break;
            case ferramentas.imagem:
                console.log("Desenhando");
                camada = new Camada({ id: this.props.camadas.length, imagem: "", tipo: tipos.imagem });
                this.props.adicionarCamada(camada);
                break;
            case ferramentas.redimencionar:
                console.log("Redimensionando");
                break;
            case ferramentas.rotacionar:
                console.log("Rotacionando");
                break;
        }
    }

    onMouseDownCanvas(e) {
        if (!!this.props.camada) {
            this.active = true;
            switch (this.props.ferramenta) {
                case ferramentas.mover:
                    console.log("Iniciando movimento");
                    let coordenadaMouse = this.getCursorPosition(e);
                    let altered = this.props.camada;
                    altered.x = coordenadaMouse.x - (altered.largura / 2);
                    altered.y = coordenadaMouse.y - (altered.altura / 2);
                    console.log(coordenadaMouse.x + " - " + (altered.largura / 2));
                    break;
            }
            this.props.renderizarCarta(this.canvas.current);
        }
    }

    onMouseMoveCanvas(e) {
        if (this.active && !!this.props.camada) {
            switch (this.props.ferramenta) {
                case ferramentas.mover:
                    console.log("Movendo");
                    let coordenadaMouse = this.getCursorPosition(e);
                    let altered = this.props.camada;
                    altered.x = coordenadaMouse.x - (altered.largura / 2);
                    altered.y = coordenadaMouse.y - (altered.altura / 2);
                    console.log(coordenadaMouse.x + " - " + (altered.largura / 2));
                    break;
            }
            this.props.renderizarCarta(this.canvas.current);
        }
    }

    onMouseUpCanvas(e) {
        switch (this.props.ferramenta) {
            case ferramentas.mover:
                console.log("Encerrando movimento");
                console.log(this.getCursorPosition(e));
                break;
        }
        this.props.renderizarCarta(this.canvas.current);
        this.active = false;
    }

    getCursorPosition(e) {
        let rect = this.canvas.current.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    render() {
        //onClick={this.acao}
        this.props.renderizarCarta(this.canvas.current);

        return <div className="area-trabalho area">
            <canvas id="card" width="400px" height="450px" ref={this.canvas} onMouseDown={this.onMouseDownCanvas} onMouseMove={this.onMouseMoveCanvas} onMouseUp={this.onMouseUpCanvas}>

            </canvas>
        </div>;
    }
}

export default Editor;