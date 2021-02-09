const inquirer = require('inquirer');
require('colors')

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            {value:'SEARCH',name:`${'1.'.green} Buscar ciudad`},
            {value:'HISTORIC',name:`${'2.'.green} Ver ultimas busquedas`},
            {value:'QUIT',name:`${'0.'.green} Salir`}
        ]
    }
]

const InquirerMenu = async() => {
    console.clear()
    console.log('=========================='.green)
    console.log('   Selecione una opción   '.green)
    console.log('==========================\n'.green)

    const {option} = await inquirer.prompt(questions)

    return option
}

const InquirerPause = async() => {

    const question = [{
        type:'input',
        name:'pause',
        message:`Presione ${'ENTER'.green} para continuar`
    }]

    await inquirer.prompt(question)
}

const InquirerConfirm = async(message = 'desea confirmar acción') => {
    const question =[{
        type:'confirm',
        name:'ok',
        message,
        default:false
    }]
    const {ok} = await inquirer.prompt(question)
    return ok 
}

const InquireList = async( items = []) => {
    const choices = items.map((item,index) => {
        const idx = `${index+1}.`.green
        return {value:item.id,name:`${idx}${item.name}`}
    })
    choices.unshift({
        value:'NONE',
        name: `${'0.'.green}Ninguna`
    })
    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione una opción',
            choices
        }
    ]
    
    const {id} = await inquirer.prompt(questions)
    return id
}

const InquirerReadInput = async(message = 'Por favor ingrese un valor') => {
    const question =[{
        type:'input',
        name:'options',
        message,
        validate(value) {
            if(value.length === 0)
                return 'Por favor ingrese un valor'
            return true
        }
    }]
    const {options} = await inquirer.prompt(question)
    return options
}

module.exports = {
    InquirerMenu,
    InquirerPause,
    InquirerReadInput,
    InquireList
}