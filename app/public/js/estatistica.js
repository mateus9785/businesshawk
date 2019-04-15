var semRepeticao,varia=0,continua=false,caracter=false,table=[];

function baixar(){
    var content=document.getElementById('conteudoArquivo').value;
    if(content==""){
        alert('Por favor, entre com as informações');
        document.getElementById('conteudoArquivo').focus();
    }
    else{
        filename=prompt("Digite o nome do arquivo");
        contentType="csv";
        if(!contentType){
            contentType = 'application/octet-stream';
        }
        var a = document.createElement('a');
        var blob = new Blob([content], {'type':contentType});
        a.href = window.URL.createObjectURL(blob);
        a.download = filename+"."+contentType;
        a.click();
    }
}

function adicionar(){
    var fileContents = document.getElementById('conteudoArquivo');
    var vezes=document.getElementById('varios').value;
    var elemento=document.getElementById('cElem').value;
    if(vezes==""){
        alert('Por favor, digite o numero de vezes');
        document.getElementById('varios').focus();
    }
    else if(elemento==""){
        alert('Por favor, digite o elemento');
        document.getElementById('cElem').focus();
    }
    else{
        for(var i=0;i<vezes;i++){
            fileContents.value=(fileContents.value).trim()+" "+elemento;
        }
        document.getElementById('varios').value="";
        document.getElementById('cElem').value="";
    }
}
//Medidas separatrizes
$("#escolhas").change(function(){
    $("#" + this.value).show().siblings().hide();
  });
  $("#escolhas").change();//chama funcao quando escolhe opcao

$("#qualitativa").change(function(){
    varia++;
    if(varia%2==0){
        $("#palco").hide();
    }
    else{
        $("#palco").show();
    }
  });
  $("#qualitativa").change();//chama funcao quando escolhe opcao

function barraArrastar() {
    var x = document.getElementById("arrastar").value;
    if((document.getElementById('escolhas').value)=="quartil"&&x!=25&&x!=50&&x!=75&&x!=100){
        switch (true) {
            case (x < 24):
                document.getElementById("arrastar").value=25;
                break;
            case (x < 50):
                document.getElementById("arrastar").value=50;
                break;
            case (x < 75):
                document.getElementById("arrastar").value=75;
                break;
            default:
                document.getElementById("arrastar").value=100;
                break;
        }
    }
    else if((document.getElementById('escolhas').value)=="quintil"&&x!=20&&x!=40&&x!=60&&x!=80&&x!=100){
        switch (true) {
            case (x < 20):
                document.getElementById("arrastar").value=20;
                break;
            case (x < 40):
                document.getElementById("arrastar").value=40;
                break;
            case (x < 60):
                document.getElementById("arrastar").value=60;
                break;
            case (x < 80):
                document.getElementById("arrastar").value=80;
                break;
            case (x <= 100):
                document.getElementById("arrastar").value=100;
        }
    }
    else if((document.getElementById('escolhas').value)=="decil"&&x!=10&&x!=20&&x!=30&&x!=40&&x!=50&&x!=60&&x!=70&&x!=80&&x!=90&&x!=100){
        switch (true) {
            case (x < 10):
                document.getElementById("arrastar").value=10;
                break;
            case (x < 20):
                document.getElementById("arrastar").value=20;
                break;
            case (x < 30):
                document.getElementById("arrastar").value=30;
                break;
            case (x < 40):
                document.getElementById("arrastar").value=40;
                break;
            case (x < 50):
                document.getElementById("arrastar").value=50;
                break;
            case (x < 60):
                document.getElementById("arrastar").value=60;
                break;
            case (x < 70):
                document.getElementById("arrastar").value=70;
                break;
            case (x < 80):
                document.getElementById("arrastar").value=80;
                break;
            case (x < 90):
                document.getElementById("arrastar").value=90;
                break;
            case (x <= 100):
                document.getElementById("arrastar").value=100;
        }
    }  
    else{
        document.getElementById("demo").innerHTML = x+" % ";
    }
}

function valida(){
    if((document.getElementById('cNome').value)==""){
        alert('Por favor, digite o nome da variável');
        document.getElementById('cNome').focus();
    }

    else if((document.getElementById('conteudoArquivo').value)==""){
        alert('Por favor, preencha a entrada de dados');
        document.getElementById('conteudoArquivo').focus();
    }
    else{
        tipo();
    }
}

