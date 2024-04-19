
console.log("---------LOGIN----------");

function validaLogin(email, senha) {
    if (email == null || email == ''){
        console.log("Preencha o e-mail");
        return;
    }
    if (senha == null || senha == ''){
        console.log("Preencha a senha");
        return;
    }
    usuario = email.substring(0, email.indexOf("@"));
    dominio = email.substring(email.indexOf("@")+ 1, email.length);
    
    if (!((usuario.length >=1) &&
        (dominio.length >=3) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".") >=1)&&
        (dominio.lastIndexOf(".") < dominio.length - 1))){
        console.log("E-mail inválido!");
        return;
    }

    var letrasMaiusculas = /[A-Z]/;
    var letrasMinusculas = /[a-z]/; 
    var numeros = /[0-9]/;
    var caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

    if(letrasMaiusculas.test(senha) && letrasMinusculas.test(senha) && numeros.test(senha) && caracteresEspeciais.test(senha)){
        console.log('Login efetuado com sucesso!');
    } else {
        console.log('Senha não está no padrão desejado!');
    }
}

function validarEmail(email){
    usuario = email.substring(0, email.indexOf("@"));
    dominio = email.substring(email.indexOf("@")+ 1, email.length);
    
    if (!((usuario.length >=1) &&
        (dominio.length >=3) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".") >=1)&&
        (dominio.lastIndexOf(".") < dominio.length - 1))){
        
        console.log("Insira um e-mail válido");
        return false;
    } else {
        return true;
    }
}

function validarNome(nome){
    if(nome == null || nome == "" || nome == undefined){
        console.log("Insira um nome válido!");
        return false;
    }else{
        return true;
    }
}
validaLogin('teste@teste.com', 'Abc123@');


 //----------------------------------------------------------------------
console.log("----------CADASTRO DO CLIENTE----------");

function cadastrarCliente(nome, cpf,endereco, telefone, email){
    if(!nome || !cpf || !endereco || !telefone || !email){
        console.log("Campos não preenchidos, por favor preenchê-los.");
        return;
    }

    if(!validarNome(nome) || !validarCPF(cpf) || !validarEmail(email) || !validarTelefone(telefone)){
        return;
    }
    
    console.log("Cadastro realizado com sucesso!");

    function validarCPF(cpf){
        if (cpf.length != 11 ||
            cpf == "00000000000"||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999"){
                console.log("Insira um CPF válido");
                return false;
        } else {
            return true;
        }
            
    }

    function validarTelefone(telefone) {
        let regex = /^\d{10}$/; // Formato esperado: 10 dígitos numéricos
        
        if (regex.test(telefone)){
            console.log("Insira um telefone válido");
            return false;    
        }

        return true;
    }
    
}


//validaLogin('teste@teste.com', 'Abc123@');
cadastrarCliente('Adriana','02610570570','rua dois, 123', '11948065416','teste@teste.com');


//------------------------------------------------------------------------------------------------

console.log("Agendamento de consultas e arquivo JSON");
const fs = require('fs');

const agenda = {
    nome: 'Adriana',
    data: '19/04/2024',
    horario: '10:00',
    planoSaude :'true',
    motivo: 'avaliação'
}

const agenda2 = {
    nome: 'Teste',
    data: '22/04/2024',
    horario: '10:00',
    planoSaude :'false',
    motivo: 'avaliação'
}

const agenda3 = {
    nome: 'Joaozinho da Silva',
    data: '19/04/2024',
    horario: '14:00',
    planoSaude :'true',
    motivo: 'troca de prótese'
}

const agendamento ={};

function agendarConsulta(agendaParam){

    let nomeParam = agendaParam.nome;
    let dataParam = agendaParam.data;
    let horarioParam = agendaParam.horario;
    let planoParam = agendaParam.planoSaude;
    let motivoParam = agendaParam.motivo;

    if (!agendamento[dataParam] ){
        agendamento[dataParam] = [{nomeParam, horarioParam, planoParam, motivoParam}];
    }else{
        agendamento[dataParam].push({nomeParam, horarioParam, planoParam, motivoParam});
    }

    const agendaJSON = JSON.stringify(agendamento);
    const nomeDoArquivo = 'agenda.json';

    fs.writeFile(nomeDoArquivo, agendaJSON, (err) =>{
        if(err) { console.error('Ocorreu um erro na gravação', err);
            return;
        }
        //console.log("Arquivo json criado");
    })

}

function verificarDisponibilidade (agenda){
    if(!agendamento[agenda.data]){
        return true;
    }else{
        return !agendamento[agenda.data].incudes(agenda.horario);
    }
}


//Agendando a primeira consulta
if(verificarDisponibilidade(agenda.data, agenda.horario)) {
    agendarConsulta(agenda);
    console.log(`Consulta agendada para ${agenda.data} às ${agenda.horario} para o paciente ${agenda.nome}.`);
} else {
    console.log(`Desculpe, o horário ${agenda.horario} na data ${agenda.data} não está disponível.`);
}

//Agendando a segunda consulta
if(verificarDisponibilidade(agenda2.data, agenda2.horario)) {
    agendarConsulta(agenda2);
    console.log(`Consulta agendada para ${agenda2.data} às ${agenda2.horario} para o paciente ${agenda2.nome}.`);
} else {
    console.log(`Desculpe, o horário ${agenda2.horario} na data ${agenda2.data} não está disponível.`);
}


//Agendando a terceira consulta com mesma data
if(verificarDisponibilidade(agenda3.data, agenda3.horario)) {
    agendarConsulta(agenda3);
    console.log(`Consulta agendada para ${agenda3.data} às ${agenda3.horario} para o paciente ${agenda3.nome}.`);
} else {
    console.log(`Desculpe, o horário ${agenda3.horario} na data ${agenda3.data} não está disponível.`);
}