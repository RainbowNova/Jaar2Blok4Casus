const GameData = []

document.addEventListener('DOMContentLoaded', () => {
    
    const promise = GetGames();
    promise.then((data) => 
        data.forEach(game => {
            GameData.push(game)
        })
    );

    promise.then(() => {
        GameData.forEach(game => {
            const promise = GetDevelopersBygame(game)
            promise.then((data) => 
                game.developer = data
            );
        })
    })

    promise.then(() => {
        GameData.forEach(game => {
            const promise = GetPublisherBygame(game)
            promise.then((data) => 
                game.publisher = data
            );
        })
    })


    console.log(GameData)

    promise.then(() => {
        setTimeout(() => createGames(), 400);
    })
    
});

async function GetGames(){
    try{
        const response = await fetch('https://dampbackendapi.azurewebsites.net/api/Games', {
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
            console.error(`Could not get Games: ${error}`);
        }
    }

async function GetDevelopersBygame(game){
    try{ 
            const response = await fetch('https://dampbackendapi.azurewebsites.net/api/Developers/'+game.developerId, {
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

async function GetPublisherBygame(game){
    try{ 
            const response = await fetch('https://dampbackendapi.azurewebsites.net/api/Publishers/'+game.publisherId, {
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


async function createGames(){
    GameData.forEach(game => {
        console.log(game)
        document.getElementById('bodydiv').innerHTML+=`
        <div class="row gx-1 row-cols-3 mb-3">
        <div class="col-2"></div>
            <a href="../GamePage/GamePage.html?id=${game.id}" class="row col-8 gamecontainer">
            <div class="col-3 iteminternal">
                <img src="./Images/csgo/CSGO2_main_image.jpg" alt="main codMW2 foto" width="200" height="100">
            </div>
            <div class="row col-6">
                <div class="row">${game.name}</div>
                <div class="row">${game.description}</div>
                <div class="row col-4">${game.developer.name}</div>
                <div class="col-6">${game.publisher.name}</div>
            </div>
            <div class="col-2">discount</div>
            <div class="col-1">${game.price}</div>
            </a>
        <div class="col-2"></div>
        </div>`})
    }