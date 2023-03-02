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
    aiUniverses.forEach(aiUniverse =>{
        const dataDiv = document.createElement('div')
        dataDiv.classList.add('col');
        dataDiv.innerHTML = `
        <div class="card p-4 h-100">
        <img src="${aiUniverse.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${aiUniverse.published_in}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
        </div>
     </div>
        `;
        dataContainer.appendChild(dataDiv);
    })
}

loadAiUniverse();