const apiLink = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}"`;
var word = '';
var wordDisplayed = document.getElementById("word");
var definitionDisplayed = document.getElementById("definition");
var synonymsDisplayed = document.getElementById("related-words");


// function getDate(){

// }
function confirmNewDay() {
    //get today's date and check if it is a different date than it was last time function was run
    var date = new Date().toLocaleDateString();
    if (localStorage.app_date == date) {
        return false
    }

    localStorage.app_date = date;
    return true
}

// function getWord() {
    // pull from database of words I create
// }

// function getDefinition() {
    // pull from dictionary API
// }

// function displayWord() {

// }

// function displayDefinition {
    
// }
// TODO: randomize id number from length of array of words in dictionary API
// TODO: use that id number to select a random word
// TODO: if that word is fewer than 4 letters, re-randomize (maybe narrow down data set to words fewer than 5 letters first and then randomize remaining data? feels like that would take forever)
// TODO: populate submission cards with user submissions of stories
// maybe less art-focused and more just story telling/journaling style?
// suggestions accepted/stored then randomized and pulled from once a week
// if for any reason this actually took off, increase frequency of using suggestions
// someone could post all the photos that they associate with that word
// or link music from spotify
// or write about it
// or upload a file if/when I can figure that out 
// calendar so if you missed a word you can go back and click on the word/day fill that in
// each profile is a calendar-style display with each day having the word of that day prominently displayed/you can click on that day and input the information
// utilize module lessons by having days that user has not submitted an entry for highlighted in a different color

