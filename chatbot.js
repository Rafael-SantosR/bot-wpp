// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
        // Força o uso do Chromium bundled
        executablePath: undefined
    }
});

client.on('qr', qr => {
    console.clear();
    console.log("📲 Escaneie o QR code abaixo no WhatsApp:");
    qrcode.generate(qr, { small: true }); // só ASCII
});

client.on('ready', () => {
    console.log('✅ Tudo certo! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

const opcoesValidas = ['1','2','3','4','5']
// let parada = 0;
// let primeiraMsgEnviada = false;
// Funil
const usuarios ={};

// Tempo máximo de inatividade (30 minutos)
const TEMPO_RESET = 30 * 60 * 1000;

setInterval(() => {
    const agora = Date.now();
    for (const numero in usuarios) {
        if (agora - usuarios[numero].lastActive > TEMPO_RESET) {
            console.log(`🔄 Resetando lead: ${numero}`);
            usuarios[numero] = { parada: 0, primeiraMsgEnviada: false, lastActive: 0 };
        }
    }
}, 5 * 60 * 1000); // check de 5 minutos



client.on('message', async msg => {
    
    if (!usuarios[msg.from]) {
        usuarios[msg.from] = {parada : 0, primeiraMsgEnviada:false, lastActive: Date.now()};
    }

    const user = usuarios[msg.from];
    user.lastActive = Date.now();

    if (!user.primeiraMsgEnviada  && msg.body && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(1000); //delay de 1 segundo
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(2000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'Olá! '+ name.split(" ")[0] + ', Sou o assistente virtual do Rafael. Como posso ajudá-lo hoje?\n Por favor, digite uma das opções abaixo:\n\n1 - Como funciona\n2 - Valores dos planos\n3 - Benefícios\n4 - Como aderir\n5 - Outras perguntas'); //Primeira mensagem de texto

        user.primeiraMsgEnviada = true;
        return;
        
    }

    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(2000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(2000);
        await client.sendMessage(msg.from, 'O chatbot é uma forma de automatizar respostas aos clientes, dessa forma o cliente nunca fica esperando a resposta, sempre que enviado uma mensagem correspondente o chat inicia o contato primário, caso o contato com o chat não sane as duvidas do cliente é possivel adicionar uma opção para que o cliente fale diretamente com um atendente.');

        await chat.sendStateTyping(); // Simulando Digitação
        await delay(2000);
        await client.sendMessage(msg.from, 'Tem mais alguma duvida ? Se sim, por favor, digite uma das opções abaixo:\n\n1 - Como funciona\n2 - Valores dos planos\n3 - Benefícios\n4 - Como aderir\n5 - Outras perguntas');


    }   
    
    else if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(2000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(2000);
        await client.sendMessage(msg.from, '*Plano Individual:* R$22,50 por mês.\n\n*Plano Família:* R$39,90 por mês, inclui você mais 3 dependentes.\n\n*Plano TOP Individual:* R$42,50 por mês, com benefícios adicionais como\n\n*Plano TOP Família:* R$79,90 por mês, inclui você mais 3 dependentes');

        await delay(2000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(2000);
        await client.sendMessage(msg.from, 'Tem mais alguma duvida ? Se sim, por favor, digite uma das opções abaixo:\n\n1 - Como funciona\n2 - Valores dos planos\n3 - Benefícios\n4 - Como aderir\n5 - Outras perguntas');
    }

    else if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(2000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(2000);
        await client.sendMessage(msg.from, 'Sorteio de em prêmios todo ano.\n\nAtendimento médico ilimitado 24h por dia.\n\nReceitas de medicamentos');
        
        await delay(2000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(2000);
        await client.sendMessage(msg.from, 'Tem mais alguma duvida ? Se sim, por favor, digite uma das opções abaixo:\n\n1 - Como funciona\n2 - Valores dos planos\n3 - Benefícios\n4 - Como aderir\n5 - Outras perguntas');

    }

    else if (msg.body !== null && msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(2000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(2000);
        await client.sendMessage(msg.from, 'Você pode aderir aos nossos planos diretamente pelo nosso site ou pelo WhatsApp.\n\nApós a adesão, você terá acesso imediato');


        await delay(2000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(2000);
        await client.sendMessage(msg.from, 'Tem mais alguma duvida ? Se sim, por favor, digite uma das opções abaixo:\n\n1 - Como funciona\n2 - Valores dos planos\n3 - Benefícios\n4 - Como aderir\n5 - Outras perguntas');


    }

    else if ( msg.body !== null && msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(2000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(2000);
        await client.sendMessage(msg.from, 'Passarei você para um de nossos atendentes, aguarde até o atendente encaminhar uma nova mensagem. ');
        await delay(1000);
        await client.sendMessage(msg.from,'Enquanto aguarda escreva qual sua duvida para agilizar o processo.')
        user.parada = 1;
        return;

    }

    else if((user.parada !== 1) && msg.body && !opcoesValidas.includes(msg.body)){
        await client.sendMessage(msg.from, 'Não entendi');
        await client.sendMessage(msg.from,'Por favor, digite uma das opções abaixo:\n\n1 - Como funciona\n2 - Valores dos planos\n3 - Benefícios\n4 - Como aderir\n5 - Outras perguntas');
        
    }


});

