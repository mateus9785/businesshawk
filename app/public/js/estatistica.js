var semRepeticao, varia = 0, continua = false, caracter = false, table = [];
var entrada = [], categoria = [], data = [], valoresEntrada = [" "], valoresTotais = ["intervalos"];

function baixar() {
    if (!$("#conteudoArquivo").val()) {
        Mensagem('não há informação para download', 'atencao');
        return;
    }
    var texto = $("#conteudoArquivo").val();
    download(texto);
}

function carregar(texto){
    var textoValido=texto;
    $("#conteudoArquivo").val(textoValido);
}

function adicionar() {
    var fileContents = document.getElementById('conteudoArquivo');
    var vezes = $('#varios').val();
    var elemento = $('#cElem').val();
    for (var i = 0; i < vezes; i++) {
        if (!fileContents.value)
            fileContents.value = elemento;
        else
            fileContents.value += ";" + elemento;
    }
    $('#varios,#cElem').val("");
}
//Medidas separatrizes
$("#escolhas").change(function () {
    $("#" + this.value).show().siblings().hide();
});
$("#escolhas").change();

$("#qualitativa").change(function () {
    varia++;
    if (varia % 2 == 0)
        $("#palco").hide();
    else
        $("#palco").show();
});
$("#qualitativa").change();

function barraArrastar() {
    var x = $("#arrastar").val();
    if ($('#escolhas').val() == "quartil" 
    && [25,50,75,100].indexOf(x)==-1)
        for(var i=25;i<=100;i+=25)
            if(x<i+1){
                $("#arrastar").val(i);
                $("#demo").html(i + " % ");
                return;
            }
    if ($('#escolhas').val()== "quintil" 
    && [20,40,60,80,100].indexOf(x)==-1)
        for(var j=20;j<=100;j+=20)
            if(x<j+1){
                $("#arrastar").val(j);
                $("#demo").html(j + " % ");
                return;
            }
    if ($('#escolhas').val() == "decil" 
    && [10,20,30,40,50,60,70,80,90,100].indexOf(x)==-1)
        for(var i=10;i<=100;i+=10)
        if(x<i+1){
            $("#arrastar").val(i);
            $("#demo").html(i + " % ");
            return;
        }
    if($('#escolhas').val() == "porcentil"){
        $("#demo").html(x + " % ");
    }
}

function valida() {
    if (!$('#cNome').val()) {
        Mensagem('Por favor, digite o nome da variável', 'atencao');
        $('#cNome').focus();
    }
    else if (!$('#conteudoArquivo').val()) {
        Mensagem('Por favor, preencha a entrada de dados', 'atencao');
        $('#conteudoArquivo').focus();
    }
    else {
        tipo();
    }
}

document.getElementById("conteudoArquivo").onkeypress = function (e) {
    var chr = String.fromCharCode(e.which);
    if ("1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM; .".indexOf(chr) < 0)
        return false;
};


function mascara() {
    var dados = (document.getElementById('conteudoArquivo').value);
    var numeros = "1234567890";
    for (var i = 0; i < numeros.length; i++) {
        if (dados.indexOf(numeros[i]) != -1) {
            dados = dados.replace(/ /g, ";");
            break;
        }
    }
    dados = ((((dados.trim()).replace(/,/g, "."))).replace(/\n/g, ";")).split(";");
    return dados;
}


function verifica() {
    document.getElementById("qualitativa").style.display = "none";
    document.getElementById("escolha").style.display = "none";
    document.getElementById("palco").style.display = "none";
    if (getRadioValor('tQual') == "ordinal") {
        vet = [];
        var ordem = document.getElementsByClassName('column');
        for (var i = 0; i < ordem.length; i++) {
            vet.push(ordem[i].innerText);
        }
        semRepeticao = ordenar(vet, semRepeticao);
    }
    geraTabela(semRepeticao);
    geraCalculos(semRepeticao);
    GraficoPizza();
}

function getRadioValor(name) {
    var rads = document.getElementsByName(name);

    for (var i = 0; i < rads.length; i++) {
        if (rads[i].checked) {
            return rads[i].value;
        }
    }
    return null;
}

function ordenar(sequencia, vetor) {
    var certo = [], tamanho = vetor.length, comprimento = sequencia.length;
    for (j = 0; j < comprimento; j++) {
        for (i = 0; i < tamanho; i++) {
            if (sequencia[j] == vetor[i].name) {
                certo.push(vetor[i]);
                break;
            }
        }
    }
    return certo;
}

