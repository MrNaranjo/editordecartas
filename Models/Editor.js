
var ImagemBiblioteca = class ImagemBiblioteca {
    constructor(args) {
        this.nome = args.nome;
        this.imagem = args.imagem;
    }
}

var Camada = class Camada {
    constructor({ id, nome, imagem, tipo, x, y, largura, altura }) {
        this.id = id;
        this.nome = nome || `Camada ${id}`;
        this.imagem = imagem;
        this.tipo = tipo;
        this.x = x||0;
        this.y = y||0;
        this.largura = largura||100;
        this.altura = altura||100 * imagem.height / imagem.width;
    }
}

exports.ImagemBiblioteca = ImagemBiblioteca;
exports.Camada = Camada;