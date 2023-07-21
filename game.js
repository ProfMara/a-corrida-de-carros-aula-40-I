class Game{
    constructor(){
        this.botao = createButton("");
        this.placarTitulo = createElement("h2");
        this.lugar1 = createElement("h2");
        this.lugar2 = createElement('h2');

    }
    mostrarPlacar(){
        var players = Object.values(allPlayers);
        var lugar1, lugar2;
        //situação 1: ninguém cruzou a linha de chegada
        if((players[0].rank == 0 && players[1].rank == 0) || players[0].rank == 1){
            //lugar 1: jogador[0]
            lugar1 = players[0].rank 
            + "&emsp;" 
            + players[0].nome 
            + "&emsp;" 
            + players[0].score;
            //lugar 2: jogador[1]
            lugar2 = players[1].rank 
            + "&emsp;"
            + players[1].nome
            + "&emsp;"
            + players[1].score

        }
        //situação 2: player 2 cruzou a linha de chegada
        if(players[1].rank==1){
             //lugar 1: jogador[1]
             lugar1 = players[1].rank 
             + "&emsp;" 
             + players[1].nome 
             + "&emsp;" 
             + players[1].score;
             //lugar 2: jogador[0]
             lugar2 = players[0].rank 
             + "&emsp;"
             + players[0].nome
             + "&emsp;"
             + players[0].score
        }
        this.placarTitulo.html("PLACAR");
        this.lugar1.html(lugar1);
        this.lugar2.html(lugar2);
    }

    handleElements(){
        //definir a posição do elemento
        this.botao.position(width*0.66,1*100)
        this.placarTitulo.position(width*0.33,1*100);
        this.lugar1.position(width*0.33,1.5*100);
        this.lugar2.position(width*0.33,2*100);
        //definir o estilo
        this.botao.class("resetButton");
        this.placarTitulo.class("leadersText")
        this.lugar1.class("leadersText");
        this.lugar2.class("leadersText");


        this.botao.mousePressed(()=>{
            //limpar o banco de dados
            database.ref("/").set({
                gameState:0, playerCount:0
            })
            //reiniciar a página
            window.location.reload()
        })
    }

    start(){
        //cria o objeto form da classe Form
        form = new Form();
        //chama o método exibir do formulário
        form.exibir();

        //cria uma instância de novo jogador
        player = new Player();
        player.getCount();

        car1 = createSprite(width/2-100, height-100)
        car1.addImage("carro", carimg1);
        car1.scale = 0.07;

        car2 = createSprite(width/2+100, height-100)
        car2.addImage("carro", carimg2);
        car2.scale = 0.07;
        //agrupa os carrinhos na mesma variável
        cars = [car1, car2];
        //criar o grupo das moedas
      

    }
    


    play(){
        form.esconder();
        Player.getInfo();
        this.handleElements();
        if (allPlayers !== undefined){
            image (pista, 0, -height*4.5, width, height*6)
            this.mostrarPlacar()
            var i = 0;
            for(var plr in allPlayers){
                //pega o valor do banco de dados
                var x = allPlayers[plr].posicaoX;
                var y = height - allPlayers[plr].posicaoY;
                //atribui o valor na sprite do pc local
                cars[i].position.x = x;
                cars[i].position.y = y;
                i++;
                if(player.indice == i){
                    //definir a posição da câmera
                    camera.position.y = y;
                    //add o nome do jogador
                    
                    
                }
            }
            this.controlarCarro()
            drawSprites()
        }
        
    }

    controlarCarro(){
        //checa se pressionou para cima
        if(keyDown(UP_ARROW)){
            player.posY += 10;
            player.update();
        }
    }

    //lê no banco de dados e copia o valor de gameState
    getState(){
        database.ref("gameState").on("value", function(data){
            gameState = data.val();
        })
    }

    //atualiza o valor de gameState 
    update(state){
        database.ref("/").update({
            gameState:state
        })
    }
 

}