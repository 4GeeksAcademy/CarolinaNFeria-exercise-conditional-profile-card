import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables);

  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  let fullName = "";
  if (variables.name && variables.lastName) {
    fullName = `<h1>${variables.name} ${variables.lastName}</h1>`;
  } else if (variables.name) {
    fullName = `<h1>${variables.name}</h1>`;
  } else if (variables.lastName) {
    fullName = `<h1>${variables.lastName}</h1>`;
  }

  let role = variables.role ? `<h2>${variables.role}</h2>` : "";

  let location = "";
  if (variables.city && variables.country) {
    location = `<h3>${variables.city}, ${variables.country}</h3>`;
  } else if (variables.city) {
    location = `<h3>${variables.city}</h3>`;
  } else if (variables.country) {
    location = `<h3>${variables.country}</h3>`;
  }

  const socialItems = [];
  if (variables.twitter)
    socialItems.push(
      `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`
    );
  if (variables.github)
    socialItems.push(
      `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`
    );
  if (variables.linkedin)
    socialItems.push(
      `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`
    );
  if (variables.instagram)
    socialItems.push(
      `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`
    );

  // Posición redes sociales (left o right)
  const socialPosition =
    variables.socialMediaPosition === "position-left"
      ? "position-left"
      : "position-right";

  // Insertar HTML
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" />
      ${fullName}
      ${role}
      ${location}
      ${
        socialItems.length > 0
          ? `<ul class="${socialPosition}">${socialItems.join("")}</ul>`
          : ""
      }
    </div>
  `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
