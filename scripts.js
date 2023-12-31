let playerAnswers = {}
let playerPasswords = {}
let progressBar = 0
let inputField = {}
let folder = {}

const solutions = [["untitled-3.jpg", "untitled-3"], ["vaira"], ["jakobson"], ["mott street", "mott st."], ["19"], ["new york", "new-york"], ["usa", "etats-unis d'amerique", "etats-unis", "united states of america", "etats unis d'amerique", "etats unis"], ["jacques"], ["dubochet"], ["henri"], ["des"], ["simonetta"], ["sommaruga"]]

function Folder(files, password) {
    this.files = files;
    this.password = password;
}
const folder1 = new Folder(["readme.txt", "mot de passe3.txt"], "147852");
const folder2 = new Folder(["photoidentité.jpg","mail.txt"], "1896");
const folder3 = new Folder(["Dossier 7 mdp 1234.txt"], "abcd");
const folder4 = new Folder(["mail4.txt", "notes.txt", "untitled-1.jpg", "untitled-2.jpg", "untitled-3.jpg", "untitled-4.jpg", "untitled-5.jpg"], "1236");
const folder5 = new Folder(["c2.jpg", "mailch.txt"], "moscou");
const folder6 = new Folder(["mail6.txt", "adresse.jpg", "iphonescreenshot.jpg"], "motdepassefacile");
const folder7 = new Folder(["mail7.txt", "Lorem Ipsum.html"], "1234");
const folder8 = new Folder(["mail8.txt", "c_b_e1.txt"],  "987");
const folder9 = new Folder(["mail9.txt", "Cible3.txt"], "963852");
var dbRoot = [folder1, folder2, folder3, folder4, folder5, folder6, folder7, folder8, folder9]

// Open folder on click
var toggler = document.getElementsByClassName("folder");
for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector("li ul").classList.toggle("active");
    this.classList.toggle("folder-open");
  });
}

//Add click to folders
const folders = Array.from(document.getElementsByClassName('folder'))
folders.forEach(folder => {
    folder.addEventListener("click", askPassword);
})

//Ask for password
function askPassword() {
    let folderN = folders.indexOf(this)
    let correctPassword = dbRoot[folderN].password
    if (playerPasswords[folderN] != correctPassword) {
        let promptPassword = prompt("Entrer le mot de passe");
        checkPassword(promptPassword, folderN)
    }
}

// Check if password matches
function checkPassword(promptPassword, folderN) {
    let correctPassword = dbRoot[folderN].password
    if (promptPassword === correctPassword) {
        unlockFolder(folderN)
        playerPasswords[folderN] = promptPassword
        saveProgress()
        alert("Mot de passe correct. Le dossier est ouvert.")
    } else {
        alert("Mot de passe incorrect. Accès refusé.")
    }
}

//Unlock folders
function unlockFolder(folderN) {
    let folder = "dossier" + folderN
    folder = document.getElementById(folder);
    files = dbRoot[folderN].files
    const newUl = document.createElement("ul");
    folder.appendChild(newUl); 
    for (i=0; i < files.length; i++) {
        const newLi = document.createElement("li");
        const newSpanLine = document.createElement("span");
        const newSpanFile = document.createElement("span");
        newLi.innerHTML = "<a href='src/"+files[i]+"'target='workspace'>" + files[i] + "</a>";
        newUl.appendChild(newLi);
        newSpanFile.classList.add("file");
        newLi.prepend(newSpanFile);
        newSpanLine.classList.add("line");
        newLi.prepend(newSpanLine);
    }
}

// Add event on typing
const answers = Array.from(document.getElementsByClassName('answer'))
answers.forEach(answer => {
    answer.addEventListener("keyup", checkAnswer);
})

function checkAnswer() {
    let answerN = answers.indexOf(this)
    value = this.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    let solution = solutions[answerN]
    if (solution.includes(value) === true) {
        playerAnswers[answerN] = value
        unlockAnswer(answerN)
        saveProgress()
    }
}

// Disables input fields
function unlockAnswer(answerN) {
    inputField = "answer" + answerN;
    inputField = document.getElementById(inputField);
/*     inputField.setAttribute('style', 'background-color: lightgreen;');
    inputField.setAttribute("placeholder", playerAnswers[answerN]); */
    inputField.disabled = true;
    inputField.setAttribute('style', 'display: none;');

    const newCorrectInput = document.createElement("div");
    newCorrectInput.classList.add("correctInput");
    newCorrectInput.innerHTML = playerAnswers[answerN];
    inputField.parentNode.prepend(newCorrectInput);

    if (typeof playerAnswers[0] === "string") {
        photoPH = document.getElementById("photoPlaceHolder");
        photoPH.src="src/untitled-3.jpg";
    }
}

// Updates unlocked folders
function updatePasswords() {
    Object.keys(playerPasswords).forEach(password => {
        let folderN = password;
        unlockFolder(folderN);
    })
}

// Updates input fields
function updateAnswers() {
    Object.keys(playerAnswers).forEach(answer => {
        let answerN = answer;
        unlockAnswer(answerN);
    })
}

// Show progression
function progress() {
    var playerProgress = Object.keys(playerAnswers).length;
    let progressBar = document.getElementById("progressBar");
    progressBar.value = playerProgress
    if (playerProgress === answers.length) {
        alert("Félicitations ! Vous avez réussi à identier Mr. Z et à sauver le monde !")
    }
}

// Save and reload
function saveProgress() {
    var playerData = {
        foundPasswords: playerPasswords,
        foundAnswers: playerAnswers
    }
    localStorage.setItem('saveData',JSON.stringify(playerData));
    progress()
}

function loadProgress() {
    if (!JSON.parse(localStorage.getItem('saveData'))) {         
        playerData = {}
    } else {
        var playerData = JSON.parse(localStorage.getItem('saveData'));
        playerPasswords = playerData.foundPasswords;
        playerAnswers = playerData.foundAnswers;
        updateAnswers()
        updatePasswords()
        progress()
    }
}

function deleteProgress() {
    localStorage.clear();
}

console.log("Vaira J. was here.")
window.onload = loadProgress()