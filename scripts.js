let playerAnswers = {}
let playerPasswords = {}

const solutions = [["untitled-3.jpg", "untitled-3"], ["vaira"], ["jakobson"], ["mott street", "mott st."], ["19"], ["new york", "new-york"], ["usa", "etats-unis d'amerique", "etats-unis", "united states of america"], ["jacques"], ["dubochet"], ["henri"], ["des"], ["simonetta"], ["sommaruga"]]

function Folder(files, password) {
    this.files = files;
    this.password = password;
}
const folder1 = new Folder(["readme.txt", "mot de passe3.txt"], "147852");
const folder2 = new Folder(["ahahah.jpg","mail.txt"], "1896");
const folder3 = new Folder(["Dossier 7 mdp 1234.txt"], "abcd");
const folder4 = new Folder(["mail4.txt", "notes.txt", "Untitled-1.jpg", "Untitled-2.jpg", "Untitled-3.jpg", "Untitled-4.jpg", "Untitled-5.jpg"], "1236");
const folder5 = new Folder(["c2.jpg", "mailch.txt"], "moscou");
const folder6 = new Folder(["mail6.txt", "adresse.jpg", "iphonescreenshot.jpg"], "motdepassefacile");
const folder7 = new Folder(["mail7.txt", "Lorem Ipsum.txt"], "1234");
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
    if (playerPasswords[folderN] === correctPassword) {console.log("yes")
    } else {
        let promptPassword = prompt("Entrer le mot de passe");
        checkPassword(promptPassword, folderN)
    }
        console.log(playerPasswords, folderN, correctPassword)
}

// Check if password matches
function checkPassword(promptPassword, folderN) {
    let correctPassword = dbRoot[folderN].password
    if (promptPassword === correctPassword) {
        unlockFolder(folderN)
        playerPasswords[folderN] = promptPassword
        progress()
        saveProgress()
        console.log(playerPasswords)
    }
    console.log(correctPassword)
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

function updatePasswords() {
    Object.keys(playerPasswords).forEach(password => {
        let folderN = password;
        unlockFolder(folderN);
    })
}

function updateAnswers() {
    Object.keys(playerAnswers).forEach(answer => {
        let folderN = answer;
        unlockFolder(folderN);
        console.log(folderN)
    })
}

// Vérifier les solutions
var solution
const answers = Array.from(document.getElementsByClassName('answer'))
answers.forEach(answer => {
    answer.addEventListener("keyup", function checkValue() {
        number = answers.indexOf(answer)
        solution = solutions[number]
        value = this.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        if (solution.includes(value)) {
            answer.setAttribute('style', 'background-color: lightgreen;');
            answer.disabled = true
            playerAnswers[number] = value
            saveProgress()
        }
    });
});


/* function askPassword() {
    let folderN = folders.indexOf(this)
    let correctPassword = dbRoot[folderN].password
    if (playerPasswords[folderN] === correctPassword) {console.log("yes")
    } else {
        let promptPassword = prompt("Entrer le mot de passe");
        checkPassword(promptPassword, folderN)
    }
        console.log(playerPasswords, folderN, correctPassword)
} */

// Afficher la progression
function progress() {
    let playerProgress = Object.keys(playerAnswers).length
    let progressBar = document.getElementById("progressBar")
    progressBar.innerHTML = playerProgress + "/" + answers.length
}

// Sauver et recharger
function saveProgress() {
    var playerData = {
        foundPasswords: playerPasswords,
        foundAnswers: playerAnswers
    }    
    localStorage.setItem('saveData',JSON.stringify(playerData));
    progress()
}

function loadProgress() {
    var playerData = JSON.parse(localStorage.getItem('saveData'));
    playerPasswords = playerData.foundPasswords;
    playerAnswers = playerData.foundAnswers;
    updateAnswers()
    updatePasswords()
    progress()
}


function deleteProgress() {
    localStorage.clear();
}

console.log()
window.onload = loadProgress()


// Add and compare an img
/* window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');  // $('img')[0]
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            img.onload = imageIsLoaded;
        }
    });
  });
  
  function imageIsLoaded() { 
    alert(this.src);  // blob url
    // update width and height ...
  } */