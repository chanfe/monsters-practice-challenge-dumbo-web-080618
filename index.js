const URL = "http://localhost:3000/monsters"
document.addEventListener("DOMContentLoaded",(a)=>{
  a.preventDefault
  let create = document.querySelector("#create-monster")
  let forward = document.querySelector("#forward")
  let back = document.querySelector("#back")

  create.innerHTML = `
  <form id="monster-form">
    <input type="text" name="name" placeholder="name..." id="monster_name">
    <input type="text" name="age" placeholder="age..." id="monster_age">
    <input type="text" name="description" placeholder="description..." id="monster_description">
    <input type="submit" value="Submit">
  </form>
  `
  let c = 1;
  getMonsters(c)

  let form = document.querySelector("#monster-form")

  form.addEventListener("submit", a=>{
    a.preventDefault
    let b = document.querySelector("#monster_name")
    let c = document.querySelector("#monster_age")
    let d = document.querySelector("#monster_description")
    let data = {
      "name": b.value,
      "age": c.value,
      "description": d.value
    }
    postData(URL, data)
  })


  forward.addEventListener("click", function(){
    c += 1
    getMonsters(c)
  })
  back.addEventListener("click", function(){
    c -= 1
    getMonsters(c)
  })


})

function postData(url = ``, data = {}){
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        // "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  .then(response => response.json()); // parses response to JSON
}

function getMonsters(c){
  let container = document.querySelector("#monster-container")
  container.innerHTML = "";
  fetch(`${URL}?_limit=50&_page=${c}`).then(res => res.json())
  .then(mons => mons.forEach(k => {
    ele = document.createElement("div")
    ele.innerHTML = `
    <h2>${k.name}</h2>
    <h4>${k.age}</h4>
    <p>${k.description}</p>`
    container.append(ele)
  }))

}