document.getElementById("conteudoArquivo").onkeypress = function(e) {
    var chr = String.fromCharCode(e.which);
    if ("1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM; .".indexOf(chr) < 0)
      return false;
  };


function mascara(){
    var dados=(document.getElementById('conteudoArquivo').value);
    var numeros="1234567890";
    for(var i=0;i<numeros.length;i++){
        if(dados.indexOf(numeros[i])!=-1){
            dados=dados.replace(/ /g,";");
            break;
        }
    }
    dados=((((dados.trim()).replace(/,/g,"."))).replace(/\n/g,";")).split(";");
    return dados;
}


function verifica(){
    document.getElementById("qualitativa").style.display = "none";
    document.getElementById("escolha").style.display = "none";
    document.getElementById("palco").style.display = "none";
    if(getRadioValor('tQual')=="ordinal"){
        vet=[];
        var ordem=document.getElementsByClassName('column');
        for(var i=0;i<ordem.length;i++){
            vet.push(ordem[i].innerText);
        }
        console.log(" ordinal "+vet[0]);
        console.log("ORDEM"+vet);
        semRepeticao=ordenar(vet,semRepeticao);
    }
    geraTabela(semRepeticao);
    geraCalculos(semRepeticao); 
}

function getRadioValor(name){
    var rads = document.getElementsByName(name);
     
    for(var i = 0; i < rads.length; i++){
     if(rads[i].checked){
      return rads[i].value;
     }
    }
    return null;
}

function ordenar(sequencia,vetor){
    console.log("vet "+sequencia);
    console.log(vetor);    
    var certo=[],tamanho=vetor.length,comprimento=sequencia.length;
    for(j=0;j<comprimento;j++){
        for(i=0;i<tamanho;i++){
            if(sequencia[j]==vetor[i].name){
                certo.push(vetor[i]);
                break;
            }
        }
    }
    console.log(" ordenado : "+ certo);
    return certo;
}

function tipo(){
    var vetor=mascara();
    document.getElementById('campos').style.display = "none";
    //var prime=parseFloat(vetor[0]);
    if (isNaN(vetor[0])){
        document.getElementById("qualitativa").style.display = "block";
        document.getElementById("escolha").style.display = "block";
        document.getElementById("palco").style.display = "block";
        vetor=vetor.sort();
        semRepeticao=contaRepeticao(vetor);
        geraLista(semRepeticao);
        caracter=true;
    }
    else{
        vetor=vetor.sort(function(a, b){return a-b});
        semRepeticao=contaRepeticao(vetor);
        semRepeticao=(semRepeticao.length>7) ? integra(semRepeticao) : semRepeticao;
        geraTabela(semRepeticao);
        geraCalculos(semRepeticao);
    }
}

function integra(vetor){
    continua=true;
    var inicial=vetor[0].name;
    var amplitude=vetor[vetor.length-1].name-inicial;
    var numero=0,tamanho=vetor.length,k,classes;
    for(var i=0;i<tamanho;i++){
        numero+=vetor[i].value;
    }
    k=Math.trunc(numero**0.5);
    do{
        amplitude++;
        console.log("amplitude :"+amplitude);
        console.log("coenficiente :"+k);
        console.log("classes :"+classes);
        if(amplitude%(k-1)==0){
            classes=amplitude/(k-1);
            console.log("teste1 "+classes);
            k--;
            break;
        }
        if(amplitude%k==0){
            classes=amplitude/k;
            console.log("teste2 "+classes);
            break;
        }
        if(amplitude%(k+1)==0){
            classes=amplitude/(k+1);
            console.log("teste3 "+classes);
            k++;
            break;
        }
    }while(true);
    var soma,integrado=[];
    console.log(vetor);
    console.log("inicio :"+inicial);
    console.log("intervalo :"+classes);
    console.log("linhas :"+k);
    for(var j=1;j<=k;j++){
        integrado.push(new Object());
        soma=0;
        while((vetor.length!=0)){
            if(parseFloat(vetor[0].name)<parseFloat(inicial)+parseFloat(classes)*j){
                console.log("primeiro :",parseFloat(vetor[0].name));
                console.log("compara :",parseFloat(inicial)+parseFloat(classes)*j);
                console.log("inicial :",parseFloat(inicial));
                console.log("classes :",parseFloat(classes));
                console.log("j :",parseFloat(j));
                console.log(vetor);
                console.log(vetor[0]);
                console.log(vetor[0].value);
                soma+=vetor[0].value;
                vetor.shift();
            }
            else{
                break;
            }      
        }
        console.log(parseFloat(inicial)+(classes*(j-1)));
        console.log(parseFloat(inicial)+(classes*j));
        integrado[j-1].name=(parseFloat(inicial)+classes*(j-1)+" |--- "+(parseFloat(inicial)+classes*j));
        integrado[j-1].value=soma;       
    }
    console.log(" integrado "+integrado);
    return integrado;
}

