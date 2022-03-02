//  Function to load data after clicking search button
const searchPhoneButton = () => {
  const searchField = document.getElementById("search-field").value;

  if (searchField == "") {
    const foundedPhone = document.getElementById("founded-phone");
    foundedPhone.textContent = "";
    const exploredPhone = document.getElementById("explored-phone-details");
    exploredPhone.textContent = "";
    const searchError1 = document.getElementById("search-error1");
    searchError1.classList.remove("d-none");
    searchError1.innerHTML = `
        <h3 class="text-danger">!Please enter something in the search box</h3>
      `;
  } else {
    const exploredPhoneDetails = document.getElementById(
      "explored-phone-details"
    );
    exploredPhoneDetails.textContent = "";
    const foundedPhone = document.getElementById("founded-phone");
    foundedPhone.textContent = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayFoundedPhone(data.data));
  }

  // clear search input field
  document.getElementById("search-field").value = "";
};

// function to display the founded phone on search
const displayFoundedPhone = (phones) => {
  const showFirst20Phone = phones.slice(0, 20);
  if (phones.length == 0) {
    const searchError1 = document.getElementById("search-error1");
    searchError1.classList.remove("d-none");
    searchError1.innerHTML = `
        <h4 class="text-danger">No Phones Found with your entered keyword</h4>
      `;
  } else {
    const foundedPhone = document.getElementById("founded-phone");
    foundedPhone.textContent = "";
    const searchError1 = document.getElementById("search-error1");
    searchError1.classList.add("d-none");
    for (const phone of showFirst20Phone) {
      const div = document.createElement("div");

      div.classList.add("col");
      div.innerHTML = `
                          <div class="card p-4 h-100 shadow p-3">
                              <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                              <div class="card-body mx-auto">
                              <h5>Model:</h5>
                              <h6>${phone.phone_name}</h6>
                              <h5>Brand:</h5>
                              <h6 class="brand-title">${phone.brand}</h6>
                                  
                              </div>
                              <button onclick="explorePhoneDetails('${phone.slug}')" class="btn btn-success mx-auto">Details</button>
                          </div>
                          `;
      foundedPhone.appendChild(div);
    }
  }
};

// explore phone details
const explorePhoneDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};

// function to dsiplay explore phone details
const displayDetails = (phone_details) => {
  const detailDiv = document.getElementById("explored-phone-details");
  detailDiv.innerHTML = `
      <div class="row w-75 mx-auto mb-3">
        <div class="card d-flex justify-content-center col-lg-6 p-3 d-lg-flex justify-content-lg-center align-items-lg-center">
          <img src="${phone_details.image}"  class="w-75 mx-auto">
        </div>
        <div class="card col-lg-6 p-3">
          <h3>Model: ${phone_details.name}</h3>
          <h5>Brand: ${phone_details.brand}</h5>
          <h6>Release date:${
            phone_details.releaseDate
              ? phone_details.releaseDate
              : "Release date not found."
          }</h6>
          <div>
          <h3 class="text-center"><u>Main Features:</u></h3>
          <h4>Storage:</h4>
          <p>${phone_details.mainFeatures.storage}</p>
          <h4>Display Size:</h4>
          <p>${phone_details.mainFeatures.displaySize}</p>
          <h4>Chipset:</h4>
          <p>${phone_details.mainFeatures.chipSet}</p>
          <h4>Memory:</h4>
          <p>${phone_details.mainFeatures.memory}</p>
          <h4>Sensors:</h4>
          <p>${phone_details.mainFeatures.sensors}</p>
          <p>
            <h4>Others:</h4><br>
           <span>WLAN: ${
             phone_details.others ? phone_details.others.WLAN : "not found"
           }</span><br> 
           <span>Bluetooth: ${
             phone_details.others ? phone_details.others.Bluetooth : "not found"
           }</span><br>
           <span>GPS: ${
             phone_details.others ? phone_details.others.GPS : "not found"
           }</span><br>
           <span>NFC: ${
             phone_details.others ? phone_details.others.NFC : "not found"
           }</span><br>
           <span>Radio: ${
             phone_details.others ? phone_details.others.Radio : "not found"
           }</span><br>
           <span>USB: ${
             phone_details.others ? phone_details.others.USB : "not found"
           }</span>
          </p>
          </div>
        </div>
      </div>
    `;
};