function tipo() {
    var vetor = mascara();
    document.getElementById('campos').style.display = "none";
    if (isNaN(vetor[0])) {
        document.getElementById("qualitativa").style.display = "block";
        document.getElementById("escolha").style.display = "block";
        document.getElementById("palco").style.display = "block";
        vetor = vetor.sort();
        semRepeticao = contaRepeticao(vetor);
        geraLista(semRepeticao);
        caracter = true;
    }
    else {
        vetor = vetor.sort(function (a, b) { return a - b });
        semRepeticao = contaRepeticao(vetor);
        semRepeticao = (semRepeticao.length > 7) ? integra(semRepeticao) : semRepeticao;
        geraTabela(semRepeticao);
        geraCalculos(semRepeticao);
        continua ? GraficoBarraJuntas() : GraficoBarraSeparadas();
    }
}

function integra(vetor) {
    continua = true;
    var inicial = vetor[0].name;
    var amplitude = vetor[vetor.length - 1].name - inicial;
    var numero = 0, tamanho = vetor.length, k, classes;
    for (var i = 0; i < tamanho; i++) {
        numero += vetor[i].value;
    }
    k = Math.trunc(numero ** 0.5);
    do {
        amplitude++;
        if (amplitude % (k - 1) == 0) {
            classes = amplitude / (k - 1);
            k--;
            break;
        }
        if (amplitude % k == 0) {
            classes = amplitude / k;
            break;
        }
        if (amplitude % (k + 1) == 0) {
            classes = amplitude / (k + 1);
            k++;
            break;
        }
    } while (true);
    var soma, integrado = [];
    for (var j = 1; j <= k; j++) {
        integrado.push(new Object());
        soma = 0;
        while ((vetor.length != 0)) {
            if (parseFloat(vetor[0].name) < parseFloat(inicial) + parseFloat(classes) * j) {
                soma += vetor[0].value;
                vetor.shift();
            }
            else {
                break;
            }
        }
        integrado[j - 1].name = (parseFloat(inicial) + classes * (j - 1) + " |--- " + (parseFloat(inicial) + classes * j));
        integrado[j - 1].value = soma;
    }
    return integrado;
}

function contaRepeticao(dados) {
    var itens = [], contador = 0, temporario, numObj = 0;
    itens.push(new Object());
    do {
        temporario = dados[0];
        for (j = 0; j < dados.length; j++) {
            if (temporario == dados[j]) {
                dados.splice(j, 1);//apaga numeros ja testados para diminuir repetições
                j--;
                contador++;
            }
        }
        itens[numObj].name = temporario;
        itens[numObj].value = contador;
        contador = 0;
        numObj++;
        if (dados.length != 0) {
            itens.push(new Object());
        }
        else {
            return itens;
        }
    } while (dados.length != 0);
    return itens;
}

function geraLista(vetor) {
    var tamanho = vetor.length;
    var lista = document.getElementById('columns');
    var item;
    for (i = 0; i < tamanho; i++) {
        item = document.createElement('li');
        item.classList.add("column");
        lista.appendChild(item);
        item.innerText = vetor[i].name;
    }
}

function geraTabela(vetor) {
    var tamanho = vetor.length;
    var soma = 0;
    var valores = [0, 0, 0, 0, 0, 0];
    for (i = 0; i < tamanho; i++) {
        soma += vetor[i].value;
    }
    var titulo = document.getElementById('titulo');
    titulo.innerHTML = document.getElementById('cNome').value;
    var tabela = document.getElementById('tabela');
    var linha;
    document.getElementById("graficos").style.display = "block";
    for (i = 0; i < tamanho; i++) {
        linha = document.createElement('tr');
        tabela.appendChild(linha);
        valores[0]++;
        valores[1] = vetor[i].name;
        valores[2] = vetor[i].value;
        valores[3] = (valores[2] * 100 / soma);
        valores[4] += valores[2];
        valores[5] += valores[3];
        table.push(valores.slice());
        for (j = 0; j < 6; j++) {
            celula = document.createElement('td');
            if (j == 0) {
                celula.classList.add("coluna1");
            }
            linha.appendChild(celula);
            if (j == 3 || j == 5) {
                celula.innerText = valores[j].toFixed(2) + " % ";
            }
            else {
                celula.innerText = valores[j];
            }
        }
    }
    if (continua == false) {
        var coluna = document.getElementsByClassName('coluna1');
        tamanho = coluna.length;
        for (i = 0; i < tamanho; i++) {
            coluna[i].style.display = "none";
        }
    }
    for (var i = 0; i < table.length; i++) {
        entrada.push(String(table[i][1]));
        valoresEntrada.push(String(table[i][1]));
        valoresTotais.push(table[i][3]);
        data.push({
            name: table[i][1], y: table[i][3]
        });
        categoria.push({
            name: String(table[i][1]),
            data: [table[i][3]]
        });
    }
}