function contaRepeticao(dados){
    var itens=[],contador=0,temporario,numObj=0;
    itens.push(new Object());
        do{
            temporario=dados[0];
            for(j=0;j<dados.length;j++){
                if(temporario==dados[j]){
                    dados.splice(j,1);//apaga numeros ja testados para diminuir repetições
                    j--;
                    contador++;
                }
            }   
            itens[numObj].name=temporario;
            itens[numObj].value=contador;
            contador=0;
            numObj++;
            if(dados.length!=0){
                itens.push(new Object());
            }
            else{
                return itens;
            }
        }while(dados.length!=0);
    return itens;
}

function geraLista(vetor){
    console.log(vetor);
    var tamanho=vetor.length;
    var lista = document.getElementById('columns');
    var item;
    for (i=0;i<tamanho;i++) {
        item = document.createElement('li');
        item.classList.add("column");
        lista.appendChild(item);
        item.innerText=vetor[i].name;
    }
}

function geraTabela(vetor){
    console.log(vetor);
    var tamanho=vetor.length;
    var soma=0;
    var valores=[0,0,0,0,0,0];
    for (i=0;i<tamanho;i++) {
        soma+=vetor[i].value;
    }
    var titulo = document.getElementById('titulo');
    titulo.innerHTML = document.getElementById('cNome').value;
    var tabela = document.getElementById('tabela');
    var linha;
    document.getElementById("graficos").style.display = "block";   
    for (i=0;i<tamanho;i++) {
        linha = document.createElement('tr');
        tabela.appendChild(linha);
        valores[0]++;
        valores[1]=vetor[i].name;
        valores[2]=vetor[i].value;
        valores[3]=(valores[2]*100/soma);
        valores[4]+=valores[2];
        valores[5]+=valores[3];
        table.push(valores.slice());
        for (j=0;j<6;j++) {
            celula = document.createElement('td');
            if(j==0){
                celula.classList.add("coluna1");
            }
            linha.appendChild(celula);
            if(j==3||j==5){
                celula.innerText = valores[j].toFixed(2)+" % ";
            }
            else{
                celula.innerText = valores[j];
            }
        }
    }
    if(continua==false){
        var coluna=document.getElementsByClassName('coluna1');
        tamanho=coluna.length;
        for(i=0;i<tamanho;i++){
            coluna[i].style.display = "none";
        }
    }
}

// FUNÇÕES PARA CALCULOS
function geraCalculos(vetor){
    if(caracter==true){
        var valores = {
            "Moda": moda(vetor),
            "Mediana": mediana(vetor),
            "Medidas Separatrizes": separatriz(document.getElementById("arrastar").value,vetor)
          };
    }
    else{
        var valores = {
            "Média": (media(vetor)).toFixed(2),
            "Moda": moda(vetor),
            "Mediana": mediana(vetor),
            "Medidas Separatrizes": separatriz(document.getElementById("arrastar").value,vetor),
            "Desvio Padrão" :(desvio(getRadioValor('tTipo'),vetor)).toFixed(4),
            "Coeficiênte de Variação" : ((desvio(getRadioValor('tTipo'),vetor)*100)/media(vetor)).toFixed(2)+" % "
          };
    }
    var calculo = document.getElementById('calculo');
    var paragrafo;
    for (var key in valores) {
        paragrafo = document.createElement('p');
        calculo.appendChild(paragrafo);
        paragrafo.innerText = key+" : "+valores[key];
    }
}

