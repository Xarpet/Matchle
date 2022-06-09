import { MATCHES } from "./matches.js";
const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessList = MATCHES[Math.floor(Math.random() * MATCHES.length)]
console.log(rightGuessList)

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

function findCode(name){
    for (var i = 0; i < COUNTRY_CODES.length; i++){
        if (COUNTRY_CODES[i].Name == name){
            return COUNTRY_CODES[i].Code.toLowerCase()
        }
    }
}

function findContinent(name){
    for (var i = 0; i < CONTINENT.length; i++){
        if (CONTINENT[i].country == name){
            return CONTINENT[i].continent
        }
    }
}

function initBoard() {
    let board = document.getElementById("game-board");
    
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "guess-row"
        
        let box1 = document.createElement("div")
        box1.className = "team-box"
        row.appendChild(box1)
        
        let box2 = document.createElement("div")
        box2.className = "score-box"
        row.appendChild(box2)

        let box3 = document.createElement("div")
        box3.className = "year-box"
        row.appendChild(box3)
        
        let box4 = document.createElement("div")
        box4.className = "score-box"
        row.appendChild(box4)
        
        let box5 = document.createElement("div")
        box5.className = "team-box"
        row.appendChild(box5)
        
        board.appendChild(row)
    }
}

initBoard()


toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-full-width",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

toastr["info"]("Guess A World Cup Game! <br> Green is for correct guesses, <br>Yellow is for guesses on the correct continent.", "Welcome!")

document.getElementById("form").addEventListener("submit", (e) =>{
    
    var rightFlag = true

    let row = document.getElementsByClassName("guess-row")[6 - guessesRemaining]
    let box1 = row.children[0]
    let box2 = row.children[1]
    let box3 = row.children[2]
    let box4 = row.children[3]
    let box5 = row.children[4]
    guessesRemaining -= 1
    
    let country1 = document.getElementById("select-country-1").value
    let score1 = document.getElementById("select-score-1").value
    let year = document.getElementById("select-year").value
    let score2 = document.getElementById("select-score-2").value
    let country2 = document.getElementById("select-country-2").value
    
    // flag website:
    // 'https://lipis.github.io/flag-icon-css/flags/4x3/'+countrycodedict[countryName]+'.svg'
    // firstly examine if the country is correct.
    // answer is like :["Uruguay", "2", "2018", "1", "Portugal"]

    // reverse the list if needed

    if (country1 == rightGuessList[4] || country2 == rightGuessList[0]){
        let temp = rightGuessList[0]
        rightGuessList[0] = rightGuessList[4]
        rightGuessList[4] = temp

        let temp2 = rightGuessList[1]
        rightGuessList[1] = rightGuessList[3]
        rightGuessList[3] = temp2
    }
    // when there is yellow when reverse, reverse the list.
    else if (country1 != rightGuessList[0] && country2 != rightGuessList[4]){
        if (findContinent(country1)==findContinent(rightGuessList[4]) || findContinent(country2)==findContinent(rightGuessList[0])){
            let temp = rightGuessList[0]
            rightGuessList[0] = rightGuessList[4]
            rightGuessList[4] = temp

            let temp2 = rightGuessList[1]
            rightGuessList[1] = rightGuessList[3]
            rightGuessList[3] = temp2
        }
    }

    // check the country

    if (country1 == rightGuessList[0]){
        setTimeout(()=> {
            //flip box
            animateCSS(box1, 'flipInX')
            //shade box
            box1.style = "background-Image: url(https://raw.githubusercontent.com/hampusborgos/country-flags/main/png250px/" + findCode(country1) + ".png); background-size:100% 100%;"
        }, 250)}
    else if (findContinent(country1)==findContinent(rightGuessList[0])){
        rightFlag = false
        setTimeout(()=> {
            //flip box
            animateCSS(box1, 'flipInX')
            //shade box
            box1.innerHTML = findContinent(country1)
            box1.style = "background-color: yellow"
        }, 250)
    }
    else {
        rightFlag = false
        setTimeout(()=> {
            //flip box
            animateCSS(box1, 'flipInX')
            //shade box
            box1.style = "background-color: red"
        }, 250)
    }

    if (country2 == rightGuessList[4]) {
        setTimeout(()=> {
            //flip box
            animateCSS(box5, 'flipInX')
            //shade box
            box5.style = "background-Image: url(https://raw.githubusercontent.com/hampusborgos/country-flags/main/png250px/" + findCode(country2) + ".png); background-size:100% 100%;"
        }, 500)
    }
    else if (findContinent(country2)==findContinent(rightGuessList[4])) {
        rightFlag = false
        setTimeout(()=> {
            //flip box
            animateCSS(box5, 'flipInX')
            //shade box
            box5.innerHTML = findContinent(country2)
            box5.style = "background-color: yellow"
        }, 500)
    }
    else {
        rightFlag = false
        setTimeout(()=> {
            //flip box
            animateCSS(box5, 'flipInX')
            //shade box
            box5.style = "background-color: red"
        }, 500)
    }

    // finish the country part
    // start the score and year

    if (score1 == rightGuessList[1]) {
        setTimeout(()=> {
            //flip box
            animateCSS(box2, 'flipInX')
            //shade box
            box2.innerHTML = score1
            box2.style = "background-color: green"
        }, 750)
    }
    else {
        rightFlag = false
        setTimeout(()=> {
            //flip box
            animateCSS(box2, 'flipInX')
            //shade box
            box2.style = "background-color: red"
        }, 750)
    }

    if (score2 == rightGuessList[3]) {
        setTimeout(()=> {
            //flip box
            animateCSS(box4, 'flipInX')
            //shade box
            box4.innerHTML = score2
            box4.style = "background-color: green"
        }, 1000)
    }
    else {
        rightFlag = false
        setTimeout(()=> {
            //flip box
            animateCSS(box4, 'flipInX')
            //shade box
            box4.style = "background-color: red"
        }, 1000)
    }

    if (year == rightGuessList[2]){
        setTimeout(()=> {
            //flip box
            animateCSS(box3, 'flipInX')
            //shade box
            box3.innerHTML = year
            box3.style = "background-color: green"
        }, 1250)
    }
    else {
        rightFlag = false
        setTimeout(()=> {
            //flip box
            animateCSS(box3, 'flipInX')
            //shade box
            box3.style = "background-color: red"
        }, 1250)
    }

    // ending
    if (rightFlag) {
        setTimeout(()=> {
            toastr.success("You are right! You made it in " + (6-guessesRemaining) + " guesses!")
            document.getElementById("form").remove()
        }, 1500)
    }
    else if (guessesRemaining == 0){
        setTimeout(()=> {
            toastr.error("You ran out of guesses! The game was:")

            animateCSS(box1, 'flipInX')
            box1.innerHTML = ""
            box1.style = "background-Image: url(https://raw.githubusercontent.com/hampusborgos/country-flags/main/png250px/" + findCode(rightGuessList[0]) + ".png); background-size:100% 100%;"

            animateCSS(box5, 'flipInX')
            box5.innerHTML = ""
            box5.style = "background-Image: url(https://raw.githubusercontent.com/hampusborgos/country-flags/main/png250px/" + findCode(rightGuessList[4]) + ".png); background-size:100% 100%;"

            animateCSS(box2, 'flipInX')
            box2.innerHTML = rightGuessList[1]
            box2.style = "background-color: green"

            animateCSS(box4, 'flipInX')
            box4.innerHTML = rightGuessList[3]
            box4.style = "background-color: green"

            animateCSS(box3, 'flipInX')
            box3.innerHTML = rightGuessList[2]
            box3.style = "background-color: green"
            document.getElementById("form").remove()
        }, 1500)
    }
})











