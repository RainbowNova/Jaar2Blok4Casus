const CategoryData = []

document.addEventListener('DOMContentLoaded', () => {
    
    const promise = GetGames();
    promise.then((data) => 
        data.forEach(category => {
            category.title = category.name
            category.id = category.id
            CategoryData.push(category)
        })
    );

    promise.then(() => {
        CategoryData.forEach(category => {
            const promise = GetGameByCategory(category)
            promise.then((data) => 
                category.game = data
            );
        })
    })


    console.log(CategoryData)

    promise.then(() => {
        setTimeout(() => createCategories(), 400);
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
            console.error(`Could not get Categories: ${error}`);
        }
    }

async function GetGameByCategory(game){
    try{ 
            const response = await fetch('https://dampbackendapi.azurewebsites.net/api/Games/'+category.gameId, {
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

async function createCategories(){
    CategoryData.forEach(category => {
        console.log(category)
        document.getElementById('bodydiv').innerHTML+=`
        <div class="container my-0 py-5">
        <div class="row d-flex justify-content-center">
          <div class="col-md-12 col-lg-10 col-xl-12">
            <div class="card">
              <div class="card-body">
              <a href="../CategoryPage/CategoryPage.html?id=${category.id}">
                <div class="d-flex flex-start align-items-center">
                  <img class="square rounded p-10 shadow-1-strong me-3"
                    src="https://screenshots.gamebanana.com/img/ico/sprays/530-90_52527762aa96b.jpg" alt="avatar" width="60"
                    height="60" />
                  <div>
                    <h6 class="fw-bold text-primary mb-1">${category.title}</h6>
                    <p class="text-muted small mb-0">
                      ${category.description}
                    </p>
                  </div>
                </div>
              </a>
          </div>
        </div>
      </div>
    </div>`})
    }