const profileDisplayArea = document.getElementById("PROFILE_DISPLAY_AREA");
const profileGeneratorButton = document.getElementById("PROFILE_GENERATOR_BUTTON");
const userProfileModal = document.getElementById("USER_PROFILE_MODAL");
const modalCloseButton = document.getElementById("MODAL_CLOSE_BUTTON");

const expandedProfileImage = document.getElementById("EXPANDED_PROFILE_IMAGE");
const userFullNameDisplay = document.getElementById("USER_FULL_NAME_DISPLAY");
const userDetailedInformation = document.getElementById("USER_DETAILED_INFORMATION");

function generateInfoBlock(label, value) {
  return `
    <div class="info_block">
      <span class="label">${label}:</span>
      <span class="value">${value}</span>
    </div>
  `;
}

function renderUserProfileList(users) {
  profileDisplayArea.innerHTML = "";

  users.forEach(user => {
    const column = document.createElement("div");
    column.className = "col-12 col-sm-6 col-md-4 col-lg-3";

    column.innerHTML = `
      <div class="card h-100 shadow" style="cursor:pointer">
        <img src="${user.picture.large}" class="card-img-top" alt="Foto">
        <div class="card-body">
          <h5 class="card_title">${user.name.first} ${user.name.last}</h5>
          ${generateInfoBlock("Género", user.gender)}
          ${generateInfoBlock("Ubicación", `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`)}
          ${generateInfoBlock("Correo", user.email)}
          ${generateInfoBlock("Fécha de nacimiento", new Date(user.dob.date).toLocaleDateString())}
        </div>
      </div>
    `;

    column.querySelector(".card").onclick = () => {
      userProfileModal.classList.remove("d-none");
      userProfileModal.classList.add("d-flex");
      expandedProfileImage.src = user.picture.large;
      userFullNameDisplay.textContent = `${user.name.first} ${user.name.last}`;
      userDetailedInformation.innerHTML = `
        ${generateInfoBlock("Género", user.gender)}
        ${generateInfoBlock("Correo", user.email)}
        ${generateInfoBlock("Fécha de nacimiento", `${new Date(user.dob.date).toLocaleDateString()} (${user.dob.age} años)`)}
        ${generateInfoBlock("Teléfono", user.phone)}
        ${generateInfoBlock("Celular", user.cell)}
        ${generateInfoBlock("Dirección", `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`)}
        ${generateInfoBlock("Usuario", user.login.username)}
      `;
    };

    profileDisplayArea.appendChild(column);
  });
}

function retrieveUserDataFromAPI() {
  profileDisplayArea.style.opacity = "0.4";
  fetch("https://randomuser.me/api/?results=10")
    .then(res => res.json())
    .then(data => {
      renderUserProfileList(data.results);
      profileDisplayArea.style.opacity = "1";
    });
}

profileGeneratorButton.onclick = retrieveUserDataFromAPI;
modalCloseButton.onclick = () => {
  userProfileModal.classList.remove("d-flex");
  userProfileModal.classList.add("d-none");
};

retrieveUserDataFromAPI();