// FUNÇÕES PARA CALCULOS
function geraCalculos(vetor) {
    if (caracter == true) {
        var valores = {
            "Moda": moda(vetor),
            "Mediana": mediana(vetor),
            "Medidas Separatrizes": separatriz(document.getElementById("arrastar").value, vetor)
        };
    }
    else {
        var valores = {
            "Média": (media(vetor)).toFixed(2),
            "Moda": moda(vetor),
            "Mediana": mediana(vetor),
            "Medidas Separatrizes": separatriz(document.getElementById("arrastar").value, vetor),
            "Desvio Padrão": (desvio(getRadioValor('tTipo'), vetor)).toFixed(4),
            "Coeficiênte de Variação": ((desvio(getRadioValor('tTipo'), vetor) * 100) / media(vetor)).toFixed(2) + " % "
        };
    }
    var calculo = document.getElementById('calculo');
    var paragrafo;
    for (var key in valores) {
        paragrafo = document.createElement('p');
        calculo.appendChild(paragrafo);
        paragrafo.innerText = key + " : " + valores[key];
    }
    SetSession("ResultadoCalculos",valores);
}

function media(vetor) {
    var soma = 0, divisor = 0, num = [], n;
    if (continua == true) {
        for (var i = 0; i < vetor.length; i++) {
            num = (vetor[i].name).split("|---");
            n = (parseFloat(num[0]) + parseFloat(num[1])) / 2;
            soma += n * vetor[i].value;
            divisor += vetor[i].value;
        }
    }
    else {
        for (var i = 0; i < vetor.length; i++) {
            soma += vetor[i].name * vetor[i].value;
            divisor += vetor[i].value;
        }
    }
    return soma / divisor;
}


function moda(vetor) {
    var mod = [], maior = 0;
    var tamanho = vetor.length;
    for (var i = 0; i < tamanho; i++) {
        if (vetor[i].value > maior) {
            mod = [];
            maior = vetor[i].value;
            mod.push(vetor[i].name);
        }
        else if (vetor[i].value == maior) {
            mod.push(vetor[i].name);
        }
    }
    if (continua == true) {
        mod = mod[0].split(" |--- ");
        mod = (parseFloat(mod[0]) + parseFloat(mod[1])) / 2;
    }
    return mod;
}

function mediana(vetor) {
    var soma = 0;
    var tamanho = vetor.length;
    for (var i = 0; i < tamanho; i++) {
        soma += parseFloat(vetor[i].value);
    }
    if (soma % 2 == 1) {
        var n1 = soma / 2;
        var med = meio(n1 + 0.5, false, vetor);
    }
    else {
        var n1 = soma / 2;
        var med = meio(n1, true, vetor);
    }
    if (continua == true) {
        var valores = [], lim, fac, fi, inter;
        for (var i = 0; i < med.length; i++) {
            for (var j = 0; j < table.length; j++) {
                if (table[j][1] == med[i]) {
                    lim = med[i].split(" |--- ");
                    inter = parseFloat(lim[1]) - parseFloat(lim[0]);
                    lim = parseFloat(lim[0]);
                    if (j == 0) {
                        fac = 0;
                    }
                    else {
                        fac = table[j - 1][4];
                    }
                    fi = table[j][2];
                    valores.push(lim + ((n1 - fac) / fi) * inter);
                    break;
                }
            }
        }
        return valores;
    }
    return med;
}

