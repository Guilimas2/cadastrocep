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
 