function media(vetor){
    var soma=0,divisor=0,num=[],n;
    if(continua==true){
        for(var i=0;i<vetor.length;i++){
            num=(vetor[i].name).split("|---");
            n=(parseFloat(num[0])+parseFloat(num[1]))/2;
            soma+=n*vetor[i].value;
            divisor+=vetor[i].value;
        }
    }
    else{
        for(var i=0;i<vetor.length;i++){
            soma+=vetor[i].name*vetor[i].value;
            divisor+=vetor[i].value;
        }
    }
    return soma/divisor;
}


function moda(vetor){
    var mod=[],maior=0;
    var tamanho=vetor.length;
    for(var i=0;i<tamanho;i++){
        if(vetor[i].value>maior){
            mod=[];
            maior=vetor[i].value;
            mod.push(vetor[i].name);
        }
        else if(vetor[i].value==maior){
            mod.push(vetor[i].name);
        }
    }
    if(continua==true){
        console.log(mod);
        mod=mod[0].split(" |--- ");
        mod=(parseFloat(mod[0])+parseFloat(mod[1]))/2;
    }
    return mod;
}

function mediana(vetor){
    console.log(table);
    var soma=0;
    var tamanho=vetor.length;
    for(var i=0;i<tamanho;i++){
        soma+=parseFloat(vetor[i].value);
    }
    if(soma%2==1){
        var n1=soma/2;
        var med=meio(n1+0.5,false,vetor);
    }
    else{
        var n1=soma/2;
        var med=meio(n1,true,vetor);
    }
    if(continua==true){
        console.log(" saida :"+med);
        var valores=[],lim,fac,fi,inter;
        for(var i=0;i<med.length;i++){
            console.log("teste");
            for(var j=0;j<table.length;j++){
                console.log("table[j][1] :",table[j][1]);
                console.log("med[i] ",med[i]);
                if(table[j][1]==med[i]){
                    lim=med[i].split(" |--- ");
                    console.log("lim "+lim);
                    inter=parseFloat(lim[1])-parseFloat(lim[0]);
                    console.log("inter "+inter);
                    lim=parseFloat(lim[0]);
                    console.log("lim "+lim);
                    if(j==0){
                        fac=0;
                    }
                    else{
                        fac=table[j-1][4];
                    }
                    console.log("fac "+fac);
                    fi=table[j][2];
                    console.log("fi "+fi);
                    console.log("n1 ",n1);
                    valores.push(lim+((n1-fac)/fi)*inter);
                    console.log("valores "+valores);
                    break;
                }
            }
        }
        return valores;
    }
    return med;
}

function meio(posicao,paridade,vetor){
    var tamanho=vetor.length;
    for(var i=0;i<tamanho;i++){
        if(posicao>vetor[i].value){
            posicao-=vetor[i].value;
        }
        else if(posicao<vetor[i].value){
            return [vetor[i].name];
        }
        else{
            return (paridade==false) ? [vetor[i].name] : isNaN(vetor[i].name) ? [vetor[i].name,vetor[i+1].name] : (parseFloat(vetor[i].name)+parseFloat(vetor[i+1].name))/2;
        }
    }
}

function separatriz(porc,vetor){
    var tamanho=vetor.length,soma=0,pos,val;
    for(var i=0;i<tamanho;i++){
        soma+=parseFloat(vetor[i].value);
    }
    pos=soma*porc/100;
    console.log("posicao",pos);
    if(pos%1===0){
        console.log("inteiro");
        med= meio(pos,false,vetor);
    }
    else{
        console.log("quebrado");
        med= meio(Math.ceil(pos),true,vetor);
    }
    if(continua==true){
        console.log(" saida :"+med);
        var valores=[],lim,fac,fi,inter;
        for(var i=0;i<med.length;i++){
            console.log("teste");
            for(var j=0;j<table.length;j++){
                console.log("table[j][1] :",table[j][1]);
                console.log("med[i] ",med[i]);
                if(table[j][1]==med[i]){
                    lim=med[i].split(" |--- ");
                    console.log("lim "+lim);
                    inter=parseFloat(lim[1])-parseFloat(lim[0]);
                    console.log("inter "+inter);
                    lim=parseFloat(lim[0]);
                    console.log("lim "+lim);
                    if(j==0){
                        fac=0;
                    }
                    else{
                        fac=table[j-1][4];
                    }
                    console.log("fac "+fac);
                    fi=table[j][2];
                    console.log("fi "+fi);
                    console.log("pos ",pos);
                    valores.push(lim+((pos-fac)/fi)*inter);
                    console.log("valores "+valores);
                    break;
                }
            }
        }
        return valores;
    }
    return med;
}

