const Controllers = [];

document.addEventListener('DOMContentLoaded', () => {

    const promise = GetControllers();
    promise.then((data) => 
        data.forEach(controller => {
            Controllers.push(controller)
        })
    );

    promise.then(() => {
        setTimeout(() => CreateNavbar(), 100);
        })
});

async function CreateNavbar(){

    navbarText=`
    <div class="row mb-3"> <!-- Navbar -->
        <div class="col-md-2"></div>
        <div class="col-md-8 navbarcustom">
            `;
    navbarText+= await CreateControllerButtons();       
    
    navbarText+=
        `</div>
        <div class="col-2"></div>
    </div>

    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8 gamecontainer">
            <div class="row">
                <div class="col-md-3"><p>Controller</p></div>
                <div class="col-md-3"><p>Type</p></div>
                <div class="col-md-3"><p>Function</p></div>
                <div class="col-md-3"><p>Time Stamp</p></div>
            </div>
        </div>
        <div class="col-md-2"></div>
    </div>`

    document.getElementById('bodydiv').innerHTML+=navbarText;
};

async function CreateControllerButtons(){

    navbarText='<div class="row">';

    Controllers.forEach(controller =>{
        navbarText +=
        `
        <div class="col-md">
            <div class="btn-group">
                <button type="button" class="btn btn-primary" onclick=CreateControllerLogs('${controller}','null')>${controller}</button>
                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick=CreateControllerLogs('${controller}','Get')>Get</a></li>
                    <li><a class="dropdown-item" onclick=CreateControllerLogs('${controller}','Post')>Post</a></li>
                    <li><a class="dropdown-item" onclick=CreateControllerLogs('${controller}','Put')>Put</a></li>
                    <li><a class="dropdown-item" onclick=CreateControllerLogs('${controller}','Delete')>Delete</a></li>
                </ul>
            </div>
        </div>`
    });

    navbarText+='</div>'

    return navbarText;
}


async function CreateControllerLogs(ct,tp=null){
    document.querySelectorAll('.logger').forEach(e => e.remove());
    ControllerLogs = [];

    const promise = GetLogsByControllers(ct,tp);
    promise.then((data) => 
        data.forEach(logs => {
            ControllerLogs.push(logs)
        })
    );

    await promise;

    ControllerLogs.forEach(logs => {
        document.getElementById('bodydiv').innerHTML+=
        `<div class="row logger">
            <div class="col-md-2 "></div>
            <div class="col-md-8 gamecontainer ">
                <div class="row ">
                    <div class="col-md-3 ">${logs.controller}</div>
                    <div class="col-md-3 ">${logs.type}</div>
                    <div class="col-md-3 ">${logs.functionname}</div>
                    <div class="col-md-3 ">${logs.timestamp}</div>
                </div>
            </div>
            <div class="col-md-2 "></div>                
        </div>`
    })
};

async function GetControllers(){
    try{
        const response = await fetch('https://dampbackendapi.azurewebsites.net/api/ApiLogs/ct', {
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
        console.error(`Could not get Controller: ${error}`);
    }
}

async function GetLogsByControllers(ct,tp){
    try{
        const response = await fetch(`https://dampbackendapi.azurewebsites.net/api/ApiLogs/ct/logs?ct=${ct}&tp=${tp}`, {
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
        console.error(`Could not get Controller: ${error}`);
    }
}