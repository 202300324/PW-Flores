"use strict";
/**
 * @file Classes para implementar ementas de restaurantes.
 * @author Aluno
 * @copyright 2023
 * @version 1.0.0
 */

/**
 * Enumerado Tipos de Produtos
 */

/**
 * @enum {string} ProductType - Tipos de Produtos.
 * @readonly
 */
let ProductType = {
    /** Tipo de produto ser uma <b>E</b>ntrada */
    E: "Entrada",
    /** Tipo de produto ser uma <b>B</b>ebida */
    B: "Bebida",
    /** Tipo de produto ser um <b>P</b>rato Principal */
    P: "Prato Principal",
    /** Tipo de produto ser uma <b>S</b>obremesa */
    S: "Sobremesa"
};

/**
 * Classe Product
 */

/**
 * @class Representa um produto da ementa
 * @constructs Product
 * @param {string} description - descrição do produto.
 * @param {string} productType - tipo do produto, baseado nos valores de ProductType.
 * @param {number} price - preço do produto.
 *
 * @property {string} description - descrição do produto
 * @property {string} productType - tipo do produto, baseado nos valores de ProductType.
 * @property {number} price - preço do produto.
 * @property {function} toTrTd - método que devolve a representação da informação de um produto sob a forma do código HTML para construir uma linha de tabela.
 * @property {object} propertyLabels - Equivalência entre o nome das propriedades e o descritivo em português (será acedida como "propriedade de classe").
 * @property {string} thead - String com código HTML para construir uma linha de cabeçalho de tabela com a informação dos produtos (será acedida como "propriedade de classe").
 * @property {string} E - Tipo de produto ser uma Entrada (será acedida como "propriedade de classe").
 * @property {string} B - Tipo de produto ser uma Bebida (será acedida como "propriedade de classe").
 * @property {string} P - Tipo de produto ser um Prato Principal (será acedida como "propriedade de classe").
 * @property {string} S - Tipo de produto ser uma Sobremesa (será acedida como "propriedade de classe").
 */
function Product(description = "", productType = "", price = 0.0) {
    
}

/** Métodos de Instância */

/**
 * Representação da informação de um produto sob a forma do código HTML para construir uma linha de tabela
 * @returns {string} representação da informação de um produto sob a forma do código HTML para construir uma linha de tabela.
 */
Product.prototype.toTrTd = function () {
    return `<tr><td>${this.description}</td>
            <td>${ProductType[this.productType]}</td>
            <td>${this.price.toFixed(2)}</td></tr>`;

};

/** Propriedades e Métodos de Classe */

/**
 * @memberof Product
 * @property {object} propertyLabels - Equivalência entre o nome das propriedades e o descritivo em português
 * @readonly
 */
Product.propertyLabels = {
    description: "Descrição",
    productType: "Tipo",
    price: "Preço"
};

/**
 * @memberof Product
 * @property {string} thead - String com código HTML para construir uma linha de cabeçalho de tabela com a informação dos produtos (será acedida como "propriedade de classe").
 * @readonly
 */
Product.thead = `<tr><th>${Product.propertyLabels.description}</th><th>${Product.propertyLabels.productType}</th><th>${Product.propertyLabels.price} (€)</th></tr>`;

/**
 * Classe Menu
 */

/**
 * @class Representa a ementa do restaurante
 * @constructs Menu
 *
 * @property {Product[]} products - produtos da ementa
 */
function Menu() {
    this.products = [];
}

/** Métodos de Instância */

/**
 * Cria uma string com código HTML para construir uma tabela com a informação de todos os produtos
 * @returns {string} código HTML para construir uma tabela com a informação de todos os produtos da ementa.
 */
Menu.prototype.toTable = function () {
    if (this.products.length === 0) {
        return "";
    } else {
        let resultado = `<table><thead>${Product.thead}</thead>`;
        this.products.forEach(function (product) {
            resultado += product.toTrTd();
        });
        resultado += "</table>";
        return resultado;
    }
};

/**
 * Coloca a informação da ementa, em formato de tabela, no div com id="products"
 */
Menu.prototype.show = function () {
    document.getElementById("products").innerHTML = this.toTable();
};

/**
 * Acrescenta um produto à ementa. Se ele já existir (mesma descrição e tipo) então apenas atualiza o seu preço
 * @param {Product} product - produto para acrescentar à ementa.
 * @returns {Menu} o próprio objeto Menu: permite a realização de "Method Chaining".
 */
