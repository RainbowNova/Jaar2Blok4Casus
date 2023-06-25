document.addEventListener('DOMContentLoaded', async () => {

    const jsonData = [];

    try {
        await fetch('https://dampbackendapi.azurewebsites.net/api/Games', {
            method: 'GET',
            headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Origin, Methods, Content-Type'
            }})
            .then(response => response.json())
            .then((data) => {
                data.forEach(game => {
                    jsonData.push(game);
                })
            })
    }
    catch (error) {
        console.error('Error:', error);
        // Handle network errors or other exceptions here
    }
    
    jsonData.forEach(game => {
        document.getElementById('bodydiv').innerHTML+=`
        <div class="row gx-1 row-cols-3 mb-3">
            <div class="col-2"></div>
            <div class="col-8 ">
            <a href="../GamePage/GamePage.html?id=${game.id}" class="itemcontainer item1">
                <div class="iteminternal">
                <img src="./Images/csgo/CSGO2_main_image.jpg" alt="main codMW2 foto" width="200" height="100">
                </div>
            </a>
            </div>
            <div class="col-2"></div>
        </div>`
    })
});