function meio(posicao, paridade, vetor) {
    var tamanho = vetor.length;
    for (var i = 0; i < tamanho; i++) {
        if (posicao > vetor[i].value) {
            posicao -= vetor[i].value;
        }
        else if (posicao < vetor[i].value) {
            return [vetor[i].name];
        }
        else {
            return (paridade == false) ? [vetor[i].name] : isNaN(vetor[i].name) ? [vetor[i].name, vetor[i + 1].name] : (parseFloat(vetor[i].name) + parseFloat(vetor[i + 1].name)) / 2;
        }
    }
}

function separatriz(porc, vetor) {
    var tamanho = vetor.length, soma = 0, pos, val;
    for (var i = 0; i < tamanho; i++) {
        soma += parseFloat(vetor[i].value);
    }
    pos = soma * porc / 100;
    if (pos % 1 === 0) {
        med = meio(pos, false, vetor);
    }
    else {
        med = meio(Math.ceil(pos), true, vetor);
    }
    if (continua == true) {
        var valores = [], lim, fac, fi, inter;
        for (var i = 0; i < med.length; i++) {
            for (var j = 0; j < table.length; j++) {
                if (table[j][1] == med[i]) {
                    lim = med[i].split(" |--- ");
                    inter = parseFloat(lim[1]) - parseFloat(lim[0]);
                    lim = parseFloat(lim[0]);
                    if (j == 0) {
                        fac = 0;
                    }
                    else {
                        fac = table[j - 1][4];
                    }
                    fi = table[j][2];
                    valores.push(lim + ((pos - fac) / fi) * inter);
                    break;
                }
            }
        }
        return valores;
    }
    return med;
}

function desvio(tipo, vetor) {
    var tipoCalculo = tipo == "amostra" ? 1 : 0;
    var med = media(vetor);
    var divisor = 0, soma = 0, cont;
    var tamanho = vetor.length;
    for (var i = 0; i < tamanho; i++) {
        if (continua == true) {
            cont = vetor[i].name.split(" |--- ");
            cont = (parseFloat(cont[0]) + parseFloat(cont[1])) / 2;
        }
        else {
            cont = parseFloat(vetor[i].name);
        }
        soma += (((cont - med) ** 2) * parseFloat(vetor[i].value));
        divisor += parseFloat(vetor[i].value);
    }
    return ((soma / (divisor - tipoCalculo)) ** 0.5);
}

$(function () {
    $("#columns").sortable();
    $("#columns").disableSelection();
});

var dragSrcEl = null;

function handleDragStart(e) {
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);

    this.classList.add('dragElem');
}
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    this.classList.add('over');

    e.dataTransfer.dropEffect = 'move';

    return false;
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    if (dragSrcEl != this) {
        this.parentNode.removeChild(dragSrcEl);
        var dropHTML = e.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin', dropHTML);
        var dropElem = this.previousSibling;
        addDnDHandlers(dropElem);

    }
    this.classList.remove('over');
    return false;
}

function handleDragEnd(e) {
    this.classList.remove('over');
}

function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragenter', handleDragEnter, false)
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);

}

var cols = document.querySelectorAll('#columns .column');
[].forEach.call(cols, addDnDHandlers);

function GraficoPizza() {
    Highcharts.setOptions({
        colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7
                },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')]
                ]
            };
        })
    });

    Highcharts.chart('pizza', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Gráfico Qualitativo'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            name: 'Share',
            data: data
        }]
    });
}

function GraficoBarraSeparadas() {
    Highcharts.chart('barraSeparada', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Gráfico Quantitativa Discreta'
        },
        xAxis: {
            categories: entrada
        },
        credits: {
            enabled: false
        },
        series: categoria
    });
}

function GraficoBarraJuntas() {
    console.log(valoresEntrada);
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            valoresEntrada,
            valoresTotais
        ]);

        var options = {
            chart: {
                title: 'Estatistica Quantitativa Contínua',
                subtitle: 'passe o mouse sobre as barras',
            },
            bars: 'vertical',
            vAxis: { format: 'decimal' },
            height: 400,
            colors: ['#1b9e77', '#d95f02', '#7570b3']
        };

        var chart = new google.charts.Bar(document.getElementById('barraJuntas'));

        chart.draw(data, google.charts.Bar.convertOptions(options));

        var btns = document.getElementById('btn-group');

        btns.onclick = function (e) {

            if (e.target.tagName === 'BUTTON') {
                options.vAxis.format = e.target.id === 'none' ? '' : e.target.id;
                chart.draw(data, google.charts.Bar.convertOptions(options));
            }
        }
    }
}