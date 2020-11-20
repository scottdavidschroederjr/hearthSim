// Global Variables //
let sims = 3000
let resultsArray = [];
let set = "";
let packsToBuy = 0;

let dust = 0;
let packCount = 0;
let roll = 0;
let cost = 0;

let setCommon = 0;
let setRare = 0;
let setEpic = 0;
let setLegendary = 0;

let ownedCommons = 0;
let ownedRares = 0;
let ownedEpics = 0;
let ownedLegendaries = 0;
let ownedDust = 0;

let commonCount = 0;
let rareCount = 0;
let epicCount = 0;
let legendaryCount = 0;

let commonArray = [];
let rareArray = [];
let epicArray = [];
let legendaryArray = [];
let cardPack = [];

let epicPityCounter = 0;
let legendaryPityCounter = 30;


// How Long Until Set Completion? //
function completionSim(selectedSet,ownedCommons = 0,ownedRares = 0, ownedEpics = 0, ownedLegendaries = 0) {
    for (let tests = 0; tests < sims; tests++) {

        packCount = 0;
        set = selectedSet

        commonArray = [];
        rareArray = [];
        epicArray = [];
        legendaryArray = [];

        epicPityCounter = 0;
        legendaryPityCounter = 30;

// Cards Already Owned //
        function alreadyOwned() {
        if (ownedCommons > 0) {
            for (i = 0; i < ownedCommons; i++) {
                commonArray.push(i);
            }
            commonCount = ownedCommons;
        }
        if (ownedRares > 0) {
            for (let i = 0; i < ownedRares; i++) {
                rareArray.push(i);
            }
            rareCount = ownedRares
        }
        if (ownedEpics > 0) {
            for (let i = 0; i < ownedEpics; i++) {
                epicArray.push(i);
            }
            epicCount = ownedEpics;
        }
        if (ownedLegendaries > 0) {
            for (i = 0; i < ownedLegendaries; i++) {
                legendaryArray.push(i);
            }
            legendaryCount = ownedLegendaries;
            legendaryPityCounter = 0;
        }
    }

// Set Selection //
        function setSelection() {
            if (set == "Classic Set") {
                setCommon = 92;
                setRare = 80;
                setEpic = 36;
                setLegendary = 32;
            } else if (set == "Goblins vs Gnomes") {
                setCommon = 40;
                setRare = 37;
                setEpic = 26;
                setLegendary = 20;
            } else if (set == "The Grand Tournament") {
                setCommon = 49;
                setRare = 36;
                setEpic = 27;
                setLegendary = 20;
            } else if (set == "Whispers of the Old Gods") {
                setCommon = 50;
                setRare = 36;
                setEpic = 27;
                setLegendary = 21;
            } else if (set == "Mean Streets of Gadgetzan") {
                setCommon = 49;
                setRare = 36;
                setEpic = 27;
                setLegendary = 20;
            } else if (set == "Journey to UnGoro" || set == "Knights of the Frozen Throne" || set == "Kobolds & Catacombs" || set == "Rastakhan Rumble" || set == "Saviors of Uldum") {
                setCommon = 49;
                setRare = 36;
                setEpic = 27;
                setLegendary = 23;
            } else if (set == "The Witchwood") {
                setCommon = 48;
                setRare = 35;
                setEpic = 25;
                setLegendary = 21;
            } else if (set == "The Boomsday Project") {
                setCommon = 49;
                setRare = 36;
                setEpic = 27;
                setLegendary = 24;
            } else if (set == "Rise of Shadows") {
                setCommon = 49;
                setRare = 37;
                setEpic = 26;
                setLegendary = 24;
            } else if (set == "Descent of Dragons") {
                setCommon = 49;
                setRare = 36;
                setEpic = 27;
                setLegendary = 28;
            } else if (set == "Ashes of Outland" || set == "Scholomance Academy") {
                setCommon = 52;
                setRare = 35;
                setEpic = 23;
                setLegendary = 25;
            } else if (set == "Darkmoon Faire") {
            setCommon = 54;
            setRare = 32;
            setEpic = 24;
            setLegendary = 25;
        }

        }


        setSelection();
        alreadyOwned();
        collectionCheck();
    }

}

// Completion Check //
function collectionCheck() {
    if (commonArray.length === (setCommon * 2) &&
        rareArray.length === (setRare * 2) &&
        epicArray.length === (setEpic * 2) &&
        legendaryArray.length === setLegendary)
    {result()}
    else if ((
        (40 * ((setCommon * 2) - commonArray.length)) +
        (100 * ((setRare * 2) - rareArray.length)) +
        (400 * ((setEpic * 2) - epicArray.length)) +
        (1600 * (setLegendary - legendaryArray.length)))
        <= dust)
    {result()}
    else {
        packCount++;
        selectRarity();
    }

}

