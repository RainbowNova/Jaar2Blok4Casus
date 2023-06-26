var GameData = [];

document.addEventListener('DOMContentLoaded', () => {
    url = window.location.href
    var hash = url.substring(url.indexOf("=") + 1);
    console.log(hash)

    const promise = GetGameById(hash);
    promise.then((data) => 
        GameData.push(data)
    );

    promise.then(() => {
        const promise = GetDevelopersBygame(GameData[0])
        promise.then((data) => 
            GameData[0].developer = data
        );
    })

    promise.then(() => {
        const promise = GetPublisherBygame(GameData[0])
        promise.then((data) => 
            GameData[0].publisher = data
        );
    })

    promise.then(() => {
        setTimeout(() => createGameInfo(), 400);
    })

    console.log(GameData)
});

async function GetGameById(id){
    try{
        const response = await fetch('https://dampbackendapi.azurewebsites.net/api/Games/'+id, {
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


async function createGameInfo(){
    document.getElementById('bodydiv').innerHTML+=`
    <div class="container-fluid col-md-12">
        <div class="row mb-3"> <!-- Navbar -->
            <div class="col-md-2"></div>
            <div class="col-md-8 navbarcustom">
              <div class="row">
                <div class="col-md-7 btn-group">
                  <a href="../StorePage/StorePage.html" class="btn btn-primary d-flex justify-content-center align-items-center" role="button">Winkel</a>
                  <button type="button" class="btn btn-secondary">Nieuw</button>
                  <button type="button" class="btn btn-secondary">Categorien</button>
                  <a href="/ShoppingCartPage/ShoppingCartPage.html" class="btn btn-primary d-flex justify-content-center align-items-center" role="button">Winkelmand</a>
                </div>
                <div class="col-md-4 btn-group">
                  <input class="form-control col-1" type="text" placeholder="Search">
                  <button class="btn btn-secondary col" type="submit">Search</button>
                </div>
              </div>
            </div>
            <div class="col-2"></div>
        </div>

        <div class="row mb-1"> <!-- Info Box + Requirements -->
          <div class="col-md-2 "></div>
          <div class="col-md-6 background boxes"> <!-- Info Box -->
            <div class="row">
              <div class="col-md-6"><!-- Game Picture -->
                game pic
              </div>
              <div class="col-md-6"> <!-- Game info -->
                <div class="row"> dev pic </div><!-- Dev Picture -->
                <div class="row"> Game Name : ${GameData[0].name} </div> <!-- Game Name -->
                <div class="row"> Descriportion : ${GameData[0].description} </div> <!-- Description -->
                <div class="row"> Developer : ${GameData[0].developer.name} </div> <!-- Devloper Name -->
                <div class="row"> Publisher : ${GameData[0].publisher.name} </div> <!-- Publisher Name -->
              </div>
            </div>
          </div>
            <div class="col-md-2 px-3 ">
              <div class="row">
                <div class="col-md-6 background boxes">Minimum Requirements : <br> ${GameData[0].mininumRequirements}</div> <!-- Requirements -->
                <div class="col-md-6 background boxes">Recommended Requirements : <br> ${GameData[0].systemRequirements}</div>
              </div>
            </div>
          <div class="col-md-2 "></div>
        </div>

        <div class="row mb-1"> <!-- Buy Box -->
          <div class="col-md-2 "></div>
          <div class="col-md-6 background buyBox">
            <div class="row ">
              <div class="col-md-10"></div>
              <div class="col-md-1"> &euro; ${GameData[0].price} </div> <!-- Price -->
              <div class="col-md-1"> 
                <a class="Koop-button" href="#" role="button">Buy</a>
              </div> <!-- Purchase button -->
            </div>
          </div>
          <div class="col-md-4 "></div>
        </div>
      </div>`
}