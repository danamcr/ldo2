module.exports = formatMonster;

const Builder = require("./builder.js");

function formatMonster(monster, legendaryGroup) {
    let builder = new Builder();
    builder.addLine("***");
    builder.addLine(`## ${monster.name}`);
    builder.addLine(`*${Parser.SIZE_ABV_TO_FULL[monster.size]} ${getType(monster)}, ${Parser.alignmentListToFull(monster.alignment).toLowerCase()}*`);
    builder.addLine(createHr());

    builder.addLine("- **Armor Class** " + getArmorClass(monster));
    builder.addLine(`- **Hit Points** ${monster.hp.average} (${monster.hp.formula})`);
    builder.addLine(`- **Speed** ${getSpeed(monster)}`);
    
    builder.addLine(createHr());

    builder.addLine("|STR|DEX|CON|INT|WIS|CHA|");
    builder.addLine("|:---:|:---:|:---:|:---:|:---:|:---:|");
    builder.addLine(`|${monster.str}|${monster.dex}|${monster.con}|${monster.int}|${monster.wis}|${monster.cha}|`);

    builder.addLine(createHr());

    isDefined(monster.saves) ? builder.addLine(`- **Saving Throws** ${getKeyValues(monster.saves)}`) : 0;
    isDefined(monster.skill) ? builder.addLine(`- **Skills** ${getKeyValues(monster.skill)}`) : 0;
    isDefined(monster.vulnerable) ? builder.addLine(`- **Damage Vulnerabilities** ${getTags(monster, x => x.vulnerable)}`) : 0;
    isDefined(monster.resist) ? builder.addLine(`- **Damage Resistances** ${getTags(monster, x => x.resist)}`) : 0;
    isDefined(monster.immune) ? builder.addLine(`- **Damage Immunities** ${getTags(monster, x => x.immune)}`) : 0;
    isDefined(monster.conditionImmune) ? builder.addLine(`- **Condition Immunities** ${getTags(monster, x => x.conditionImmune)}`) : 0;
    builder.addLine(`- **Senses** ${getSenses(monster)}`);
    builder.addLine(`- **Languages** ${monster.languages || "—"}`);
    builder.addLine(`- **Challenge** ${getChallenge(monster)}`);
    builder.addLine("");

    if (isDefined(monster.spellcasting) || isDefined(monster.trait)) {
        builder.addLine("***");
        builder.addLine("");
        isDefined(monster.spellcasting) ? monster.spellcasting.map(format).forEach(x => builder.addLine(x)) : 0;
        isDefined(monster.trait) ? monster.trait.map(format).forEach(x => builder.addLine(x)) : 0;
    }

    if (isDefined(monster.action)) {
        builder.addLine(createHeader("Actions"));
        monster.action.map(format).forEach(x => builder.addLine(x));
    }

    if (isDefined(monster.reaction)) {
        builder.addLine(createHeader("Rections"));
        monster.reaction.map(format).forEach(x => builder.addLine(x));
    }

    if (isDefined(monster.legendary)) {
        builder.addLine(createHeader("Legendary Actions"));
        let name = monster.isNamedCreature ? monster.name : `The ${monster.name}`;
        builder.addLine(`${name} can take 3 legendary actions, choosing from the options below. Only one legendary action can be used at a time and only at the end of another creature's turn. ${name} regains spent legendary actions at the start of its turn.\n`)
        monster.legendary.map(format).forEach(x => builder.addLine(x));
    }

    if (isDefined(legendaryGroup) && isDefined(legendaryGroup.lairActions)) {
        builder.addLine(createHeader("Lair Actions"));
        legendaryGroup.lairActions.map(format).forEach(x => builder.addLine(x));
    }

    if (isDefined(legendaryGroup) && isDefined(legendaryGroup.regionalEffects)) {
        builder.addLine(createHeader("Regional Effects"));
        legendaryGroup.regionalEffects.map(format).forEach(x => builder.addLine(x));
    }

    if (isDefined(monster.variant)) {
        monster.variant.map(format).forEach(x => builder.addLine(x));
    }

    let string = builder.toString();

    // Replace special things
    string = string.replace(/\{@spell\s([^}]+)\}/g, "$1");
    string = string.replace(/\{@hit\s([^}]+)\}/g, (match, capture) => {
        return `${Number(capture) >= 0 ? "+" : ""}${capture}`;
    });
    string = string.replace(/\{@h\}/g, "*Hit:* ");
    string = string.replace(/\{@damage\s([^}]+)\}/g, "$1");
    string = string.replace(/\{@skill\s([^}]+)\}/g, "$1");
    string = string.replace(/\{@condition\s([^}]+)\}/g, "$1");
    string = string.replace(/\{@dice\s([^}]+)\}/g, "$1");
    string = string.replace(/\{@atk\s([^}]+)\}/g, (match, capture) => {
        let attackTypes = {
            "mw": "Melee",
            "rw": "Ranged",
            "mw,rw": "Melee or Ranged"
        };

        return `*${attackTypes[capture]} Weapon Attack:*`;
    });
    string = string.replace(/\{@recharge\}/g, "(Recharge 6)");
    string = string.replace(/\{@recharge\s([^}]+)\}/g, "(Recharge $1-6)");
    string = string.replace(/\{@chance\s([^}|]+)[^}]*\}/g, "$1%");
    string = string.replace(/\{@item\s([^}|]+)[^}]*\}/g, "$1");
    string = string.replace(/\{@i\s([^}]+)[^}]*\}/g, "*$1*");
    string = string.replace(/\{@creature\s([^}|]+)[^}]*\}/g, "$1");
    string = string.replace(/\{@hazard\s([^}]+)[^}]*\}/g, "$1");
    string = string.replace(/\{@note\s([^}]+)[^}]*\}/g, "*$1*");
    string = string.replace(/\{@book\s([^}|]+)[^}]*\}/g, "$1");

    // Make block comment
    string = string.replace(/\n/g, "\n> ");



    return string;
}

