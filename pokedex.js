const pokemon = async () =>{
    let pname = document.getElementById('pnameIn').value;
    const api = 'https://pokeapi.co/api/v2/pokemon/'+ pname.toLowerCase();
    let pokemon = await fetch(api).then((result) => {

        if (result.status == '200'){
            return result.json();
        }
        else{
            console.log(result);
            pokemonData('error');
        }
    })

    if (pokemon){
        console.log(pokemon);
        pokemonData(pokemon);
    }
}

const pokemonData = (data) => {
    if(data!='error'){
        document.getElementById('pimage').src = data.sprites.front_default;
        //document.getElementById('pokemonName').innerHTML = '<p>Id: '+data.id +'<br> Nombre: ' + data.name + '</p>';
        let pokemonData = '<p>Id: '+data.id +'<br> Nombre: ' + data.name + '<br>';
        const typesName = data.types.map(item => item.type.name);
        //document.getElementById('pokemonType').innerHTML = '<p> Tipo: ' + typesName + '</p>';
        pokemonData +=  'Tipo: ' + typesName + '<br>';

       const stats = data.stats.map(item => `${item.stat.name} ${item.base_stat}`);
       pokemonData += "Estadísticas: <br>"
        stats.forEach(element => {
            pokemonData += element+'<br>';
        }) 
        document.getElementById('info').innerHTML= pokemonData + '</p>';

        const movesName = data.moves.map(item => item.move.name);
        document.getElementById('moves').innerHTML='';
        movesName.forEach(element => {
            document.getElementById('moves').innerHTML +=element+'<br>';
        }) 

    }
    else{
        document.getElementById('pimage').src = 'images/error.gif';       
    }
}
