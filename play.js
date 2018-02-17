
$(document).ready(function() {

	var voldy = {
		name:"Voldemort",
		id:"voldy",
		health:120,
		attack:15,
		counterAttack:7,
	};

	var magneto = {
		name:"Magneto",
		id:"magneto",
		health:150,
		attack:10,
		counterAttack:9,
	};

	var vader = {
		name:"Darth Vader",
		id:"vader",
		health:180,
		attack:11,
		counterAttack:13,
	};

	var saruman = {
		name:"Saruman",
		id:"saruman",
		health:100,
		attack:15,
		counterAttack:14,
	};

	var loki = {
		name:"Loki",
		id: "loki",
		health:200,
		attack:13,
		counterAttack:17,
	};

	var attackingVillian;
	var attackerChosen = false;
	var defendingVillian;
	var defenderChosen = false;
	var currentAttckPwr = 0;
	var attackerHealth = 0;
	var defenderHealth = 0;

	console.log("Document ready");
	alert("Chose your character!", 2000);

	
	//onClick for characters

	$(".villian").on("click", function(){
		if (!attackerChosen) {
			console.log("villian not chosen");
			var chosenOne = $(this).attr("data-name").toString();
			console.log("attacker is " + chosenOne);

			switch (chosenOne) {

				case "loki" :
					attackingVillian = loki;
					break;

				case "saruman" :
					attackingVillian = saruman;
					break;	

				case "vader" :
					attackingVillian = vader;
					break;	

				case "magneto" :
					attackingVillian = magneto;
					break;	

				case "voldy" :
				attackingVillian = voldy;
				break;	
			}

			attackerHealth = attackingVillian.health;
			moveChar(chosenOne);
			attackerChosen = true;
			alert("Chose your oponent", 500);
		}
		else if (attackerChosen && !defenderChosen) {
			console.log("villian chosen, choosing defender");
			var victim = $(this).attr("data-name").toString();
			console.log("Defender is " + victim);

			switch (victim) {

				case "loki" :
					defendingVillian = loki;
					break;

				case "saruman" :
					defendingVillian = saruman;
					break;	

				case "vader" :
					defendingVillian = vader;
					break;	

				case "magneto" :
					defendingVillian = magneto;
					break;	

				case "voldy" :
					defendingVillian = voldy;
					break;	
			}
			defenderHealth = defendingVillian.health;
			moveChar(victim);
			defenderChosen = true;
		}

		else {
			console.log("You've chosen a character and someone to attack, try attacking now.");
		}
	});

	//move attacker or defender to correct area
	function moveChar(charClicked){
		//if chooseing attacker (attacker hasn't been chosen already)
		if (!attackerChosen) {
			$("#" + charClicked).appendTo("#attackerArea");
			$("#" + charClicked).attr("style", "float:left; width:55%;");
			$("#attackerArea").removeClass("invisible");
			console.log("attacker moved");
		}
		//if attacker has been chosen, but defender hasn't
		else if (attackerChosen && !defenderChosen){
			$("#" + charClicked).appendTo("#defenderArea");
			$("#" + charClicked).attr("style", "float:right; width:55%;");
			$("#defenderArea").removeClass("invisible");
			console.log("defender moved");
			$("#attackBtn").removeClass("invisible");
		}
	}

	//onClick for Attack Button

	$("#attackBtn").on("click", function(){
		//set attack power
		currentAttckPwr += attackingVillian.attack;
		console.log("attack power is " + currentAttckPwr);

		//attack defender
		console.log("Attack!");
		defenderHealth -= currentAttckPwr;
		console.log("defender health is " + defenderHealth);

		console.log(defendingVillian.id);
		writeStats(defendingVillian.id, defenderHealth);

		//attack attacker
		console.log("Counter attack!");
		attackerHealth -= defendingVillian.counterAttack;
		console.log("attacker health is " + attackerHealth);

		console.log(attackingVillian.id);
		writeStats(attackingVillian.id, attackerHealth);

		alert(attackingVillian.name + " did " + currentAttckPwr + " damage. " + defendingVillian.name + " did " + defendingVillian.counterAttack + " damage.", 2000);

		defeatCheck();
	});

	function writeStats(villian, stat){
		console.log("writeStats trigered");
		$("#" + villian).find("p").html(stat);
	}

	//Win check 
	function defeatCheck(){
		if (defenderHealth <= 0) {
			$("#defenderArea").find("div").prependTo("#defeatedArea");
			$("#attackBtn").addClass("invisible");
			defenderChosen = false;
			winCheck();
		}
		if (attackerHealth <= 0) {
			alert("You lost! Try again...", 4000);
			reset();
		}
	}

	//Overall win check
	function winCheck(){
		if ($("#choseFrom").find("div").length === 0){
			alert("You win! Get ready to chose another character...", 4000);
			reset();
		}
		else {
			alert($("#defeatedArea").find("img").attr("alt").toString() + " has been defeated! Chose another openent.", 1000);
		}
	}

	//reset
	function reset() {
		console.log("reset");
		attackingVillian = "";
		attackerChosen = false;
		defendingVillian = "";
		defenderChosen = false;
		currentAttckPwr = 0;
		attackerHealth = 0;
		defenderHealth = 0;

		$("#attackBtn").addClass("invisible");

		$(".villian").each(function() {
			$(this).appendTo("#choseFrom");
			$(this).removeAttr("style");
			var name = this.id;
			$(this).find("p").html(name.health);
			console.log(name);
			console.log(typeof name);
			debugger;
			console.log(name.health);
		});
	}

	function alert(alertText, time){
		$("#alertArea").append(alertText);
		$("#alertArea").removeClass("invisible");
		setTimeout( function() {
   			$("#alertArea").addClass("invisible");
   			$("#alertArea").empty();
   		}, time);
	}


});