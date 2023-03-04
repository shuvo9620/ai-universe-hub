const loadAiUniverse = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiUniverse(data.data.tools);
}

const displayAiUniverse = aiUniverses =>{
    const dataContainer = document.getElementById('data-container');
    // display 6 cards only
    aiUniverses = aiUniverses.slice(0,6);
    // display all data
    aiUniverses.forEach(aiUniverse =>{
        const {features, id, image, name, published_in} = aiUniverse;
        const dataDiv = document.createElement('div')
        dataDiv.classList.add('col');
        dataDiv.innerHTML = `
        <div class="card p-4 h-100">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <p class="card-text">${features ? features.map((item_list, index) => `<br> <span>${index + 1 }.${item_list}</span>`) : "Feature not found"}</p>
        </div>
     </div>
        `;
        dataContainer.appendChild(dataDiv);
    })
}
//  see more
// document.getElementById('btn-see-more').addEventListener('click', function(){
    
// })

loadAiUniverse();