function getType(monster) {
    if (typeof monster.type === "string") {
        return monster.type;
    }

    let string = `${monster.type.type}`;

    if (isDefined(monster.type.tags)) {
        let tags = monster.type.tags.map(tag => {
            if (typeof tag === "string") {
                return tag;
            }
            let list = [];
            isDefined(tag.prefix) ? list.push(tag.prefix) : 0;
            list.push(tag.tag);
            return list.join(" ");
        });
        string += ` (${tags.join(", ")})`;
    }

    return string;
}

function getArmorClass(monster) {
    return monster.ac.map(ac => {
        if (!isNaN(ac)) {
            return ac;
        }

        let string = `${ac.ac}`;

        if (isDefined(ac.from)) {
            string += ` (${ac.from})`
        }

        if (isDefined(ac.condition)) {
            string += ` ${ac.condition}`;
        }

        if (ac.braces === true) {
            string = `(${string})`;
        }

        return string;
    }).join(", ");
}

function getSpeed(monster) {
    function calculateSpeed(speed) {
        if (!isNaN(speed)) {
            return `${speed} ft.`;
        }
        let string = `${speed.number} ft.`;
        if (isDefined(speed.condition)) {
            string += `${speed.condition}`;
        }
        return string;
    }
    let list = [];
    isDefined(monster.speed.walk) ? list.push(`${calculateSpeed(monster.speed.walk)}`) : 0;
    isDefined(monster.speed.burrow) ? list.push(`burrow ${calculateSpeed(monster.speed.burrow)}`) : 0;
    isDefined(monster.speed.climb) ? list.push(`climb ${calculateSpeed(monster.speed.climb)}`) : 0;
    isDefined(monster.speed.fly) ? list.push(`fly ${calculateSpeed(monster.speed.fly)}`) : 0;
    isDefined(monster.speed.swim) ? list.push(`swim ${calculateSpeed(monster.speed.swim)}`) : 0;
    return list.join(", ");
}

