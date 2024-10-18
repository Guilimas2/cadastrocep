'use stricp';// modo restrito
// esse modo faz com que o javascript opere de forma mais e rigorosa, ajudando a evitar erros comuns de programação
// consumo de API - https://viacep.com.br/

// funçao para limpar limpar formulario
const limparFormulario = () => {
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value =  '';
    document.getElementById('localidade').value =  '';
    document.getElementById('uf').value =  '';
}
// criar regra de expressao regular (regex) para testar valor inicial informado pelo usuario 
const eNumero = (Numero) => /^[0-9]+$/. test(Numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);
// length e uma propiedade que verifica a quantidade de caracteres dentro do cep

// função para preencher formulario como campos  da API 
const preencherFormulario = (endereco) => {
    document.getElementById('logradouro').value= endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('localidade').value= endereco.localidade ;
    document.getElementById('uf').value= endereco.uf;
}
// FUNÇÃO DE CONSUMO DE API VIA CEP
// função ASSÍNCRONAS são úteis quando dependemos do resultado de alguma coisa para executar a função.
const pesquisarcep = async() => {
    // ASYNC essas funções podem realizar operações que demoram algum tempo, sem bloquear a execução do programa./  é uma forma de escrever funções que podem fazer várias coisas ao mesmo tempo, sem travar o programa
    limparFormulario();
    const url = `https://viacep.com.br/ws/${cep.value}/json/`;
 
    if(cepValido(cep.value)){
        const dados = await fetch(url);
        // FETCH é um metodo do js que faz um pedido para via cep, e dar retorno.
        const addres = await dados.json();
        // JSON  é um formato leve para trocar dados, é usado principalmente para enviar e receber dados entre um cliente e um servidor.
 
       
        if(addres.hasOwnProperty('erro')){
            alert('CEP não encontrado');
        } else{
            preencherFormulario(addres);
        }
    }else{
        alert("CEP Incorreto!");
    }
}
// ADICIONAR ESCUTADOR PARA EXECUTAR CONSUMO DE API DA ViaCep
document.getElementById('cep').addEventListener('focusout', pesquisarcep);

// BLOCO PARA VALIDAÇAO DE EMAIL
// --------------------------------------------------------------------
function chegarEmail(){
    if(document.forms[0].email.value == "" || 
       document.forms[0].email.value.indexOf('@') == -1 ||
       document.forms[0].email.value.indexOf('.') == -1)
       {
        alert("Por favor infrome um email valido");
        return false;
    }else{
        alert("email informado com sucesso!");
        document.getElementById('email').innerHTML = document.forms[0].email.value 
    }
}
// --------------------------------------------------------------------

// CODIGO DE VERICAÇAO DE EMAIL DIGITADO
// --------------------------------------------------------------------

function verifica(){
    if(document.forms[0].email.value == 0){
        alert("Por favor, corno, informe um E-mail");
        document.frmEnvia.email.focus();
        return false;
    }
    return true;
}
// --------------------------------------------------------------------
 //validaçao para validaçao de acessar 

 // VALIDA DE CPF 

    // Adicionar escutador à página 
    document.getElementById("cpfform").addEventListener("submit", function(event){
        event.preventDefault();
    
        const cpf = document.getElementById("cpf").value;
        const msg = document.getElementById("message")
    
        if(validarCPF(cpf)){
            msg.textContent = "O CPF é válido";
            msg.style.color = "green"; 
        }else{
            msg.textContent = "O CPF é inválido";
            msg.style.color = "red";
        }
    }
    );
        //  Função de cálculo  de validação do CPF 
        function validarCPF(cpf){
        cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não númericos    
    
        //  Verificar se o valor infromado contem 11 dígitos e se todos são dígitos iguais 
        if(cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)){
        return false;
        }   
        let soma = 0;
        let resto; 
    
        // validação do primeiro digito verificação
        for(let i = 1; i <= 9; i++){
            soma += parseInt(cpf.substring(i-1, i)) * (11- i);
        }
        resto = (soma * 10) % 11;  
        if((resto === 10) || (resto === 11)){
            resto = 0 
        }
        
        if(resto !== parseInt(cpf.substring(9, 10))){
            return false;
          
        }
        soma = 0
    
        //validar 11 digitos do CPF - digitos verificador
        for(let i = 1; i <= 10; i++){
            soma += parseInt(cpf.substring(i-1, i)) * (12 - i); 
        }
        resto = (soma * 10 ) % 11; 
        if((resto === 10 ) || (resto === 11)){
            resto = 0;
        }
        if(resto !== parseInt(cpf.substring(10, 11))){
            return false; 
        }
        return true; 
    }

 
