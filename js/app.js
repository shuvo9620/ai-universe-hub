const loadAiUniverse = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    // display 6 cards only
    displayAiUniverse(data.data.tools.slice(0,6));
}

const displayAiUniverse = aiUniverses =>{
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = "";
    
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
        <div class="card-footer w-100">
        <small class="fw-bold fs-4 text">${name}</small> <br>
        <i style="font-size:18px" class=" mt-3 text-muted fa">&#xf073;</i> 
        <small class="text-muted fw-semibold">${published_in}</small>
        <i class='fa fa-arrow-right mx-5'></i>   
      </div>
     </div>
        `;
        // spinner/loader
        showSpinner(false);

        dataContainer.appendChild(dataDiv);
    })
}
// click see more button to load all data 
 document.getElementById('btn-see-more').addEventListener('click', function(){
    
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        fetch(url).then(res => res.json()).then(data => {
        displayAiUniverse(data.data.tools);
       })
    
 })

// click sort by date button to sort data

document.getElementById('btn-sort').addEventListener('click', function(){
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url).then(res => res.json()).then(data => {
        const sortData = data.data.tools;
        const newSortData = sortData.sort((a,b)=> new Date(a.published_in) - new Date(b.published_in));
        displayAiUniverse(newSortData);
    })
})

const showSpinner = isLoading => {
    const loadSpinner = document.getElementById('spinner');
    if (isLoading) {
        loadSpinner.classList.remove('d-none');
    } else {
        loadSpinner.classList.add('d-none');
    }
}

//  spinner function call  
showSpinner(true);

// show all data function
loadAiUniverse();

