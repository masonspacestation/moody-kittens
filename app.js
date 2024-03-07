let name = {}

let foundKitten = {}
let newKitten = {}
let kittens = []
loadKittens()

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let name = form.name.value
  newKitten = kittens.find(kitten => kitten.name == name)

  if (!newKitten) {
    newKitten = {
      id: generateId(),
        name: form.name.value,
        mood: form.mood.value,
        affection: form.mood.value === "happy" ? 7:
                   form.mood.value === "tolerant" ? 5:
                   form.mood.value === "angry" ? 3: 2     
      }
  kittens.push(newKitten)
  saveKittens()
  document.getElementById("scram-cats").classList.remove("hidden")
} else {
  alert("Meeeooow!" + name + " is already here. . . you're gonna have to pick another name meow.");
}
  form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittensData) {
    kittens = kittensData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittensListElement = document.getElementById("kitten-collection")
  let template = ""

kittens.forEach(kitten => {
  template +=  `

  <div class="kitten ${kitten.mood} cat-card object-center">
    <div class="d-flex justify-content-center">
      <img class="m-2" src="Moody-Kittens-image.png" alt="image of kitten">
    </div>
   
    <h3 class="kitten-name text-center">${kitten.name}</h3>
    <h5 id="active-mood" class="kitten-mood text-center">${kitten.mood}</h6>
    
    <div class="center-object">
      <button onclick="pet('${kitten.id}')" class="">Pet</button>
      <button onclick="catnip('${kitten.id}')" class="">Catnip</button>
    </div>
  </div>
  `
})
if 
  (kittens){
    document.getElementById("scram-cats").classList.remove("hidden")
}
kittensListElement.innerHTML = template
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let foundKitten = kittens.find(kitten => kitten.id === id)
  
  let affection = Math.random();
  if (affection > .5) {
    foundKitten.affection += .5;
  } else {
    foundKitten.affection -= .5;
  }
    foundKitten.mood = (foundKitten.affection >= 6) ? "happy":
                (foundKitten.affection < 6 && foundKitten.affection >= 5) ? "tolerant":
                (foundKitten.affection < 5 && foundKitten.affection >= 4) ? "angry": "gone";
  console.log("pet", foundKitten);
  setKittenMood(foundKitten, affection)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let foundKitten = kittens.find(kitten => kitten.id === id);
  foundKitten.mood = "tolerant";
  foundKitten.affection = 5;
  console.log("catnip", foundKitten);
  setKittenMood(foundKitten, foundKitten.affection)
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(foundKitten) {
                console.log("setMood", foundKitten.affection, foundKitten.mood)   
  drawKittens()
}
/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
    if (confirm("This will shoo all the kitties away. Sure you wanna do that meow?"))
    { 
      kittens.splice(0)
      saveKittens()
      document.getElementById("scram-cats").classList.add("hidden")
     } else {
  } 
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:string, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens()
drawKittens()