Menu.prototype.add = function (product) {
    if (!product) return this; // ignorar chamadas sem produto válido
    // procurar produto com mesma descrição e tipo
    let existe = this.products.find(p => p.description === product.description && p.productType === product.productType);
    if (existe) // se existir, muda o preço
        existe.price = product.price;
    else
        this.products.push(product);
    return this.products;    
};

/**
 * Acrescenta diversos produtos à ementa
 * @param {...Product} products - produtos para acrescentar à ementa.
 * @returns {Menu} o próprio objeto Menu: permite a realização de "Method Chaining".
 */
Menu.prototype.addProducts = function (...products) {
    products.forEach(function (product) {
        this.add(product);
    }, this); //Indicar que a ementa atual será o this dentro de cada chamada à função anterior
    return this;
};

/**
 * Remove produtos à ementa
 * @param {string} description - parte de uma descrição de produto que servirá como padrão para selecionar os produtos a remover.
 * @returns {Menu} o próprio objeto Menu: permite a realização de "Method Chaining".
 */
Menu.prototype.remove = function (description) {
    //TODO: @todo - completar
};

/**
 * Apresenta, via alert, a informação (descrição e preço) dos produtos da ementa
 * @param {string} description - parte de uma descrição de produto que servirá como padrão para selecionar os produtos a apresentar.
 * @returns {Menu} o próprio objeto Menu: permite a realização de "Method Chaining".
 */
Menu.prototype.search = function (description) {
    let pattern = new RegExp(description, "gi");
    this.products.forEach(function (product) {
        pattern.lastIndex = 0; //Reset ao emparelhamento
        pattern.test(product.description) && alert(`O preço de ${product.description} é ${product.price}€`);
    });
    return this;
};

/**
 * Ordena os produtos da ementa utilizando a função de comparação indicada
 * @param {function} compare - função de comparação entre produtos que servirá de base para a ordenação.
 * @returns {Menu} o próprio objeto Menu: permite a realização de "Method Chaining".
 */
Menu.prototype.sort = function (compare) {
    //TODO: @todo - completar
};

/** Métodos de Classe */

/**
 * Coloca a informação da ementa, em formato de tabela, na página
 * @memberof Menu
 * @param {Menu} [menu=Menu.default] - ementa para apresentar na página.
 */
Menu.show = function (menu = Menu.default) {
    menu.show();
};

/**
 * Acrescenta um produto à ementa. A informação do produto será pedida ao utilizador através de "prompt"
 * @memberof Menu
 * @param {Menu} [menu=Menu.default] - ementa para apresentar a informação.
 */
Menu.add = function (menu = Menu.default) {
    let data = prompt("Indique os dados do produto a adicionar:", "<descrição>|<tipo: E-Entrada/B-Bebida/P-Product Principal/S-Sobremesa>|<preço>");
    if (data) {
        let values = data.split("|");
        if (values.length !== 3)
            alert("Dados mal introduzidos. Devia ser '<descrição>|<tipo: E-Entrada/B-Bebida/P-Prato Principal/S-Sobremesa>|<preço>'!");
        else {
            menu.add(new Product(values[0], values[1], values[2]));
            menu.show();
        }
    }
};

/**
 * Remove produtos à ementa. A informação das descrição dos produtos a remover será pedida ao utilizador através de "prompt"
 * @memberof Menu
 * @param {Menu} [menu=Menu.default] - ementa para apresentar a informação.
 */
Menu.remove = function (menu = Menu.default) {
    //TODO: @todo - completar
};

/**
 * Apresenta, via alert, a informação (descrição e preço) dos produtos da ementa. A informação das descrições dos produtos a apresentar será pedida ao utilizador através de "prompt"
 * @memberof Menu
 * @param {Menu} [menu=Menu.default] - ementa para apresentar a informação.
 */
Menu.search = function (menu = Menu.default) {
    //TODO: @todo - completar
};

/**
 * Ordena os produtos da ementa utilizando a comparação da propriedade indicada
 * @memberof Menu
 * @param {string} property - propriedade do produto que servirá de comparação na ordenação.
 * @param {Menu} [menu=Menu.default] - ementa para apresentar a informação.
 */
Menu.sort = function (property, menu = Menu.default) {
    //TODO: @todo - completar
};

/**
 * @memberof Menu
 * @property {Menu} default - Ementa por omissão: contém os dados de teste.
 */
Menu.default = new Menu().addProducts(
    new Product("Arroz de Marisco", "P", 15.0),
    new Product("Choco Frito", "P", 10.0),
    new Product("Arroz Doce", "S", 2.5),
    new Product("Pão", "E", 0.8),
    new Product("Água", "B", 1.2)
);
