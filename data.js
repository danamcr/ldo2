(async () => {
    const fs = require("fs");
    const http = require("request-promise");
    const baseUrl = "https://5etools.com/data/bestiary/";

    let index = await get(baseUrl + "index.json");
    let meta = await get(baseUrl + "meta.json");
    let monsterLists = await Promise.all(Object.keys(index).map(key => get(baseUrl + index[key])));
    let monsters = flatten(monsterLists.map(x => x.monster));
    let legendaryGroups = toDictionary(meta.legendaryGroup, x => x.name);

    if (!fs.existsSync("./data")) {
        fs.mkdirSync("data");
    }

    fs.writeFileSync("./data/legendaryGroups.json", JSON.stringify(legendaryGroups));
    fs.writeFileSync("./data/monsters.json", JSON.stringify(monsters));

    async function get(url) {
        return JSON.parse(await http.get(url));
    }

    function toDictionary(list, keyFunc) {
        return list.reduce((dictionary, item) => {
            dictionary[keyFunc(item)] = item;
            return dictionary;
        }, {});
    }

    function flatten(list) {
        return Array.prototype.concat.apply([], list);
    }
})();