
document.addEventListener("DOMContentLoaded",function(){


let foundForm = document.querySelector("#monsterForm");

foundForm.addEventListener("submit", function(e){
e.preventDefault()
let newname = e.target.name.value
let newage = e.target.age.value
let newdescription = e.target.description.value

fetch("http://localhost:3000/monsters", {

method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(
      {name: newname,
      age: newage,
      description: newdescription}),
})
.then((response) => response.json())
.then((data) => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});

});

let backBtn = document.querySelector("#back")
let forwardBtn = document.querySelector("#forward")



let pageNum = 0
fetchMonsters(pageNum)

backBtn.addEventListener("click",function(e){
if (pageNum > 0 ) {
    pageNum -= 1
}
fetchMonsters(pageNum)
})

forwardBtn.addEventListener("click",function(e){
        pageNum += 1
        fetchMonsters(pageNum)
    })




function fetchMonsters(pageNum) {
fetch(`http://localhost:3000/monsters/?_limit=5&_page=${pageNum}`)
.then(response => response.json())
.then(data => {
    renderMonsters(data)
})
}


function renderMonsters(monsters){
    let monsterDiv = document.querySelector("#monster-container")
    let newUl = document.createElement("ul")
    while (monsterDiv.firstChild){
        monsterDiv.firstChild.remove()
    }
    monsterDiv.appendChild(newUl)

    for (monster of monsters){
        console.log(monster.name)
        let newDiv = document.createElement("div")
        newUl.appendChild(newDiv)
        let monsterName = document.createElement("h2")
        newDiv.appendChild(monsterName)
        monsterName.innerText = monster.name
        let monsterAge = document.createElement("p")
        let description = document.createElement("p")
        monsterAge.innerText = monster.age
        description.innerText = monster.description
        newDiv.appendChild(monsterAge)
        newDiv.appendChild(description)
    }
};

});

