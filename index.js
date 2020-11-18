const express = require("express")   
const app = express()
const bodyParser = require('body-parser')  // pegar os dados do front-end
const connection = require('./databse/db')
const {Jogo, Aposta} = require('./models/Jogos')



connection
    .authenticate()
    .then(()=>{
    console.log('Conexão Feita!')
    })
    .catch((Erro) =>{
        console.log(Erro)
    })

app.set('view engine', 'ejs')
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/test/:aname?", (req, res) =>{
    var nome = "Vinicius"
    aname = req.params.aname

    var notas = [ 1,2,3,4,5,6,7,8,9,10]


    

    res.render("index", {
        nome: nome,
        aname: aname,
        notas: notas,
    })
})


app.get('/', (req, res) =>{
    Jogo.findAll({raw: true}).then(jogo =>{
        res.render('criarjogos',{  
            jogo: jogo

        })
    })
    
   

    
})

app.post('/salvarresultado', (req,res) =>{
    var resultados = []
    var temporaria
    Jogo.findAll({raw:true}).then((jogo) =>{
        //jogo é array
        console.log(jogo.length) // aqui ele retorna que o tamanho é 5!
        //for e salvar em outro db <% jogo.forEach(jogos =>{  %>
        jogo.forEach(jogos =>{
            valor = 'resultado'+jogos.id
            //console.log(jogos)

            temporaria = 'ID:' + jogos.id + 'Resultado:' + req.body[valor] + '|'
            resultados.push(temporaria)
            var id = jogos.id
            var aposta = req.body[valor]
          //  console.log('ID:['+id+'] Aposta: '+aposta)
            if (aposta){
                Aposta.create({
                    idjogo: id,
                    aposta: aposta,
                }).then()
            }
            
          
        })
        res.send('Chegou Aqui! '+ ' resultados -> ' + resultados)
    })

})

app.post('/salvarjogo', (req, res) =>{
    var tc = req.body.timeum
    var tf = req.body.timedois
    Jogo.create({
       timecasa: tc,
       timefora: tf,
    }).then(()=>{
        res.redirect('/')
    })
   
})

app.listen(3000, () =>{
    console.log('Servidor Iniciado!')
} )


/*
Aposta.create({
                idjogo: jogos.id,
                aposta: req.body[valor],

            })
*/