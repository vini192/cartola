const Sequelize = require('sequelize')
const connection = require('../databse/db')

const Jogo = connection.define('jogos', {

    timecasa:{
        type: Sequelize.STRING,
        allowNull: false
    },
    timefora:{
        type: Sequelize.STRING,
        allowNull: false
    },
    resultadojogo:{
        type: Sequelize.STRING,
        allowNull: true

    },
    jogo:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
    }
})


const Aposta = connection.define('aposta',{

    idjogo:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'jogos',
            key: 'id'
        }
    },
    aposta:{
        type: Sequelize.STRING,
        allowNull: false,
    }

})


Jogo.sync({force:false}).then(()=>{
    console.log('Tabela Jogo!')
})

Aposta.sync({force:false}).then(() =>{
    console.log('Tabela Aposta!')
})

module.exports ={
    Jogo,
    Aposta
}