function desvio(tipo,vetor){
    var tipoCalculo = tipo=="amostra" ? 1 : 0;
    var med=media(vetor);
    console.log("media",med);
    var divisor=0,soma=0;
    var tamanho=vetor.length;
    for(var i=0;i<tamanho;i++){
        soma+=((parseFloat(vetor[i].name)-med)**2)*parseFloat(vetor[i].value);
        divisor+=parseFloat(vetor[i].value);
    }
    console.log("divisor ",divisor);
    console.log("soma ",soma);
    console.log("tipo ",tipoCalculo);
    console.log((soma/(divisor-tipoCalculo))**0.5);
    return ((soma/(divisor-tipoCalculo))**0.5);
}

$( function() {
    $( "#columns" ).sortable();
    $( "#columns" ).disableSelection();
  } );

function barras(vetor) {
    google.charts.load('current', {'packages':['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawStuff);
    function drawStuff() {
    var button = document.getElementById('change-chart');
    var chartDiv = document.getElementById('chart_div');
    var data = google.visualization.arrayToDataTable(vetor);
    var materialOptions = {width: 900,chart: {title: (document.getElementById('cNome').value),},
        series: {
            0: { axis: 'distance' }, // Bind series 0 to an axis named 'distance'.
            1: { axis: 'brightness' } // Bind series 1 to an axis named 'brightness'.
        },
        axes: {
        y: {
            distance: {label: 'parsecs'}, // Left y-axis.
            brightness: {side: 'right', label: 'apparent magnitude'} // Right y-axis.
        }
        }
    };

    function drawMaterialChart() {
        var materialChart = new google.charts.Bar(chartDiv);
        materialChart.draw(data, google.charts.Bar.convertOptions(materialOptions));
        button.innerText = 'Change to Classic';
        button.onclick = drawClassicChart;
    }

    drawMaterialChart();
    };
};
function pizza(vetor){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
    var data = google.visualization.arrayToDataTable(vetor);
    var options = {title: (document.getElementById('cNome').value)};
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);}
};
  


//UPLOAD
window.onload = function () {
    //Check the support for the File API support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('cAutomatico');
        fileSelected.addEventListener('change', function (e) {
            //Set the extension for the file
            
            //Get the file object
            var fivarobeRead = fileSelected.files[0];
            //Check of the extension match
             
             var fileExtension = fivarobeRead.name.split(".");
             fileExtension=fileExtension.pop();
             
            if (fileExtension=="txt" || fileExtension=="csv") {
                //Initialize the FileReader object to read the 2file
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    var fileContents = document.getElementById('conteudoArquivo');
                    fileContents.value = (fileReader.result).replace(/"\n"/g," ");
                }
                fileReader.readAsText(fivarobeRead);
            }
            else {
                alert("Por favor selecione arquivo texto");
            }

        }, false);
    }
    else {
        alert("Arquivo(s) não suportado(s)");
    }
}


var dragSrcEl = null;

function handleDragStart(e) {
  // Target (this) element is the source node.
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);

  this.classList.add('dragElem');
}
function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  this.classList.add('over');

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    //alert(this.outerHTML);
    //dragSrcEl.innerHTML = this.innerHTML;
    //this.innerHTML = e.dataTransfer.getData('text/html');
    this.parentNode.removeChild(dragSrcEl);
    var dropHTML = e.dataTransfer.getData('text/html');
    this.insertAdjacentHTML('beforebegin',dropHTML);
    var dropElem = this.previousSibling;
    addDnDHandlers(dropElem);
    
  }
  this.classList.remove('over');
  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  this.classList.remove('over');

  /*[].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });*/
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