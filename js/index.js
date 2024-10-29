document.addEventListener("DOMContentLoaded", () => {
  users();
});
function users() {
  const form = document.querySelector("#github-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    getUser(e.target[0].value.toLowerCase());
    form.reset();
  });
}
function getUser(name) {
  console.log(name);
  fetch(`https://api.github.com/search/users?q=${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      displayUser(data);
    });
}
function displayUser(data) {
  console.log(data);
  let cards;
  for (let user of data.items) {
    cards += `
    <div class="card">
  <img src=${user.avatar_url} alt="Avatar" style="width:100%">
  <div class="container">
    <h4><b>${user.login}</b></h4>
    <a href=${user.html_url}>My Repo</a>
  </div>
</div>
      `;
    document.querySelector("#grid-container").innerHTML = cards;
  }
}
