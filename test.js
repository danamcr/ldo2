module.exports = {
    "name": "Adult White Dragon",
    "size": "H",
    "type": "dragon",
    "source": "MM",
    "alignment": [
        "C",
        "E"
    ],
    "ac": [
        10,
        {
            "ac": 18,
            "from": [
                "natural armor"
            ]
        },
        {
            "ac": 15,
            "condition": "with {@spell mage armor}",
            "braces": true
        }
    ],
    "hp": {
        "average": 200,
        "formula": "16d12 + 96"
    },
    "speed": {
        "walk": 40,
        "burrow": 30,
        "fly": {
            "number": 50,
            "condition": "(hover)"
        },
        "swim": 40
    },
    "str": 22,
    "dex": 10,
    "con": 22,
    "int": 8,
    "wis": 12,
    "cha": 12,
    "save": {
        "dex": "+5",
        "con": "+11",
        "wis": "+6",
        "cha": "+6"
    },
    "skill": {
        "perception": "+11",
        "stealth": "+5"
    },
    "immune": [
        "cold"
    ],
    "senses": "blindsight 60 ft., darkvision 120 ft.",
    "passive": 21,
    "languages": "Common, Draconic",
    "cr": "13",
    "trait": [
        {
            "name": "Ice Walk",
            "entries": [
                "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn't cost it extra moment."
            ]
        },
        {
            "name": "Legendary Resistance (3/Day)",
            "entries": [
                "If the dragon fails a saving throw, it can choose to succeed instead."
            ]
        }
    ],
    "action": [
        {
            "name": "Multiattack",
            "entries": [
                "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
            ]
        },
        {
            "name": "Bite",
            "entries": [
                "{@atk mw} {@hit 11} to hit, reach 10 ft., one target. {@h}17 ({@damage 2d10 + 6}) piercing damage plus 4 ({@damage 1d8}) cold damage."
            ]
        },
        {
            "name": "Claw",
            "entries": [
                "{@atk rw} {@hit 11} to hit, reach 5 ft., one target. {@h}13 ({@damage 2d6 + 6}) slashing damage."
            ]
        },
        {
            "name": "Tail",
            "entries": [
                "{@atk mw,rw} {@hit 11} to hit, reach 15 ft., one target. {@h}15 ({@damage 2d8 + 6}) bludgeoning damage."
            ]
        },
        {
            "name": "Frightful Presence",
            "entries": [
                "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 14 Wisdom saving throw or become {@condition frightened} for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
            ]
        },
        {
            "name": "Cold Breath {@recharge 5}",
            "entries": [
                "The dragon exhales an icy blast in a 60-foot cone. Each creature in that area must make a DC 19 Constitution saving throw, taking 54 ({@damage 12d8}) cold damage on a failed save, or half as much damage on a successful one."
            ]
        }
    ],
    "legendaryGroup": {
        "name": "White Dragon",
        "source": "MM"
    },
    "legendary": [
        {
            "name": "Detect",
            "entries": [
                "The dragon makes a Wisdom ({@skill Perception}) check."
            ]
        },
        {
            "name": "Tail Attack",
            "entries": [
                "The dragon makes a tail attack."
            ]
        },
        {
            "name": "Wing Attack (Costs 2 Actions)",
            "entries": [
                "The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 ({@damage 2d6 + 6}) bludgeoning damage and be knocked {@condition prone}. The dragon can then fly up to half its flying speed."
            ]
        }
    ],
    "page": 101,
    "environment": [
        "arctic"
    ],
    "soundClip": "https://media-waterdeep.cursecdn.com/file-attachments/0/533/white-dragon.mp3",
    "dragonCastingColor": "W",
    "traitTags": [
        "Legendary Resistances"
    ],
    "actionTags": [
        "Multiattack",
        "Frightful Presence"
    ],
    "languageTags": [
        "C",
        "DR"
    ],
    "senseTags": [
        "B",
        "SD"
    ],
    "vulnerable": [
        "fire"
    ],
    "variant": [
        {
            "type": "variant",
            "name": "Yugoloth Summoning",
            "entries": [
                "Some yugoloths have an action option that allows them to summon other yugoloths.",
                {
                    "name": "Summon Yugoloth (1/Day)",
                    "type": "entries",
                    "entries": [
                        "The yugoloth attempts a magical summoning.",
                        "An arcanaloth has a {@chance 40|40 percent|40% summoning chance} chance of summoning one arcanaloth.",
                        "A summoned yugoloth appears in an unoccupied space within 60 feet of its summoner, does as it pleases, and can't summon other yugoloths. The summoned yugoloth remains for 1 minute, until it or its summoner dies, or until its summoner takes a bonus action to dismiss it."
                    ]
                }
            ]
        }
    ],
    "spellcasting": [
        {
            "name": "Innate Spellcasting (Yuan-ti Form Only)",
            "headerEntries": [
                "The yuan-ti's innate spellcasting ability is Charisma (spell save DC 13). The yuan-ti can innately cast the following spells, requiring no material components:"
            ],
            "will": [
                "{@spell animal friendship} (snakes only)"
            ],
            "daily": {
                "3": [
                    "{@spell suggestion}"
                ],
                "1": [
                    "{@spell suggestion more}"
                ]
            },
            "ability": "cha"
        },
        {
            "name": "Spellcasting",
            "headerEntries": [
                "The archmage is an 18th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 17, {@hit 9} to hit with spell attacks). The archmage can cast disguise self and invisibility at will and has the following wizard spells prepared:"
            ],
            "spells": {
                "0": {
                    "spells": [
                        "{@spell fire bolt}",
                        "{@spell light}",
                        "{@spell mage hand}",
                        "{@spell prestidigitation}",
                        "{@spell shocking grasp}"
                    ]
                },
                "1": {
                    "slots": 4,
                    "spells": [
                        "{@spell detect magic}",
                        "{@spell identify}",
                        "{@spell mage armor}*",
                        "{@spell magic missile}"
                    ]
                },
                "2": {
                    "slots": 3,
                    "spells": [
                        "{@spell detect thoughts}",
                        "{@spell mirror image}",
                        "{@spell misty step}"
                    ]
                },
                "3": {
                    "slots": 3,
                    "spells": [
                        "{@spell counterspell}",
                        "{@spell fly}",
                        "{@spell lightning bolt}"
                    ]
                },
                "4": {
                    "slots": 3,
                    "spells": [
                        "{@spell banishment}",
                        "{@spell fire shield}",
                        "{@spell stoneskin}*"
                    ]
                },
                "5": {
                    "slots": 3,
                    "spells": [
                        "{@spell cone of cold}",
                        "{@spell scrying}",
                        "{@spell wall of force}"
                    ]
                },
                "6": {
                    "slots": 1,
                    "spells": [
                        "{@spell globe of invulnerability}"
                    ]
                },
                "7": {
                    "slots": 1,
                    "spells": [
                        "{@spell teleport}"
                    ]
                },
                "8": {
                    "slots": 1,
                    "spells": [
                        "{@spell mind blank}*"
                    ]
                },
                "9": {
                    "slots": 1,
                    "spells": [
                        "{@spell time stop}"
                    ]
                }
            },
            "footerEntries": [
                "*The archmage casts these spells on itself before combat."
            ],
            "ability": "int"
        }
    ],
    "resist": [
        "acid",
        "high voltage",
        {
            "resist": [
                "bludgeoning",
                "piercing",
                "slashing"
            ],
            "note": "from nonmagical attacks"
        },
        {
            "special": "damage from spells"
        },
        {
            "resist": [
                "bludgeoning",
                "piercing",
                "slashing"
            ],
            "note": "(from stoneskin)",
            "preNote": "nonmagical"
        }
    ],
    "reaction": [
        {
            "name": "Unnerving Mask",
            "entries": [
                "When a creature the devil can see starts its turn within 30 feet of the devil, the devil can create the illusion that it looks like one of the creature's departed loved ones or bitter enemies. If the creature can see the devil, it must succeed on a DC 14 Wisdom saving throw or be {@condition frightened} until the end of its turn."
            ]
        }
    ]
}