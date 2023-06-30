var Game = null;

document.addEventListener('DOMContentLoaded', () => {

    const promise = GetGameModel();
    promise.then((data) => 
        Game = Object.keys(data).slice(1,9)
    );

    promise.then(() => {
        setTimeout(() => CreateGameList(), 400);
    })
});

async function CreateGameList(){
    console.log(Game)

    gameText=
    `<form>
        <div class="row">
            <div class="col-md-2 "></div>
            <div class="col-md-8 gamecontainer background">`;
    
            Game.forEach(Game => {
                gameText +=
                `<div class="row">
                    <div class="col-md-3 label">
                        <label for="Label${Game}">${Game} :</label>
                    </div>
                    <div class="col-md-9">
                        <input class="form-control" type="text" id="input_${Game}" name="input_${Game}">
                    </div>
                </div>`
            });

    gameText+=
            `
            <button type="button" class="btn btn-primary" onclick=PostGame()>Submit</button>
            </div>
            <div class="col-md-2 "></div>                
        </div>
    </form>`;

    document.getElementById('bodydiv').innerHTML+=gameText;
};



async function GetGameModel(){
    try{
        const response = await fetch('https://dampbackendapi.azurewebsites.net/mdl', {
            method: 'GET',
            headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Origin, Methods, Content-Type'
            }})

        if (!response.ok) { 
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        return data

    } 
    catch (error) {
        console.error(`Could not get game model: ${error}`);
    }
}

async function PostGame(){

    /*
    var GameObject = [];
    const element = {};

    
    Game.forEach(game => {
        if(document.getElementById(`input_${game}`).value != ""){
            element += `"${game}":${String(document.getElementById(`input_${game}`).value)},`
        }
    });

    console.log(element)
    GameObject.push(element)

    if(GameObject != [null]){
        Objecta = JSON.stringify(GameObject)
        console.log(GameObject)
    }
    */

    const name = String(document.getElementById("input_name").value);
    const description = String(document.getElementById("input_description").value);
    const price = parseInt(document.getElementById("input_price").value);
    const systemRequirements = String(document.getElementById("input_systemRequirements").value);
    const mininumRequirements  = String(document.getElementById("input_mininumRequirements").value);
    const releaseDate = Date.now();
    const developerId = parseInt(document.getElementById("input_developerId").value);
    const publisherId = parseInt(document.getElementById("input_publisherId").value);

    const data = {
        "name": name,
        "description": description,
        "price": price,
        "systemRequirements": systemRequirements,
        "mininumRequirements": mininumRequirements,
        "releaseDate": new Date(releaseDate).toISOString()
    };

    console.log(data)

    /*
    const promise = GetDevelopersBygame(developerId)
    promise.then((dev) => 
        data.developer = dev
    );

    promise.then(() => {
        const promise = GetPublisherBygame(publisherId)
        promise.then((Pub) => 
            data.publisher = Pub
        );
    })

    promise.then(() => {
        setTimeout(() => PostGameData(data), 400);
    })
    */
}

async function PostGameData(data){
    console.log(data)
    try{
        const response = await fetch('https://dampbackendapi.azurewebsites.net/api/Games', {
            method: 'POST',
            headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Origin, Methods, Content-Type'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) { 
            throw new Error(`HTTP error: ${response.status}`);
        }

        return location.replace(`/StorePage/StorePage.html`);
    } 
    catch (error) {
        console.error(`Could post game model: ${error}`);
        return false;
    }
}

async function GetDevelopersBygame(developerId){
    try{ 
            const response = await fetch(`https://dampbackendapi.azurewebsites.net/api/Developers/${developerId}`, {
                method: 'GET',
                headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Origin, Methods, Content-Type'
                }})

            if (!response.ok) { 
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();
            return data
    } catch (error) {
        console.error(`Could not get Games: ${error}`);
    }
}

async function GetPublisherBygame(publisherId){
    try{ 
            const response = await fetch(`https://dampbackendapi.azurewebsites.net/api/Publishers/${publisherId}`, {
                method: 'GET',
                headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Origin, Methods, Content-Type'
                }})

            if (!response.ok) { 
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();
            return data
    } catch (error) {
        console.error(`Could not get Games: ${error}`);
    }
}    

