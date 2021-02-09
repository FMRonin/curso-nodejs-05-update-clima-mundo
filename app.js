const { InquirerMenu, 
        InquirerPause, 
        InquirerReadInput, 
        InquireList } = require('./helpers/inquirer');
const Searcher = require('./models/searcher');

require('colors')

const main = async() =>{
    let opt = ''
    const searcher = new Searcher();
    do {
        opt = await InquirerMenu()
        
        switch (opt) {
            case 'SEARCH':
                //Solicitar ciudad
                const query = await InquirerReadInput('Que ciudad busca:')
                //Seleccionar de las opcones
                const cities_option = await searcher.GetCity(query)
                const city_id = await InquireList(cities_option)
                if (city_id === 'NONE') continue;
                const city = cities_option.find( c => c.id === city_id)
                const weather = await searcher.GetWeather(city.lat,city.lon)
                //Motrar clima de la ciudad seleccionada
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ',city.name.green);
                console.log('Latitud: ',city.lat);
                console.log('Longitud: ',city.lon);
                console.log('Temperatura: ', weather.temp);
                console.log('Maxima: ', weather.temp_max);
                console.log('Minima: ',weather.temp_min);
                console.log('Descripción: ',weather.desc);
                searcher.SetHistoric(city.name)
                break;
            case 'HISTORIC':
                searcher.historic.forEach((place,index) => {
                    const idx = `${index + 1}.`.green
                    console.log(`${idx}${place}`);
                });
                break;
            case 'QUIT':
                console.clear();
                break;
        }
        
        if (opt !== 'QUIT'){
            await InquirerPause()
        } 
    } while (opt !== 'QUIT');
}

main()