const PostsData = []

document.addEventListener('DOMContentLoaded', () => {
    
    const promise = GetPosts();
    promise.then((data) => 
        data.forEach(post => {
            PostsData.push(post)
        })
    );

    promise.then(() => {
        PostsData.forEach(post => {
            const promise = GetDevelopersByPost(post)
            promise.then((data) => 
                post.developer = data
            );
        })
    })

    promise.then(() => {
        PostsData.forEach(post => {
            const promise = GetPublisherByPost(post)
            promise.then((data) => 
                post.publisher = data
            );
        })
    })


    console.log(PostsData)

    promise.then(() => {
        setTimeout(() => createPosts(), 400);
    })
    
});

async function GetPosts(){
    try{
        const response = await fetch('https://dampbackendapi.azurewebsites.net/api/Posts', {
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
            console.error(`Could not get Posts: ${error}`);
        }
    }

async function GetDevelopersByPosts(post){
    try{ 
            const response = await fetch('https://dampbackendapi.azurewebsites.net/api/Developers/'+post.developerId, {
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
        console.error(`Could not get Posts: ${error}`);
    }
}

async function GetPublisherByPosts(post){
    try{ 
            const response = await fetch('https://dampbackendapi.azurewebsites.net/api/Publishers/'+post.publisherId, {
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
        console.error(`Could not get Posts: ${error}`);
    }
}


async function createPosts(){
    PostsData.forEach(post => {
        console.log(post)
        document.getElementById('bodydiv').innerHTML+=`
        <div class="row gx-1 row-cols-3 mb-3">
        <div class="col-2"></div>
            <a href="../GamePage/GamePage.html?id=${post.id}" class="row col-8 gamecontainer">
            <div class="row col-6">
                <div class="row">${post.name}</div>
                <div class="row">${post.description}</div>
                <div class="row col-4">${post.developer.name}</div>
                <div class="col-6">${post.publisher.name}</div>
            </div>
            <div class="col-2">discount</div>
            <div class="col-1">${post.price}</div>
            </a>
        <div class="col-2"></div>
        </div>`})
    }