// data
const CONTINENT = [
    {
        "country": "Afghanistan",
        "continent": "Asia"
    },
    {
        "country": "Albania",
        "continent": "Europe"
    },
    {
        "country": "Algeria",
        "continent": "Africa"
    },
    {
        "country": "American Samoa",
        "continent": "Oceania"
    },
    {
        "country": "Andorra",
        "continent": "Europe"
    },
    {
        "country": "Angola",
        "continent": "Africa"
    },
    {
        "country": "Anguilla",
        "continent": "North America"
    },
    {
        "country": "Antarctica",
        "continent": "Antarctica"
    },
    {
        "country": "Antigua and Barbuda",
        "continent": "North America"
    },
    {
        "country": "Argentina",
        "continent": "South America"
    },
    {
        "country": "Armenia",
        "continent": "Asia"
    },
    {
        "country": "Aruba",
        "continent": "North America"
    },
    {
        "country": "Australia",
        "continent": "Oceania"
    },
    {
        "country": "Austria",
        "continent": "Europe"
    },
    {
        "country": "Azerbaijan",
        "continent": "Asia"
    },
    {
        "country": "Bahamas",
        "continent": "North America"
    },
    {
        "country": "Bahrain",
        "continent": "Asia"
    },
    {
        "country": "Bangladesh",
        "continent": "Asia"
    },
    {
        "country": "Barbados",
        "continent": "North America"
    },
    {
        "country": "Belarus",
        "continent": "Europe"
    },
    {
        "country": "Belgium",
        "continent": "Europe"
    },
    {
        "country": "Belize",
        "continent": "North America"
    },
    {
        "country": "Benin",
        "continent": "Africa"
    },
    {
        "country": "Bermuda",
        "continent": "North America"
    },
    {
        "country": "Bhutan",
        "continent": "Asia"
    },
    {
        "country": "Bolivia",
        "continent": "South America"
    },
    {
        "country": "Bosnia and Herzegovina",
        "continent": "Europe"
    },
    {
        "country": "Botswana",
        "continent": "Africa"
    },
    {
        "country": "Bouvet Island",
        "continent": "Antarctica"
    },
    {
        "country": "Brazil",
        "continent": "South America"
    },
    {
        "country": "British Indian Ocean Territory",
        "continent": "Africa"
    },
    {
        "country": "Brunei",
        "continent": "Asia"
    },
    {
        "country": "Bulgaria",
        "continent": "Europe"
    },
    {
        "country": "Burkina Faso",
        "continent": "Africa"
    },
    {
        "country": "Burundi",
        "continent": "Africa"
    },
    {
        "country": "Cambodia",
        "continent": "Asia"
    },
    {
        "country": "Cameroon",
        "continent": "Africa"
    },
    {
        "country": "Canada",
        "continent": "North America"
    },
    {
        "country": "Cape Verde",
        "continent": "Africa"
    },
    {
        "country": "Cayman Islands",
        "continent": "North America"
    },
    {
        "country": "Central African Republic",
        "continent": "Africa"
    },
    {
        "country": "Chad",
        "continent": "Africa"
    },
    {
        "country": "Chile",
        "continent": "South America"
    },
    {
        "country": "China",
        "continent": "Asia"
    },
    {
        "country": "Christmas Island",
        "continent": "Oceania"
    },
    {
        "country": "Cocos (Keeling) Islands",
        "continent": "Oceania"
    },
    {
        "country": "Colombia",
        "continent": "South America"
    },
    {
        "country": "Comoros",
        "continent": "Africa"
    },
    {
        "country": "Congo",
        "continent": "Africa"
    },
    {
        "country": "Cook Islands",
        "continent": "Oceania"
    },
    {
        "country": "Costa Rica",
        "continent": "North America"
    },
    {
        "country": "Croatia",
        "continent": "Europe"
    },
    {
        "country": "Cuba",
        "continent": "North America"
    },
    {
        "country": "Cyprus",
        "continent": "Asia"
    },
    {
        "country": "Czech Republic",
        "continent": "Europe"
    },
    {
        "country": "Denmark",
        "continent": "Europe"
    },
    {
        "country": "Djibouti",
        "continent": "Africa"
    },
    {
        "country": "Dominica",
        "continent": "North America"
    },
    {
        "country": "Dominican Republic",
        "continent": "North America"
    },
    {
        "country": "East Timor",
        "continent": "Asia"
    },
    {
        "country": "Ecuador",
        "continent": "South America"
    },
    {
        "country": "Egypt",
        "continent": "Africa"
    },
    {
        "country": "El Salvador",
        "continent": "North America"
    },
    {
        "country": "England",
        "continent": "Europe"
    },
    {
        "country": "Equatorial Guinea",
        "continent": "Africa"
    },
    {
        "country": "Eritrea",
        "continent": "Africa"
    },
    {
        "country": "Estonia",
        "continent": "Europe"
    },
    {
        "country": "Ethiopia",
        "continent": "Africa"
    },
    {
        "country": "Falkland Islands",
        "continent": "South America"
    },
    {
        "country": "Faroe Islands",
        "continent": "Europe"
    },
    {
        "country": "Fiji Islands",
        "continent": "Oceania"
    },
    {
        "country": "Finland",
        "continent": "Europe"
    },
    {
        "country": "France",
        "continent": "Europe"
    },
    {
        "country": "French Guiana",
        "continent": "South America"
    },
    {
        "country": "French Polynesia",
        "continent": "Oceania"
    },
    {
        "country": "French Southern territories",
        "continent": "Antarctica"
    },
    {
        "country": "Gabon",
        "continent": "Africa"
    },
    {
        "country": "Gambia",
        "continent": "Africa"
    },
    {
        "country": "Georgia",
        "continent": "Asia"
    },
    {
        "country": "Germany",
        "continent": "Europe"
    },
    {
        "country": "Ghana",
        "continent": "Africa"
    },
    {
        "country": "Gibraltar",
        "continent": "Europe"
    },
    {
        "country": "Greece",
        "continent": "Europe"
    },
    {
        "country": "Greenland",
        "continent": "North America"
    },
    {
        "country": "Grenada",
        "continent": "North America"
    },
    {
        "country": "Guadeloupe",
        "continent": "North America"
    },
    {
        "country": "Guam",
        "continent": "Oceania"
    },
    {
        "country": "Guatemala",
        "continent": "North America"
    },
    {
        "country": "Guinea",
        "continent": "Africa"
    },
    {
        "country": "Guinea-Bissau",
        "continent": "Africa"
    },
    {
        "country": "Guyana",
        "continent": "South America"
    },
    {
        "country": "Haiti",
        "continent": "North America"
    },
    {
        "country": "Heard Island and McDonald Islands",
        "continent": "Antarctica"
    },
    {
        "country": "Holy See (Vatican City State)",
        "continent": "Europe"
    },
    {
        "country": "Honduras",
        "continent": "North America"
    },
    {
        "country": "Hong Kong",
        "continent": "Asia"
    },
    {
        "country": "Hungary",
        "continent": "Europe"
    },
    {
        "country": "Iceland",
        "continent": "Europe"
    },
    {
        "country": "India",
        "continent": "Asia"
    },
    {
        "country": "Indonesia",
        "continent": "Asia"
    },
    {
        "country": "Iran",
        "continent": "Asia"
    },
    {
        "country": "Iraq",
        "continent": "Asia"
    },
    {
        "country": "Ireland",
        "continent": "Europe"
    },
    {
        "country": "Israel",
        "continent": "Asia"
    },
    {
        "country": "Italy",
        "continent": "Europe"
    },
    {
        "country": "Ivory Coast",
        "continent": "Africa"
    },
    {
        "country": "Jamaica",
        "continent": "North America"
    },
    {
        "country": "Japan",
        "continent": "Asia"
    },
    {
        "country": "Jordan",
        "continent": "Asia"
    },
    {
        "country": "Kazakhstan",
        "continent": "Asia"
    },
    {
        "country": "Kenya",
        "continent": "Africa"
    },
    {
        "country": "Kiribati",
        "continent": "Oceania"
    },
    {
        "country": "Kuwait",
        "continent": "Asia"
    },
    {
        "country": "Kyrgyzstan",
        "continent": "Asia"
    },
    {
        "country": "Laos",
        "continent": "Asia"
    },
    {
        "country": "Latvia",
        "continent": "Europe"
    },
    {
        "country": "Lebanon",
        "continent": "Asia"
    },
    {
        "country": "Lesotho",
        "continent": "Africa"
    },
    {
        "country": "Liberia",
        "continent": "Africa"
    },
    {
        "country": "Libyan Arab Jamahiriya",
        "continent": "Africa"
    },
    {
        "country": "Liechtenstein",
        "continent": "Europe"
    },
    {
        "country": "Lithuania",
        "continent": "Europe"
    },
    {
        "country": "Luxembourg",
        "continent": "Europe"
    },
    {
        "country": "Macao",
        "continent": "Asia"
    },
    {
        "country": "North Macedonia",
        "continent": "Europe"
    },
    {
        "country": "Madagascar",
        "continent": "Africa"
    },
    {
        "country": "Malawi",
        "continent": "Africa"
    },
    {
        "country": "Malaysia",
        "continent": "Asia"
    },
    {
        "country": "Maldives",
        "continent": "Asia"
    },
    {
        "country": "Mali",
        "continent": "Africa"
    },
    {
        "country": "Malta",
        "continent": "Europe"
    },
    {
        "country": "Marshall Islands",
        "continent": "Oceania"
    },
    {
        "country": "Martinique",
        "continent": "North America"
    },
    {
        "country": "Mauritania",
        "continent": "Africa"
    },
    {
        "country": "Mauritius",
        "continent": "Africa"
    },
    {
        "country": "Mayotte",
        "continent": "Africa"
    },
    {
        "country": "Mexico",
        "continent": "North America"
    },
    {
        "country": "Micronesia, Federated States of",
        "continent": "Oceania"
    },
    {
        "country": "Moldova",
        "continent": "Europe"
    },
    {
        "country": "Monaco",
        "continent": "Europe"
    },
    {
        "country": "Mongolia",
        "continent": "Asia"
    },
    {
        "country": "Montenegro",
        "continent": "Europe"
    },
    {
        "country": "Montserrat",
        "continent": "North America"
    },
    {
        "country": "Morocco",
        "continent": "Africa"
    },
    {
        "country": "Mozambique",
        "continent": "Africa"
    },
    {
        "country": "Myanmar",
        "continent": "Asia"
    },
    {
        "country": "Namibia",
        "continent": "Africa"
    },
    {
        "country": "Nauru",
        "continent": "Oceania"
    },
    {
        "country": "Nepal",
        "continent": "Asia"
    },
    {
        "country": "Netherlands",
        "continent": "Europe"
    },
    {
        "country": "Netherlands Antilles",
        "continent": "North America"
    },
    {
        "country": "New Caledonia",
        "continent": "Oceania"
    },
    {
        "country": "New Zealand",
        "continent": "Oceania"
    },
    {
        "country": "Nicaragua",
        "continent": "North America"
    },
    {
        "country": "Niger",
        "continent": "Africa"
    },
    {
        "country": "Nigeria",
        "continent": "Africa"
    },
    {
        "country": "Niue",
        "continent": "Oceania"
    },
    {
        "country": "Norfolk Island",
        "continent": "Oceania"
    },
    {
        "country": "North Korea",
        "continent": "Asia"
    },
    {
        "country": "Northern Ireland",
        "continent": "Europe"
    },
    {
        "country": "Northern Mariana Islands",
        "continent": "Oceania"
    },
    {
        "country": "Norway",
        "continent": "Europe"
    },
    {
        "country": "Oman",
        "continent": "Asia"
    },
    {
        "country": "Pakistan",
        "continent": "Asia"
    },
    {
        "country": "Palau",
        "continent": "Oceania"
    },
    {
        "country": "Palestine",
        "continent": "Asia"
    },
    {
        "country": "Panama",
        "continent": "North America"
    },
    {
        "country": "Papua New Guinea",
        "continent": "Oceania"
    },
    {
        "country": "Paraguay",
        "continent": "South America"
    },
    {
        "country": "Peru",
        "continent": "South America"
    },
    {
        "country": "Philippines",
        "continent": "Asia"
    },
    {
        "country": "Pitcairn",
        "continent": "Oceania"
    },
    {
        "country": "Poland",
        "continent": "Europe"
    },
    {
        "country": "Portugal",
        "continent": "Europe"
    },
    {
        "country": "Puerto Rico",
        "continent": "North America"
    },
    {
        "country": "Qatar",
        "continent": "Asia"
    },
    {
        "country": "Reunion",
        "continent": "Africa"
    },
    {
        "country": "Romania",
        "continent": "Europe"
    },
    {
        "country": "Russian Federation",
        "continent": "Europe"
    },
    {
        "country": "Rwanda",
        "continent": "Africa"
    },
    {
        "country": "Saint Helena",
        "continent": "Africa"
    },
    {
        "country": "Saint Kitts and Nevis",
        "continent": "North America"
    },
    {
        "country": "Saint Lucia",
        "continent": "North America"
    },
    {
        "country": "Saint Pierre and Miquelon",
        "continent": "North America"
    },
    {
        "country": "Saint Vincent and the Grenadines",
        "continent": "North America"
    },
    {
        "country": "Samoa",
        "continent": "Oceania"
    },
    {
        "country": "San Marino",
        "continent": "Europe"
    },
    {
        "country": "Sao Tome and Principe",
        "continent": "Africa"
    },
    {
        "country": "Saudi Arabia",
        "continent": "Asia"
    },
    {
        "country": "Scotland",
        "continent": "Europe"
    },
    {
        "country": "Senegal",
        "continent": "Africa"
    },
    {
        "country": "Serbia",
        "continent": "Europe"
    },
    {
        "country": "Seychelles",
        "continent": "Africa"
    },
    {
        "country": "Sierra Leone",
        "continent": "Africa"
    },
    {
        "country": "Singapore",
        "continent": "Asia"
    },
    {
        "country": "Slovakia",
        "continent": "Europe"
    },
    {
        "country": "Slovenia",
        "continent": "Europe"
    },
    {
        "country": "Solomon Islands",
        "continent": "Oceania"
    },
    {
        "country": "Somalia",
        "continent": "Africa"
    },
    {
        "country": "South Africa",
        "continent": "Africa"
    },
    {
        "country": "South Georgia and the South Sandwich Islands",
        "continent": "Antarctica"
    },
    {
        "country": "South Korea",
        "continent": "Asia"
    },
    {
        "country": "South Sudan",
        "continent": "Africa"
    },
    {
        "country": "Spain",
        "continent": "Europe"
    },
    {
        "country": "Sri Lanka",
        "continent": "Asia"
    },
    {
        "country": "Sudan",
        "continent": "Africa"
    },
    {
        "country": "Suriname",
        "continent": "South America"
    },
    {
        "country": "Svalbard and Jan Mayen",
        "continent": "Europe"
    },
    {
        "country": "Swaziland",
        "continent": "Africa"
    },
    {
        "country": "Sweden",
        "continent": "Europe"
    },
    {
        "country": "Switzerland",
        "continent": "Europe"
    },
    {
        "country": "Syria",
        "continent": "Asia"
    },
    {
        "country": "Tajikistan",
        "continent": "Asia"
    },
    {
        "country": "Tanzania",
        "continent": "Africa"
    },
    {
        "country": "Thailand",
        "continent": "Asia"
    },
    {
        "country": "The Democratic Republic of Congo",
        "continent": "Africa"
    },
    {
        "country": "Togo",
        "continent": "Africa"
    },
    {
        "country": "Tokelau",
        "continent": "Oceania"
    },
    {
        "country": "Tonga",
        "continent": "Oceania"
    },
    {
        "country": "Trinidad and Tobago",
        "continent": "North America"
    },
    {
        "country": "Tunisia",
        "continent": "Africa"
    },
    {
        "country": "Turkey",
        "continent": "Asia"
    },
    {
        "country": "Turkmenistan",
        "continent": "Asia"
    },
    {
        "country": "Turks and Caicos Islands",
        "continent": "North America"
    },
    {
        "country": "Tuvalu",
        "continent": "Oceania"
    },
    {
        "country": "Uganda",
        "continent": "Africa"
    },
    {
        "country": "Ukraine",
        "continent": "Europe"
    },
    {
        "country": "United Arab Emirates",
        "continent": "Asia"
    },
    {
        "country": "United Kingdom",
        "continent": "Europe"
    },
    {
        "country": "United States",
        "continent": "North America"
    },
    {
        "country": "United States Minor Outlying Islands",
        "continent": "Oceania"
    },
    {
        "country": "Uruguay",
        "continent": "South America"
    },
    {
        "country": "Uzbekistan",
        "continent": "Asia"
    },
    {
        "country": "Vanuatu",
        "continent": "Oceania"
    },
    {
        "country": "Venezuela",
        "continent": "South America"
    },
    {
        "country": "Vietnam",
        "continent": "Asia"
    },
    {
        "country": "Virgin Islands, British",
        "continent": "North America"
    },
    {
        "country": "Virgin Islands, U.S.",
        "continent": "North America"
    },
    {
        "country": "Wales",
        "continent": "Europe"
    },
    {
        "country": "Wallis and Futuna",
        "continent": "Oceania"
    },
    {
        "country": "Western Sahara",
        "continent": "Africa"
    },
    {
        "country": "Yemen",
        "continent": "Asia"
    },
    {
        "country": "Zambia",
        "continent": "Africa"
    },
    {
        "country": "Zimbabwe",
        "continent": "Africa"
    }
]
const COUNTRY_CODES = [{"Code": "AF", "Name": "Afghanistan"},{"Code": "AX", "Name": "\u00c5land Islands"},{"Code": "AL", "Name": "Albania"},{"Code": "DZ", "Name": "Algeria"},{"Code": "AS", "Name": "American Samoa"},{"Code": "AD", "Name": "Andorra"},{"Code": "AO", "Name": "Angola"},{"Code": "AI", "Name": "Anguilla"},{"Code": "AQ", "Name": "Antarctica"},{"Code": "AG", "Name": "Antigua and Barbuda"},{"Code": "AR", "Name": "Argentina"},{"Code": "AM", "Name": "Armenia"},{"Code": "AW", "Name": "Aruba"},{"Code": "AU", "Name": "Australia"},{"Code": "AT", "Name": "Austria"},{"Code": "AZ", "Name": "Azerbaijan"},{"Code": "BS", "Name": "Bahamas"},{"Code": "BH", "Name": "Bahrain"},{"Code": "BD", "Name": "Bangladesh"},{"Code": "BB", "Name": "Barbados"},{"Code": "BY", "Name": "Belarus"},{"Code": "BE", "Name": "Belgium"},{"Code": "BZ", "Name": "Belize"},{"Code": "BJ", "Name": "Benin"},{"Code": "BM", "Name": "Bermuda"},{"Code": "BT", "Name": "Bhutan"},{"Code": "BO", "Name": "Bolivia, Plurinational State of"},{"Code": "BQ", "Name": "Bonaire, Sint Eustatius and Saba"},{"Code": "BA", "Name": "Bosnia and Herzegovina"},{"Code": "BW", "Name": "Botswana"},{"Code": "BV", "Name": "Bouvet Island"},{"Code": "BR", "Name": "Brazil"},{"Code": "IO", "Name": "British Indian Ocean Territory"},{"Code": "BN", "Name": "Brunei Darussalam"},{"Code": "BG", "Name": "Bulgaria"},{"Code": "BF", "Name": "Burkina Faso"},{"Code": "BI", "Name": "Burundi"},{"Code": "KH", "Name": "Cambodia"},{"Code": "CM", "Name": "Cameroon"},{"Code": "CA", "Name": "Canada"},{"Code": "CV", "Name": "Cape Verde"},{"Code": "KY", "Name": "Cayman Islands"},{"Code": "CF", "Name": "Central African Republic"},{"Code": "TD", "Name": "Chad"},{"Code": "CL", "Name": "Chile"},{"Code": "CN", "Name": "China"},{"Code": "CX", "Name": "Christmas Island"},{"Code": "CC", "Name": "Cocos (Keeling) Islands"},{"Code": "CO", "Name": "Colombia"},{"Code": "KM", "Name": "Comoros"},{"Code": "CG", "Name": "Congo"},{"Code": "CD", "Name": "Congo, the Democratic Republic of the"},{"Code": "CK", "Name": "Cook Islands"},{"Code": "CR", "Name": "Costa Rica"},{"Code": "CI", "Name": "C\u00f4te d'Ivoire"},{"Code": "HR", "Name": "Croatia"},{"Code": "CU", "Name": "Cuba"},{"Code": "CW", "Name": "Cura\u00e7ao"},{"Code": "CY", "Name": "Cyprus"},{"Code": "CZ", "Name": "Czech Republic"},{"Code": "DK", "Name": "Denmark"},{"Code": "DJ", "Name": "Djibouti"},{"Code": "DM", "Name": "Dominica"},{"Code": "DO", "Name": "Dominican Republic"},{"Code": "EC", "Name": "Ecuador"},{"Code": "EG", "Name": "Egypt"},{"Code": "SV", "Name": "El Salvador"},{"Code": "GQ", "Name": "Equatorial Guinea"},{"Code": "ER", "Name": "Eritrea"},{"Code": "EE", "Name": "Estonia"},{"Code": "ET", "Name": "Ethiopia"},{"Code": "FK", "Name": "Falkland Islands (Malvinas)"},{"Code": "FO", "Name": "Faroe Islands"},{"Code": "FJ", "Name": "Fiji"},{"Code": "FI", "Name": "Finland"},{"Code": "FR", "Name": "France"},{"Code": "GF", "Name": "French Guiana"},{"Code": "PF", "Name": "French Polynesia"},{"Code": "TF", "Name": "French Southern Territories"},{"Code": "GA", "Name": "Gabon"},{"Code": "GM", "Name": "Gambia"},{"Code": "GE", "Name": "Georgia"},{"Code": "DE", "Name": "Germany"},{"Code": "GH", "Name": "Ghana"},{"Code": "GI", "Name": "Gibraltar"},{"Code": "GR", "Name": "Greece"},{"Code": "GL", "Name": "Greenland"},{"Code": "GD", "Name": "Grenada"},{"Code": "GP", "Name": "Guadeloupe"},{"Code": "GU", "Name": "Guam"},{"Code": "GT", "Name": "Guatemala"},{"Code": "GG", "Name": "Guernsey"},{"Code": "GN", "Name": "Guinea"},{"Code": "GW", "Name": "Guinea-Bissau"},{"Code": "GY", "Name": "Guyana"},{"Code": "HT", "Name": "Haiti"},{"Code": "HM", "Name": "Heard Island and McDonald Islands"},{"Code": "VA", "Name": "Holy See (Vatican City State)"},{"Code": "HN", "Name": "Honduras"},{"Code": "HK", "Name": "Hong Kong"},{"Code": "HU", "Name": "Hungary"},{"Code": "IS", "Name": "Iceland"},{"Code": "IN", "Name": "India"},{"Code": "ID", "Name": "Indonesia"},{"Code": "IR", "Name": "Iran, Islamic Republic of"},{"Code": "IQ", "Name": "Iraq"},{"Code": "IE", "Name": "Ireland"},{"Code": "IM", "Name": "Isle of Man"},{"Code": "IL", "Name": "Israel"},{"Code": "IT", "Name": "Italy"},{"Code": "JM", "Name": "Jamaica"},{"Code": "JP", "Name": "Japan"},{"Code": "JE", "Name": "Jersey"},{"Code": "JO", "Name": "Jordan"},{"Code": "KZ", "Name": "Kazakhstan"},{"Code": "KE", "Name": "Kenya"},{"Code": "KI", "Name": "Kiribati"},{"Code": "KP", "Name": "Korea, Democratic People's Republic of"},{"Code": "KR", "Name": "Korea, Republic of"},{"Code": "KW", "Name": "Kuwait"},{"Code": "KG", "Name": "Kyrgyzstan"},{"Code": "LA", "Name": "Lao People's Democratic Republic"},{"Code": "LV", "Name": "Latvia"},{"Code": "LB", "Name": "Lebanon"},{"Code": "LS", "Name": "Lesotho"},{"Code": "LR", "Name": "Liberia"},{"Code": "LY", "Name": "Libya"},{"Code": "LI", "Name": "Liechtenstein"},{"Code": "LT", "Name": "Lithuania"},{"Code": "LU", "Name": "Luxembourg"},{"Code": "MO", "Name": "Macao"},{"Code": "MK", "Name": "Macedonia, the Former Yugoslav Republic of"},{"Code": "MG", "Name": "Madagascar"},{"Code": "MW", "Name": "Malawi"},{"Code": "MY", "Name": "Malaysia"},{"Code": "MV", "Name": "Maldives"},{"Code": "ML", "Name": "Mali"},{"Code": "MT", "Name": "Malta"},{"Code": "MH", "Name": "Marshall Islands"},{"Code": "MQ", "Name": "Martinique"},{"Code": "MR", "Name": "Mauritania"},{"Code": "MU", "Name": "Mauritius"},{"Code": "YT", "Name": "Mayotte"},{"Code": "MX", "Name": "Mexico"},{"Code": "FM", "Name": "Micronesia, Federated States of"},{"Code": "MD", "Name": "Moldova, Republic of"},{"Code": "MC", "Name": "Monaco"},{"Code": "MN", "Name": "Mongolia"},{"Code": "ME", "Name": "Montenegro"},{"Code": "MS", "Name": "Montserrat"},{"Code": "MA", "Name": "Morocco"},{"Code": "MZ", "Name": "Mozambique"},{"Code": "MM", "Name": "Myanmar"},{"Code": "NA", "Name": "Namibia"},{"Code": "NR", "Name": "Nauru"},{"Code": "NP", "Name": "Nepal"},{"Code": "NL", "Name": "Netherlands"},{"Code": "NC", "Name": "New Caledonia"},{"Code": "NZ", "Name": "New Zealand"},{"Code": "NI", "Name": "Nicaragua"},{"Code": "NE", "Name": "Niger"},{"Code": "NG", "Name": "Nigeria"},{"Code": "NU", "Name": "Niue"},{"Code": "NF", "Name": "Norfolk Island"},{"Code": "MP", "Name": "Northern Mariana Islands"},{"Code": "NO", "Name": "Norway"},{"Code": "OM", "Name": "Oman"},{"Code": "PK", "Name": "Pakistan"},{"Code": "PW", "Name": "Palau"},{"Code": "PS", "Name": "Palestine, State of"},{"Code": "PA", "Name": "Panama"},{"Code": "PG", "Name": "Papua New Guinea"},{"Code": "PY", "Name": "Paraguay"},{"Code": "PE", "Name": "Peru"},{"Code": "PH", "Name": "Philippines"},{"Code": "PN", "Name": "Pitcairn"},{"Code": "PL", "Name": "Poland"},{"Code": "PT", "Name": "Portugal"},{"Code": "PR", "Name": "Puerto Rico"},{"Code": "QA", "Name": "Qatar"},{"Code": "RE", "Name": "R\u00e9union"},{"Code": "RO", "Name": "Romania"},{"Code": "RU", "Name": "Russian Federation"},{"Code": "RW", "Name": "Rwanda"},{"Code": "BL", "Name": "Saint Barth\u00e9lemy"},{"Code": "SH", "Name": "Saint Helena, Ascension and Tristan da Cunha"},{"Code": "KN", "Name": "Saint Kitts and Nevis"},{"Code": "LC", "Name": "Saint Lucia"},{"Code": "MF", "Name": "Saint Martin (French part)"},{"Code": "PM", "Name": "Saint Pierre and Miquelon"},{"Code": "VC", "Name": "Saint Vincent and the Grenadines"},{"Code": "WS", "Name": "Samoa"},{"Code": "SM", "Name": "San Marino"},{"Code": "ST", "Name": "Sao Tome and Principe"},{"Code": "SA", "Name": "Saudi Arabia"},{"Code": "SN", "Name": "Senegal"},{"Code": "RS", "Name": "Serbia"},{"Code": "SC", "Name": "Seychelles"},{"Code": "SL", "Name": "Sierra Leone"},{"Code": "SG", "Name": "Singapore"},{"Code": "SX", "Name": "Sint Maarten (Dutch part)"},{"Code": "SK", "Name": "Slovakia"},{"Code": "SI", "Name": "Slovenia"},{"Code": "SB", "Name": "Solomon Islands"},{"Code": "SO", "Name": "Somalia"},{"Code": "ZA", "Name": "South Africa"},{"Code": "GS", "Name": "South Georgia and the South Sandwich Islands"},{"Code": "SS", "Name": "South Sudan"},{"Code": "ES", "Name": "Spain"},{"Code": "LK", "Name": "Sri Lanka"},{"Code": "SD", "Name": "Sudan"},{"Code": "SR", "Name": "Suriname"},{"Code": "SJ", "Name": "Svalbard and Jan Mayen"},{"Code": "SZ", "Name": "Swaziland"},{"Code": "SE", "Name": "Sweden"},{"Code": "CH", "Name": "Switzerland"},{"Code": "SY", "Name": "Syrian Arab Republic"},{"Code": "TW", "Name": "Taiwan, Province of China"},{"Code": "TJ", "Name": "Tajikistan"},{"Code": "TZ", "Name": "Tanzania, United Republic of"},{"Code": "TH", "Name": "Thailand"},{"Code": "TL", "Name": "Timor-Leste"},{"Code": "TG", "Name": "Togo"},{"Code": "TK", "Name": "Tokelau"},{"Code": "TO", "Name": "Tonga"},{"Code": "TT", "Name": "Trinidad and Tobago"},{"Code": "TN", "Name": "Tunisia"},{"Code": "TR", "Name": "Turkey"},{"Code": "TM", "Name": "Turkmenistan"},{"Code": "TC", "Name": "Turks and Caicos Islands"},{"Code": "TV", "Name": "Tuvalu"},{"Code": "UG", "Name": "Uganda"},{"Code": "UA", "Name": "Ukraine"},{"Code": "AE", "Name": "United Arab Emirates"},{"Code": "GB", "Name": "United Kingdom"},{"Code": "US", "Name": "United States"},{"Code": "UM", "Name": "United States Minor Outlying Islands"},{"Code": "UY", "Name": "Uruguay"},{"Code": "UZ", "Name": "Uzbekistan"},{"Code": "VU", "Name": "Vanuatu"},{"Code": "VE", "Name": "Venezuela, Bolivarian Republic of"},{"Code": "VN", "Name": "Viet Nam"},{"Code": "VG", "Name": "Virgin Islands, British"},{"Code": "VI", "Name": "Virgin Islands, U.S."},{"Code": "WF", "Name": "Wallis and Futuna"},{"Code": "EH", "Name": "Western Sahara"},{"Code": "YE", "Name": "Yemen"},{"Code": "ZM", "Name": "Zambia"},{"Code": "ZW", "Name": "Zimbabwe"}]