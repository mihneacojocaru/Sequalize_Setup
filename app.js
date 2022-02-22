const {sequelize} = require('./models');

main = async ()=>{
    await sequelize.sync({force:true});
}

main();