function getTags(parent, childFunc) {
    return childFunc(parent).map(getTagsRecursive).join(", ");
    function getTagsRecursive(type) {
        if (typeof type === "string") {
            return type;
        }

        let list = [];

        if (isDefined(type.preNote)) {
            list.push(type.preNote);
        }

        if (isDefined(type.special)) {
            list.push(type.special);
        }

        if (isDefined(childFunc(type))) {
            let children = childFunc(type);
            let textChildren = children.filter(x => typeof x === "string").join(", ");
            let objectChildren = children.filter(x => typeof x !== "string").map(x => getTagsRecursive(x)).join("; ");
            list.push([textChildren, objectChildren].filter(x => x.length > 0).join("; "));
        }

        if (isDefined(type.note)) {
            list.push(type.note);
        }

        return list.join(" ");
    };
}

function getKeyValues(dictionary) {
    let keys = Object.keys(dictionary);
    return keys.map(key => `${key} ${dictionary[key]}`).join(", ");
}

function getSenses(monster) {
    let string = "";
    if (monster.senses) {
        string += monster.senses + ", ";
    }
    string += `passive Perception ${monster.passive}`;
    return string;
}

function getChallenge(monster) {
    if (typeof monster.cr === "string") {
        return `${monster.cr} (${Parser.crToXp(monster.cr)} xp)`;
    }

    let list = [];
    isDefined(monster.cr.cr) ? list.push(`${monster.cr.cr} (${Parser.crToXp(monster.cr.cr)} xp)`) : 0;
    isDefined(monster.cr.lair) ? list.push(`${monster.cr.lair} (${Parser.crToXp(monster.cr.cr)} xp) when encountered in lair`) : 0;
    return list.join(" or ");
}

function createHeader(header) {
    return `***\n\n### ${header}`;
}

function createHr() {
    return "\n***\n";
}

function format(value) {
    let list = formatRecursive(value);

    if (typeof list === "string") {
        return list;
    }

    return flattenRecursive(list).join("  \n") + "\n";

    function flattenRecursive(list) {
        return list.reduce((newList, item) => {
            typeof item === "string" ? newList.push(item) : newList.push(...flattenRecursive(item));
            return newList;
        }, []);
    }
}

function formatRecursive(value) {
    if (typeof value === "string") {
        return value;
    }

    let list = [];

    isDefined(value.headerEntries) ? list.push(...value.headerEntries.map(formatRecursive)) : 0;
    isDefined(value.entry) ? list.push(formatRecursive(value.entry)) : 0;
    isDefined(value.entries) ? list.push(...value.entries.map(formatRecursive)) : 0;
    isDefined(value.will) ? list.push(`At will: ${value.will.map(formatRecursive).join(", ")}`) : 0;
    
    if (isDefined(value.daily)) {
        let items = Object.keys(value.daily).map(day => `${day}/day: ${value.daily[day].join(", ")}`);
        list.push(...items);
    }

    if (isDefined(value.spells)) {
        function slotName(key, slot) {
            switch(key) {
                case "0":
                    return "Cantrips (at will)";
                case "1":
                    return `1st level (${slot.slots} slots)`;
                case "2":
                    return `2nd level (${slot.slots} slots)`;
                case "3":
                    return `3rd level (${slot.slots} slots)`;
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    return `${key}th level (${slot.slots} slots)`;
            }
        }
        let items = Object.keys(value.spells).map(key => {
            let slot = value.spells[key];
            return `${slotName(key, slot)}: ${slot.spells.join(", ")}`;
        });
        list.push(...items);
    }

    isDefined(value.footerEntries) ? list.push(...value.footerEntries.map(formatRecursive)) : 0;

    if (value.type === "list") {
        if (value.style === "list-hang-notitle") {
            list.push(...value.items.map(formatRecursive).map(x => x[0]));
        }
        else
        {
            list.push(...value.items.map(formatRecursive).map(x => "- " + x));
        }
    }

    if (value.type === "variant") {
        list[0] = `**Variant: ${value.name}.** ${list[0]}`;
    }
    else if (isDefined(value.name)) {
        list[0] = `**${value.name}.** ${list[0]}`;
    }

    return list;
}

function isDefined(object) {
    return object !== null && object !== undefined;
}