// Rarity Selection //
function selectRarity() {
    cardPack = [];
    for (i = 0; cardPack.length < 5; i++) {
     roll = Math.random();
     let legendaryProb = (0.012);
     let epicProb = (0.044);
     let rareProb = (0.229);
     let commonProb = (0.716);

     if (roll <= legendaryProb) {
         cardPack[i] = "Legendary";
         legendaryPityCounter = 0;
     }
     else if (roll > legendaryProb && roll <= legendaryProb + epicProb) {
         cardPack[i] = "Epic";
         epicPityCounter = 0;
     }
     else if (roll > legendaryProb + epicProb && roll <= legendaryProb + epicProb + rareProb) {
         cardPack[i] = "Rare";
     }
     else if (roll > legendaryProb + epicProb + rareProb && roll <= 1) {
         cardPack[i] = "Common"
     }
    }
    // Five Commons Protection & Pity Timer Update //

    if (cardPack[0] === "Common" &&
        cardPack[1] === "Common" &&
        cardPack[2] === "Common" &&
        cardPack[3] === "Common" &&
        cardPack[4] === "Common") {
        cardPack[4] = "Rare";
    }

    if (cardPack[0] != "Legendary" &&
        cardPack[1] != "Legendary" &&
        cardPack[2] != "Legendary" &&
        cardPack[3] != "Legendary" &&
        cardPack[4] != "Legendary") {
        if (legendaryPityCounter == 40) {
            cardPack[0] = "Legendary";
            legendaryPityCounter = 0;
        }
        else {
            legendaryPityCounter++
        }

    }
    if (cardPack[0] != "Epic" &&
        cardPack[1] != "Epic" &&
        cardPack[2] != "Epic" &&
        cardPack[3] != "Epic" &&
        cardPack[4] != "Epic") {
        if (epicPityCounter == 10) {
            cardPack[1] = "Epic";
            epicPityCounter  = 0;
        }
        else {
            epicPityCounter++
        }
    }
    selectCard();


}

// Card Selection //
function selectCard() {
    for (let i=0; i < 5; i++) {
        if (cardPack[i] === "Common") {
            if (commonArray.length === (setCommon * 2)) {
                dust = dust + 5;
            }
            else {
                commonArray.push(commonCount);
                commonCount++;
            }
        }
        else if (cardPack[i] === "Rare") {
            if (rareArray.length === (setRare * 2)) {
                dust = dust + 20;
            }
            else {
                rareArray.push(rareCount);
                rareCount++;
            }
        }
        else if (cardPack[i] === "Epic") {
            if (epicArray.length === (setEpic * 2)) {
                dust = dust + 100;
            }
            else {
                epicArray.push(epicCount);
                epicCount++;
            }
        }
        else if (cardPack[i] === "Legendary") {
            if (legendaryArray.length === setLegendary) {
                dust = dust + 400;
            }
            else {
                legendaryArray.push(legendaryCount);
                legendaryCount++;
            }
        }
    }
    collectionCheck();
}

// Results //
function result() {
    if (resultsArray.length < sims) {
        resultsArray.push(packCount);

        dust = 0;
        packCount = 0;

        commonCount = 0;
        rareCount = 0;
        epicCount = 0;
        legendaryCount = 0;

        commonArray = [];
        rareArray = [];
        epicArray = [];
        legendaryArray = [];

        ownedCommons = 0;
        ownedRares = 0;
        ownedEpics = 0;
        ownedLegendaries = 0;

        epicPityCounter = 0;
        legendaryPityCounter = 30;
    }
    if (resultsArray.length == sims) {
        // cost array stands for [min, avg, max] respectively //
        let simStatsArray = [1000, 0, 0]
        let simCostArray = [0, 0, 0]

        // finds min and max //
        for (let j = 0; j < resultsArray.length; j++) {
            if (resultsArray[j] < simStatsArray[0]) {
                simStatsArray[0] = resultsArray[j]
            }
            if (resultsArray[j] > simStatsArray[2]) {
                simStatsArray[2] = resultsArray[j]
            }
        }
        // find average //
        console.log(resultsArray)
        simStatsArray[1] = Math.round(((resultsArray.reduce(function(a,b){return a+b;}))/resultsArray.length));

        for (let h = 0; h < 3; h++) {
            for (let i = simStatsArray[h]; i > 0;) {
                if (i >= 56) {
                    simCostArray[h] = simCostArray[h] + 69.99
                    i = i - 60
            }
                else if (i >= 38) {
                    simCostArray[h] = simCostArray[h] + 49.99
                    i = i - 40
            }
                else if (i >= 15) {
                    simCostArray[h] = simCostArray[h] + 19.99
                    i = i - 15
            }
                else if (i >= 7) {
                    simCostArray[h] = simCostArray[h] + 9.99
                    i = i - 7
            }
                else if (i >= 2) {
                    simCostArray[h] = simCostArray[h] + 2.99
                    i = i - 2
            }
                else if (i = 1) {
                    simCostArray[h] = simCostArray[h] + 1.50
                    i = i - 1
            }
        }
        }



        document.getElementById("avgResultsOutput").innerHTML=(set + " will take  on average " + simStatsArray[1] + " packs to complete.");
        document.getElementById("avgCostOutput").innerHTML=("Estimated Cost of Completion: $" + simCostArray[1].toFixed(2));
        document.getElementById("minResultsOutput").innerHTML=("Minimum: " + simStatsArray[0] + " packs to complete [$" + simCostArray[0].toFixed(2) + "]");
        document.getElementById("maxResultsOutput").innerHTML=("Maximum: " + simStatsArray[2] + " packs to complete [$" + simCostArray[2].toFixed(2) + "]");




        cost = 0;
        resultsArray = [];
    }
}
