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
        let pokemonData = '<p><b>Id</b>: #'+data.id +'<br><b>Nombre:</b> ' + data.name + '<br>';
        const typesName = data.types.map(item => item.type.name);
        //document.getElementById('pokemonType').innerHTML = '<p> Tipo: ' + typesName + '</p>';
        pokemonData +=  '<b>Tipo:</b> ' + typesName + '<br>';

       const stats = data.stats.map(item => `<b>${item.stat.name.toUpperCase()}:</b>  ${item.base_stat}`);
       pokemonData += "<b>Estadísticas:</b> <br>"
        stats.forEach(element => {
            pokemonData += element+'<br>';
        }) 
        document.getElementById('description').innerHTML= pokemonData + '</p>';

        const movesName = data.abilities.map(item => item.ability.name);
        document.getElementById('moves').innerHTML='<b>Habilidades:</b> <br> ';
        movesName.forEach(element => {
            document.getElementById('moves').innerHTML +=element+'<br>';
        }) 

    }
    else{
        document.getElementById('pimage').src = 'images/error.gif';       
    }
}
