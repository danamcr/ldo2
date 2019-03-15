(async () => {

    require("./utils.js");
    const fs = require("fs");
    const format = require("./formatter.js")
    
    let legendaryGroups = JSON.parse(fs.readFileSync("./data/legendaryGroups.json"));
    let monsters = JSON.parse(fs.readFileSync("./data/monsters.json"));
    monsters = monsters.filter(x => x._copy == null);//.filter(x => x.name === "Adult Oblex");

    if (!fs.existsSync("./bestiary")) {
        fs.mkdirSync("bestiary");
    }

    let lastPercentage = 0;
    for (let i = 0; i < monsters.length; ++i) {
        let monster = monsters[i];
        let legendaryGroup = monster.legendaryGroup ? legendaryGroups[monster.legendaryGroup.name] : null;
        try
        {
            let markdown = format(monster, legendaryGroup);
            if (markdown.indexOf("[object Object]") > -1 || markdown.indexOf("{@") > -1) {
                console.log(monster.name);
            }
            fs.writeFileSync(`./bestiary/${monster.name.replace(/"/g, "")}.md`, markdown);
        }
        catch (error) {
            console.log(`${monster.name} failed: ${error}`);
            throw error;
        }
        let currentPercentage = Math.floor(100 * i / monsters.length);
        if (currentPercentage > lastPercentage) {
            console.log(currentPercentage + "%");
            lastPercentage = currentPercentage;
        }
    }

    let monsterNames = monsters.map(x => x.name.replace(/"/g, ""));
    fs.writeFileSync("./monsters.js", `var monsters = ["${monsterNames.join("\",\"")}"];`);
})();
