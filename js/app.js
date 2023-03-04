const loadAiUniverse = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    // display 6 cards only
    displayAiUniverse(data.data.tools.slice(0, 6));
}

const displayAiUniverse = aiUniverses => {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = "";

    // display all data
    aiUniverses.forEach(aiUniverse => {
        const { features, id, image, name, published_in } = aiUniverse;
        const dataDiv = document.createElement('div')
        dataDiv.classList.add('col');
        dataDiv.innerHTML = `
        <div class="card p-4 h-100">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <p class="card-text">${features ? features.map((item_list, index) => `<br> <span>${index + 1}.${item_list}</span>`) : "Feature not found"}</p>
        </div>
        <div class="card-footer w-100">
        <small class="fw-bold fs-4 text">${name}</small> <br>
        <i style="font-size:18px" class=" mt-3 text-muted fa">&#xf073;</i> 
        <small class="text-muted fw-semibold">${published_in}</small>
        <div>
        <i class="fa-sharp fa-solid fa-arrow-right"
        data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="modalData('${id}')" >
        </i>
        </div>
      </div>
     </div>
        `;
        // spinner/loader
        showSpinner(false);

        dataContainer.appendChild(dataDiv);
    })
}
// click see more button to load all data 
document.getElementById('btn-see-more').addEventListener('click', function () {

    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url).then(res => res.json()).then(data => {
        displayAiUniverse(data.data.tools);
    })

})

// click sort by date button to sort data

document.getElementById('btn-sort').addEventListener('click', function () {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url).then(res => res.json()).then(data => {
        const sortData = data.data.tools;
        const newSortData = sortData.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
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

// Fetching modal data by api 
const modalData = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url).then(response => response.json()).then(data => {
        modalDataDisplay(data.data);
        toggleAccuracy(data.data.accuracy);
    });
}
// modal single data show
const modalDataDisplay = (values) => {
    console.log(values);
    const modalContainer = document.getElementById('modal-data-container');
   
    const { accuracy, description, features, id, image_link, pricing, integrations, input_output_examples } = values;
    const { 1: featureOne, 2: featureTwo, 3: featureThree } = features;

    modalContainer.innerHTML = `
    <div class="col">
            <div class="card">
                <div class="card-body m-0 p-2">
                    <h5 class="card-title">${accuracy?.description ?? "No description here"}</h5>
                    <div class="d-md-flex d-lg-flex gap-3 justify-content-center align-items-center ">

                    <div class="bg-white border border-warning rounded p-1 mr-3"><span class="text-warning">${pricing?.[0]?.price ?? 'Free' }<br>${pricing?.[0]?.plan ?? 'Free' }</span>
                    </div>
                    <div class="bg-white border border-warning rounded p-1 mr-3"><span class="text-warning">${pricing?.[1]?.price ?? "Free"}<br>${pricing?.[1]?.plan ?? "No charge"}</span>
                    </div>
                    <div class="bg-white border border-warning rounded p-1 mr-3"><span class="text-warning">${pricing?.[2]?.price ?? "Free"}<br>${pricing?.[0]?.plan ?? "No charge"}</span>
                    </div>
                  </div>

                  <div class="d-md-flex justify-content-center align-items-center gap-3">
        <div class="p-0 m-0">
            <h3 class="w-bold">Feature</h3>
            <li>${featureOne?.feature_name ?? "Data not found"}</li>
            <li>${featureTwo?.feature_name ?? "Data not found"}</li>
            <li>${featureThree?.feature_name ?? "Data not found"}</li>
        </div>
        <div class="p-0 m-0">
            <h3 class="w-bold mt-5 mb-0">Integrations</h3>
            <p>${integrations ? integrations.map((integration) =>

        `<br><span>&#x2022;${integration}</span>`
    ) : "Integration not available"}</p>
        </div>
    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card">
            <div id="accuracy-btn" class="accuracy-btn d-none">
            <div class="accuracy-btn-child border-3 text-white">${accuracy?.score ? 'Accuracy ' + (accuracy.score) * 100 + '%' : false }</div>
        </div>
                <img src="${image_link?.[0] ?? "image can't found"}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${input_output_examples?.[0].input ?? "Title not found"}</h5>
                
                    <p class="card-text">${input_output_examples?.[0].output ?? "No! Not Yet! Take a break!!!"}</p>
                </div>
            </div>
        </div>
    `;
}

// accuracy button
const toggleAccuracy = isLoading => {
    const accuracyBtn = document.getElementById('accuracy-btn');
    console.log(typeof isLoading.score);
    if (isLoading.score !== undefined || isLoading.score !== null) {
        accuracyBtn.classList.remove('d-none');
    } else {
        accuracyBtn.classList.add('d-none');
    }

 }

//  spinner function call  
showSpinner(true);

// show all data function
loadAiUniverse();

