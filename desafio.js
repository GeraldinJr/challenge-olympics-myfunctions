let olympicsMedalTable = [
    { id: 1, country: "BRASIL", gold: 7, silver: 6, bronze: 6, continent: "AMERICA DO SUL" },
    { id: 2, country: "USA", gold: 46, silver: 37, bronze: 17, continent: "AMERICA DO NORTE" },
    { id: 3, country: "CHINA", gold: 26, silver: 18, bronze: 26, continent: "ASIA" },
    { id: 4, country: "RUSSIA", gold: 19, silver: 18, bronze: 19, continent: "EUROPA" },
    { id: 5, country: "REINO UNIDO", gold: 27, silver: 23, bronze: 17, continent: "EUROPA" },
    { id: 6, country: "ALEMANHA", gold: 17, silver: 10, bronze: 15, continent: "EUROPA" },
    { id: 7, country: "JAPÃO", gold: 12, silver: 8, bronze: 21, continent: "ASIA" },
    { id: 8, country: "ARGENTINA", gold: 3, silver: 1, bronze: 0, continent: "AMERICA DO SUL" },
    { id: 9, country: "ITALIA", gold: 8, silver: 12, bronze: 8, continent: "EUROPA" },
    { id: 10, country: "QUÊNIA", gold: 6, silver: 6, bronze: 1, continent: "AFRICA" },
];

// métodos desenvolvidos para aplicações mais comuns, não são tão robustos quanto os originais.

Array.prototype.customFind = function (predicate) {
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i])) {
            return this[i];
        }
    }
    return undefined;
}

Array.prototype.customSome = function (predicate) {
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i])) {
            return true;
        }
    }
    return false;
}

Array.prototype.customFilter = function (predicate) {
    const filtrado = [];
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i])) {
            filtrado.push(this[i]);
        }
    }
    return filtrado;
}

Array.prototype.customMap = function (callback) {
    const transformado = [];
    for (let i = 0; i < this.length; i++) {
        transformado.push(callback(this[i]));
    }
    return transformado;
}

Array.prototype.customReduce = function (callback, initialValue) {
    let acc = initialValue ? initialValue : null;

    for (let i = 0; i < this.length; i++) {
        acc = callback(acc, this[i]);
    }
    return acc;
}

// Código modelo utilizando filter, map e reduce

const resultFilterMapReduce = olympicsMedalTable.filter(i => i.continent === "ASIA") // JAPÃO e CHINA
    .map(i => i.gold) // 26 e 12
    .reduce((total, quantity) => total + quantity); // 38

console.log(`Medalhas de Ouro no continente Asiático: ${resultFilterMapReduce}`);


// Implemente as funções customizadas - customFilter, customMap e customReduce e verique se o retorno é igual ao do código modelo

const resultByCustomFilterMapReduce = olympicsMedalTable.customFilter(i => i.continent === "ASIA")
    .customMap(i => i.gold)
    .customReduce((total, quantity) => total + quantity);

console.log(`Resultado custom - Medalhas de Ouro no continente Asiático: ${resultByCustomFilterMapReduce}`);

/* DESAFIOS - CONCLUA AS FUNÇÕES customSome, customFind E UTILIZANDO TODAS AS FUNÇÕES 'CUSTOM' CONCLUA OS DESAFIOS ABAIXO: */

// 1 - Crie um algoritmo que encontre o único pais do continente Africano
const paisAfricano = olympicsMedalTable.customFind(x => x.continent === 'AFRICA').country;
console.log(`Único país africano: ${paisAfricano}`);

// 2 - Crie um algoritmo que retorne o total de medalhas por país
const medalhasPorPais = olympicsMedalTable.customMap(x => {
    return { pais: x.country, medalhas: x.bronze + x.gold + x.silver };
});
console.log(`Medalhas por país: `, medalhasPorPais);

// 3 - Crie um algoritmo para encontrar os países que conquistaram mais que 10 medalhas de ouro
// OBS: Considerei o que foi pedido no enunciado em vez do nome antigo da variável.
const paisesComMaisDe10MedalhasOuro = olympicsMedalTable.customSome(x => x.gold > 10) ?
    olympicsMedalTable.customFilter(x => x.gold >= 10).customMap(x => {
        return { pais: x.country, medalhasDeOuro: x.gold };
    }) :
    "Nenhum país conquistou mais que 10 medalhas de ouro";
console.log(`Países com mais de 10 medalhas de ouro: `, paisesComMaisDe10MedalhasOuro);

// 4 - Crie um algoritmo para encontrar os países que conquistaram no minímo 30 medalhas (Ouro, Prata e Bronze)
const paisesCom30MedalhasNoMinimo = olympicsMedalTable.some(x => x.gold + x.silver + x.bronze >= 30) ?
    olympicsMedalTable.customReduce((acc, x) => {
        const medalhas = x.gold + x.silver + x.bronze;
        if (medalhas >= 30) {
            acc.push({ pais: x.country, medalhas: medalhas });
        }
        return acc;
    }, []) :
    "Nenhum país conquistou 30 medalhas";
console.log(`Países que consquistaram 30 ou mais medalhas : `, paisesCom30MedalhasNoMinimo);

// 5 - Crie um algoritmo para verificar se o continente América do Sul conquistou pelo menos 20 medalhas de ouro
// OBS: Considerei o que foi pedido no enunciado em vez do nome antigo da variável.
const americaDoSulTemPeloMenos20MedalhasDeOUro = olympicsMedalTable.customReduce((acc, x) => {
    if (x.continent === 'AMERICA DO SUL') {
        acc += x.gold;
    }
    return acc;
}) >= 20 ?
    "A América do Sul conquistou 20 ou mais medalhas de ouro." :
    "A América do Sul não conquistou 20 medalhas de ouro.";
console.log(americaDoSulTemPeloMenos20MedalhasDeOUro);
