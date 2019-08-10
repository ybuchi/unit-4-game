///////////////////
// DELCARE GLOBAL VARIABLES

//All the character's starting attacking power starts at 0
var startingAttack = 0;

//Variables that contain the player and the enemy characters
var player;
var enemy;

//Empty array to store all the game characters
var charArray = [];

//To indicate when we pick a player
var playerSelected = false;
var enemySelected = false;


//CREATE GLOBAL FUNCTIONS

//Builds the characters using a Constructor Function
function character(name, hp, ap, cap, picture){
    this.name = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttack = cap;
    this.picture = picture;
};

//Increase the attack strength
character.prototype.increaseAttack = function () {
    this.attackPower += startingAttack;
};

//Attack function to be executed when the player presses the fight buttoin
character.prototype.attack = function (Obj){
    Obj.healthPoints -= this.attackPower;

    //Display the message
    $("#game-message").html("You did " + this.attackPower + " damage to " + Obj.name + ".");

    //Increase the attack
    this.increaseAttack;

};

//The enemy's counter-attack
character.prototype.counterAttack = function (Obj) {
    Obj.healthPoints -= this.counterAttack;

    //Display message
    $("#game-message").html("<br>" + Obj.name + " did " + this.counterAttack + " damage to you.");

}

//Initialize characters that will get pushed into the character object
function initiateCharacters() {
    var arya = new character("Arya Stark", 100, 10, 20, "assets/images/Arya-Stark-PNG-Picture.png");
    var john = new character("John Snow", 200, 20, 10, "assets/images/Jon-Snow-PNG-Transparent-File.png");
    var danaerys = new character("Danaerys Targaryen", 225 , 5, 5, "assets/images/danaerys.png");
    var nightKing = new character("The Night King", 150, 20, 5, "assets/images/40-405000_the-night-king-png-game-of-thrones-cutouts.png");
    var jaime = new character("Jaime Lannister", 150, 15, 15, "https://cache.popcultcha.com.au/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/j/a/jaimelannisterthreezeroactionfigure.1498557052.png");

    charArray.push(arya, john, danaerys, nightKing, jaime);

}

//Save the original attack value
function setStartingAttack(Obj){ 
    startingAttack = Obj.attackPower;
}

//Checks if the character is alive
function isAlive(Obj) {
    if (Obj.healthPoints > 0) {
        return true;
    }
    return false;
}

// Checks if the player has won
function isWinner() {
    if (charArray.length == 0 && player.healthPoints > 0)
        return true;
    else return false;
}

//CREATE AND DISPLAY THE CHARACTER CARDS ON THE SCREEN
//We can use the jQuery :last-child to fetch the last child element of its parent
function characterCards(divID){

    console.log("the characters have been added to " + divID)

$(divID).children().remove();
for (var i = 0; i < charArray.length; i++) {
    //Create a div
    $(divID).append("<div />");
    //Give it a class "card"
    $(divID + " div:last-child").addClass("card");
    //Inside this div, we create an image tag
    $(divID + " div:last-child").append("<img />");
    //We give this tag an ID
    $(divID + " img:last-child").attr("id", charArray[i].name);
    //We set the image source
    $(divID + " img:last-child").attr("src", charArray[i].picture);
    //Set some image attributes
    $(divID + " img:last-child").attr("height", 150);
    //Set the text with character fighting information
    $(divID + " div:last-child").append("<br>" + charArray[i].name + "<br>");
    $(divID + " div:last-child").append("HP: " + charArray[i].healthPoints);
    $(divID + " idv:last-child").append();

}
}
//Move the character's location on the screen

//We have to delete the div and then recreate it somehwere
function movePicture(fromDivID, toDivID) {
    $(fromDivID).children().remove();
    for (var i = 0; i < charArray.length; i++){
        $(toDivID).append("<img />");
        $(toDivID + " img:last-child").attr("id", charArray[i].name);
        $(toDivID + " img:last-child").attr("src", charArray[i].picture);
        $(toDivID + " img:last-child").attr("width", 150);
        $(toDivID + " img:last-child").addClass("img-thumbnail");
    }
}


$(document).on("click", "img", function () {
    // Stores the defender the user has clicked on in the defender variable and removes it from the charArray
    //Here, this referes to the img
    if (playerSelected && !enemySelected && (this.id != player.name)) {
        for (var j = 0; j < charArray.length; j++) {
            if (charArray[j].name == (this).id) {
                defender = charArray[j]; // sets defender
                console.log(defender);
                charArray.splice(j, 1);
                enemySelected = true;
                $("#msg").html("Click the button to attack!");
            }
        }
        $("#enemyDiv").append(this); // appends the selected defender to the div 

        $("#enemyDiv").append("<br>" + defender.name);
        $("#enemyHealthDiv").append("HP: " + defender.healthPoints);
    
        }
        // Stores the character the user has clicked on in the player variable and removes it from charArray
        if (!playerSelected) {
            for (var i = 0; i < charArray.length; i++) {
                if (charArray[i].name == (this).id) {
                    player = charArray[i]; // sets current player
                    console.log(player);
                    setStartingAttack(player);
                    charArray.splice(i, 1);
                    playerSelected = true;
                    $("#msg").html("Pick an enemy to fight!");
                }
            }
            /////Rep;ace this tomorrow!!!!!!!!!!!!!klj;lkja;lkja;ldkfj
            movePicture("#game", "#enemies-left");
            $("#playerDiv").append(this); // appends the selected player to the div
            $("#playerDiv").append(player.name);
            $("#playerHealthDiv").append("HP: " + player.healthPoints);
        }
    
    });

// The attack button functionality
$(document).on("click", "#attackBtn", function () {
    if (playerSelected && enemySelected) {
        if (isAlive(player) && isAlive(defender)) {
            player.attack(defender);
            defender.counterAttack(player);
            $("#playerHealthDiv").html("HP: " + player.healthPoints); 
            $("#defenderHealthDiv").html("HP: " + defender.healthPoints);
            if (!isAlive(defender)) {
                $("#defenderHealthDiv").html("DEFETED!");
                $("#playerHealthDiv").html("Enemy defeated!");
                $("#msg").html("Pick another enemy to battle...");
            }
            if (!isAlive(player)) {
                $("#playerHealthDiv").html("YOU LOST!");
                $("#msg").html("Try again...");
                $("#attackBtn").html("Restart Game");
                $(document).on("click", "#attackBtn", function () { // restarts game
                    location.reload();
                });
            }
        }
        if (!isAlive(defender)) {
            $("#defenderDiv").removeClass("animated zoomInRight");
            $("#defenderHealthDiv").removeClass("animated zoomInRight");
            $("#defenderDiv").children().remove();
            $("#defenderDiv").html("");
            $("#defenderHealthDiv").html("");
            enemySelected = false;
            if (isWinner()) {
                $("#secondScreen").hide();
                $("#globalMsg").show();
            }
        }
    }
});


// EXECUTE
$(document).ready(function () {
    initiateCharacters();
    characterCards("#gamecharArray");
});






