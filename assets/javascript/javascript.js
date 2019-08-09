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
    $("#game-message").html("<br>" Obj.name + " did " + this.counterAttack + " damage to you.");

}

//Initialize characters that will get pushed into the character object
function initiateCharacters(){

    var arya = ("Arya Stark", 100, 10, 20, "assets/images/Arya-Stark-PNG-Picture.png");
    var john = ("John Snow", 200, 20, 10, "assets/images/Jon-Snow-PNG-Transparent-File.png");
    var danaerys = ("Danaerys Targaryen", 225 , 5, 5, "assets/images/imgbin-daenerys-targaryen-cosplay-costume-cersei-lannister-dress-game-of-thrones-game-of-thrones-character-UMDYz5FqMBC5qWF5NkSiPkHgJ.jpg");
    var nightKing = ("The Night King", 150, 20, 5, "assets/images/40-405000_the-night-king-png-game-of-thrones-cutouts.png");
    var jaime = ("Jaime Lannister", 150, 15, 15, "assets/images/imgbin-jaime-lannister-game-of-thrones-daenerys-targaryen-cersei-lannister-eddard-stark-jaime-lannister-nUzgEfFZp9HCc2pX5Paymv04T.jpg");
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









