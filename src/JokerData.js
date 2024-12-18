// This file contains all of the data for each joker.
// The data is stored in a dictionary, with the key being the joker's name.
// Each joker has a name, description, rarity, and a list of synergies.
// The synergies list contains the names of other jokers that the current joker has synergy with.

// Rarity values: 0 = Common, 1 = Uncommon, 2 = Rare, 3 = Legendary

//Easier to manually add colouring for each description. Considered writing logic to look for certain keywords and apply the color but there's seems to be so many in Balatro that conflicts will definitely arise
const styleMapping = {
  redBox:
    "background-color: #FE5F55; color: white; padding: 1px 2px; border-radius: 3px;",

  red: "color: #ff4d40",
  blue: "color: #0095ff",
  gold: "color: #f5b143",
  lgrey: "color: #ababab",
  orange: "color: #ff9a00",

  spectral: "color: #2e76fd",
  planet: "color: #00a7ca",
  chance: "color: #35bd87",
  tarot: "color: #9e74ce",
  negative: "color: #55a",

  diamond: "color: #f15a27",
  club: "color: #074540",
  heart: "color: #f11b51",
  spade: "color: #242c56",
};

const parseDescription = (text) => {
  return text.replace(
    /\{\{([\w\s().,+:\-%<>|[\]'$#@!*]+)\|(\w+)\}\}/g,
    (match, content, styleKey) => {
      const style = styleMapping[styleKey];
      if (style) {
        return `<span style="${style}">${content}</span>`;
      }
      return content;
    }
  );
};

export const jokerdata = {
  "Lucky Cat": {
    name: "Lucky Cat",
    description: parseDescription(
      "This Joker gains {{X0.25|redBox}} Mult every time a {{Lucky|orange}} card {{successfully|palegreen}} triggers."
    ),
    rarity: 1,
    synergies: [
      "Baseball Card",
      "Cartomancer",
      "Dusk",
      "Hack",
      "Hanging Chad",
      "Oops! All 6s",
      "Sock and Buskin",
    ],
  },
  Seance: {
    name: "Seance",
    description: parseDescription(
      "If {{poker hand|orange}} is a {{Straight Flush|orange}}, create a random {{Spectral|spectral}} card {{(Must have room)|lgrey}}"
    ),
    rarity: 1,
    synergies: [
      "Blueprint",
      "Brainstorm",
      "Crazy Joker",
      "Four Fingers",
      "Juggler",
      "Perkeo",
      "Shortcut",
      "Smeared Joker",
    ],
  },
  "Oops! All 6s": {
    name: "Oops! All 6s",
    description: parseDescription(
      "Doubles all {{listed|orange}} probabilities {{(ex:|lgrey}} {{1 in 3|chance}} {{->|lgrey}} {{2 in 3|chance}}{{)|lgrey}}"
    ),
    rarity: 1,
    synergies: [
      "8 Ball",
      "Bloodstone",
      "Business Card",
      "Glass Joker",
      "Gros Michel",
      "Hallucination",
      "Lucky Cat",
      "Reserved Parking",
      "Space Joker",
    ],
  },
  Canio: {
    name: "Canio",
    description: parseDescription(
      "This Joker gains {{X1|redBox}} Mult when a {{face|orange}} card is destroyed"
    ),
    rarity: 3,
    synergies: [
      "Erosion",
      "Glass Joker",
      "Hologram",
      "Pareidolia",
      "Trading Card",
    ],
  },
  "To Do List": {
    name: "To Do List",
    description: parseDescription(
      "Earn {{$4|gold}} if {{poker hand|orange}} is a {{[Poker Hand]|orange}}, poker hand changes at end of round"
    ),
    rarity: 0,
    synergies: ["Blueprint", "Brainstorm"],
  },
  "Riff-Raff": {
    name: "Riff-Raff",
    description: parseDescription(
      "When {{Blind|orange}} is selected, create {{2|orange}} {{Common|blue}} {{Jokers|orange}} {{(Must have room)|lgrey}}"
    ),
    rarity: 0,
    synergies: ["Abstract Joker", "Ceremonial Dagger", "Campfire"],
  },
  "Reserved Parking": {
    name: "Reserved Parking",
    description: parseDescription(
      "Each {{face|orange}} card held in hand has a {{1 in 2|chance}} chance to give {{$1|gold}}"
    ),
    rarity: 0,
    synergies: [
      "Baron",
      "Mime",
      "Oops! All 6s",
      "Pareidolia",
      "Ride the Bus",
      "Shoot the Moon",
    ],
  },
  "Red Card": {
    name: "Red Card",
    description: parseDescription(
      "This Joker gains {{+3|red}} Mult when any {{Booster Pack|orange}} is skipped"
    ),
    rarity: 0,
    synergies: ["Astronomer", "Business Card", "Hallucination", "Rocket"],
  },
  "Gros Michel": {
    name: "Gros Michel",
    description: parseDescription(
      "{{+15|red}} Mult <br>{{1 in 6|chance}} chance this is destroyed at the end of round."
    ),
    rarity: 0,
    synergies: ["Oops! All 6s"],
  },
  "Midas Mask": {
    name: "Midas Mask",
    description: parseDescription(
      "All played {{face|orange}} cards become {{Gold|orange}} cards when scored"
    ),
    rarity: 1,
    synergies: [
      "Baron",
      "Business Card",
      "Driver's License",
      "Golden Ticket",
      "Mime",
      "Pareidolia",
      "Reserved Parking",
      "Scary Face",
      "Shoot the Moon",
      "Smiley Face",
      "Vampire",
    ],
  },
  Rocket: {
    name: "Rocket",
    description: parseDescription(
      "Earn {{$1|gold}} at end of round. Payout increases by {{$2|gold}} when {{Boss Blind|orange}} is defeated"
    ),
    rarity: 1,
    synergies: ["Bootstraps", "Bull"],
  },
  Hack: {
    name: "Hack",
    description: parseDescription(
      "Retrigger each played {{2|orange}}, {{3|orange}}, {{4|orange}}, or {{5|orange}}"
    ),
    rarity: 1,
    synergies: [
      "Blueprint",
      "Brainstorm",
      "Dusk",
      "Fibonacci",
      "Glass Joker",
      "Hiker",
      "Lucky Cat",
      "Odd Todd",
      "Ride the Bus",
      "Seltzer",
      "Walkie Talkie",
      "Wee Joker",
    ],
  },
  "Marble Joker": {
    name: "Marble Joker",
    description: parseDescription(
      "Adds one {{Stone|orange}} card to the deck when {{Blind|orange}} is selected"
    ),
    rarity: 1,
    synergies: [
      "Driver's License",
      "Half Joker",
      "Hologram",
      "Ride the Bus",
      "Space Joker",
      "Stone Joker",
      "Supernova",
      "Vampire",
    ],
  },
  "Devious Joker": {
    name: "Devious Joker",
    description: parseDescription(
      "{{+100|blue}} Chips if played hand contains a {{Straight|orange}}"
    ),
    rarity: 0,
    synergies: [
      "Crazy Joker",
      "Four Fingers",
      "Runner",
      "Seance",
      "Shortcut",
      "The Order",
    ],
  },
  "The Family": {
    name: "The Family",
    description: parseDescription(
      "{{X4|redBox}} Mult if played hand contains a {{Four of a Kind|orange}}"
    ),
    rarity: 2,
    synergies: ["The Duo", "The Trio", "Zany Joker"],
  },
  "Odd Todd": {
    name: "Odd Todd",
    description: parseDescription(
      "Played cards with {{odd|orange}} rank give +31 Chips when scored {{(A, 9, 7, 5, 3)|lgrey}}"
    ),
    rarity: 0,
    synergies: ["Cloud 9", "Fibonacci", "Hack", "Ride the Bus", "Scholar"],
  },
  "Space Joker": {
    name: "Space Joker",
    description: parseDescription(
      "{{1 in 4|chance}} chance to upgrade level of played {{poker hand|orange}}"
    ),
    rarity: 1,
    synergies: [
      "Blueprint",
      "Brainstorm",
      "Burglar",
      "Burnt Joker",
      "Green Joker",
      "Oops! All 6s",
      "Ramen",
      "Supernova",
    ],
  },
  Satellite: {
    name: "Satellite",
    description: parseDescription(
      "Earn {{$1|gold}} at end of round per unique {{Planet|planet}} card used this run"
    ),
    rarity: 1,
    synergies: ["Astronomer", "Constellation"],
  },
  "Smiley Face": {
    name: "Smiley Face",
    description: parseDescription(
      "Played {{face|orange}} cards give {{+5|red}} Mult when scored"
    ),
    rarity: 0,
    synergies: [
      "Business Card",
      "Midas Mask",
      "Pareidolia",
      "Reserved Parking",
      "Scary Face",
      "Sock and Buskin",
      "Triboulet",
    ],
  },
  "Delayed Gratification": {
    name: "Delayed Gratification",
    description: parseDescription(
      "Earn {{$2|gold}} per {{discard|orange}} if no discards are used by end of the round"
    ),
    rarity: 0,
    synergies: ["Banner", "Drunkard", "Green Joker", "Merry Andy", "Ramen"],
  },
  "Hit the Road": {
    name: "Hit the Road",
    description: parseDescription(
      "This Joker gains {{X0.5|redBox}} Mult for every {{Jack|orange}} discarded this round"
    ),
    rarity: 2,
    synergies: ["Blueprint", "Brainstorm", "Drunkard", "Merry Andy", "Yorick"],
  },
  Madness: {
    name: "Madness",
    description: parseDescription(
      "When {{Small Blind|orange}} or {{Big Blind|orange}} is selected, gain {{X0.5|redBox}} Mult and {{destroy|orange}} a random Joker"
    ),
    rarity: 1,
    synergies: ["Abstract Joker", "Obelisk", "Pareidolia"],
  },
  "Crazy Joker": {
    name: "Crazy Joker",
    description: parseDescription(
      "{{+12|red}} Mult if played hand contains a {{Straight|orange}}"
    ),
    rarity: 0,
    synergies: [
      "Card Sharp",
      "Four Fingers",
      "Runner",
      "Seance",
      "Shortcut",
      "Superposition",
      "Seance",
      "The Order",
    ],
  },
  "Chaos the Clown": {
    name: "Chaos the Clown",
    description: parseDescription(
      "{{1|orange}} free {{Reroll|chance}} per shop"
    ),
    rarity: 0,
    synergies: ["Astronomer", "Campfire", "Constellation", "Flash Card"],
  },
  "Stone Joker": {
    name: "Stone Joker",
    description: parseDescription(
      "Gives {{+25|blue}} Chips for each {{Stone Card|orange}} in your full deck"
    ),
    rarity: 1,
    synergies: ["Cartomancer", "DNA", "Half Joker", "Marble Joker"],
  },
  Cavendish: {
    name: "Cavendish",
    description: parseDescription(
      "{{X3|redBox}} Mult <br>{{1 in 1000|chance}} chance this card is destroyed at the end of round"
    ),
    rarity: 0,
    synergies: ["Blueprint", "Brainstorm", "Flash Card"],
  },
  Cartomancer: {
    name: "Cartomancer",
    description: parseDescription(
      "Create a {{Tarot|tarot}} card when {{Blind|orange}} is selected"
    ),
    rarity: 1,
    synergies: ["Fortune Teller", "Gift Card", "Perkeo"],
  },
  "Flower Pot": {
    name: "Flower Pot",
    description: parseDescription(
      "{{X3|redBox}} Mult if poker hand contains a {{Diamond|diamond}} card, {{Club|club}} card, {{Heart|heart}} card, and {{Spade|spade}} card"
    ),
    rarity: 1,
    synergies: ["Seeing Double", "Smeared Joker", "Splash"],
  },
  "Wee Joker": {
    name: "Wee Joker",
    description: parseDescription(
      "This Joker gains {{+8|blue}} Chips when each played {{2|orange}} is scored"
    ),
    rarity: 2,
    synergies: ["Even Steven", "Fibonacci", "Hack", "Hanging Chad"],
  },
  "Flash Card": {
    name: "Flash Card",
    description: parseDescription(
      "This Joker gains {{+2|red}} Mult per {{reroll|orange}} in the shop"
    ),
    rarity: 1,
    synergies: ["Chaos the Clown", "Constellation", "Golden Joker", "Rocket"],
  },
  "8 Ball": {
    name: "8 Ball",
    description: parseDescription(
      "{{1 in 4|chance}} chance for each played {{8|orange}} to create a {{Tarot|tarot}} card when scored {{(Must have room)|lgrey}}"
    ),
    rarity: 0,
    synergies: [
      "Blueprint",
      "Brainstorm",
      "DNA",
      "Fortune Teller",
      "Oops! All 6s",
      "Perkeo",
    ],
  },
  Showman: {
    name: "Showman",
    description: parseDescription(
      "{{Joker|orange}}, {{Tarot|tarot}}, {{Planet|planet}}, and {{Spectral|spectral}} cards may appear multiple times"
    ),
    rarity: 1,
    synergies: ["Gift Card"],
  },
  Baron: {
    name: "Baron",
    description: parseDescription(
      "Each {{King|orange}} held in hand gives {{X1.5|redBox}} Mult"
    ),
    rarity: 2,
    synergies: [
      "Juggler",
      "Midas Mask",
      "Mime",
      "Raised Fist",
      "Shoot the Moon",
      "Smiley Face",
      "Troubadour",
    ],
  },
  Throwback: {
    name: "Throwback",
    description: parseDescription(
      "{{X0.25|redBox}} Mult for each {{Blind|orange}} skipped this run"
    ),
    rarity: 1,
    synergies: ["Ice Cream", "Turtle Bean"],
  },
  "Golden Joker": {
    name: "Golden Joker",
    description: parseDescription("Earn {{$4|gold}} at end of round"),
    rarity: 0,
    synergies: ["Bull", "Credit Card", "Flash Card", "Ramen", "To the Moon"],
  },
  "Onyx Agate": {
    name: "Onyx Agate",
    description: parseDescription(
      "Played cards with {{Club|club}} suit give {{+7|red}} Mult when scored"
    ),
    rarity: 1,
    synergies: [
      "Arrowhead",
      "Blackboard",
      "Droll Joker",
      "Gluttonous Joker",
      "Smeared Joker",
    ],
  },
  "Jolly Joker": {
    name: "Jolly Joker",
    description: parseDescription(
      "{{+8|red}} Mult if played hand contains a {{Pair|orange}}"
    ),
    rarity: 0,
    synergies: [
      "Half Joker",
      "Mad Joker",
      "Spare Trousers",
      "Stuntman",
      "The Duo",
      "Zany Joker",
    ],
  },
  Brainstorm: {
    name: "Brainstorm",
    description: parseDescription(
      "Copies the ability of leftmost {{Joker|orange}}"
    ),
    rarity: 2,
    synergies: [
      "8 Ball",
      "Baseball Card",
      "Blueprint",
      "Burglar",
      "Burnt Joker",
      "Cartomancer",
      "Cavendish",
      "Ceremonial Dagger",
      "Certificate",
      "DNA",
      "Egg",
      "Faceless Joker",
      "Hack",
      "Hit the Road",
      "Loyalty Card",
      "Mime",
      "Perkeo",
      "Seance",
      "Space Joker",
      "Stuntman",
    ],
  },
  Astronomer: {
    name: "Astronomer",
    description: parseDescription(
      "All {{Planet|planet}} cards and {{Celestial Packs|planet}} in the shop are {{free|orange}}"
    ),
    rarity: 1,
    synergies: [
      "Campfire",
      "Cartomancer",
      "Chaos the Clown",
      "Constellation",
      "Red Card",
      "Satellite",
    ],
  },
  Mime: {
    name: "Mime",
    description: parseDescription(
      "Retrigger all card {{held in hand|orange}} abilities"
    ),
    rarity: 1,
    synergies: [
      "Baron",
      "Blueprint",
      "Brainstorm",
      "Half Joker",
      "Juggler",
      "Raised Fist",
      "Reserved Parking",
      "Shoot the Moon",
      "Steel Joker",
      "Stuntman",
      "Troubadour",
    ],
  },
  "Card Sharp": {
    name: "Card Sharp",
    description: parseDescription(
      "{{X3|redBox}} Mult if played {{poker hand|orange}} has already been played this round"
    ),
    rarity: 1,
    synergies: ["Burglar", "Drunkard", "Green Joker", "Supernova"],
  },
  "Fortune Teller": {
    name: "Fortune Teller",
    description: parseDescription(
      "{{+1|red}} Mult per {{Tarot|tarot}} card used this run"
    ),
    rarity: 0,
    synergies: [
      "8 Ball",
      "Cartomancer",
      "Hallucination",
      "Perkeo",
      "Superposition",
      "Vagabond",
      "Vampire",
    ],
  },
  Bull: {
    name: "Bull",
    description: parseDescription(
      "{{+2|blue}} Chips for each {{$1|gold}} you have"
    ),
    rarity: 1,
    synergies: ["Bootstraps", "Golden Joker", "Matador", "Rocket"],
  },
  Stuntman: {
    name: "Stuntman",
    description: parseDescription(
      "{{+250|blue}} Chips <br>{{-2|orange}} hand size"
    ),
    rarity: 2,
    synergies: [
      "Blackboard",
      "Blueprint",
      "Brainstorm",
      "Half Joker",
      "Jolly Joker",
      "Juggler",
      "Troubadour",
      "Turtle Bean",
    ],
  },
  Runner: {
    name: "Runner",
    description: parseDescription(
      "Gains {{+15|blue}} Chips if played hand contains a {{Straight|orange}}"
    ),
    rarity: 0,
    synergies: ["Crazy Joker", "Four Fingers", "Odd Todd", "Shortcut"],
  },
  "Spare Trousers": {
    name: "Spare Trousers",
    description: parseDescription(
      "This Joker gains {{+2|red}} Mult if played hand contains a {{Two Pair|orange}}"
    ),
    rarity: 1,
    synergies: [
      "Burglar",
      "Card Sharp",
      "Mad Joker",
      "Space Joker",
      "Square Joker",
      "Supernova",
    ],
  },
  "Loyalty Card": {
    name: "Loyalty Card",
    description: parseDescription(
      "{{X4|redBox}} Mult every {{6|orange}} hands played"
    ),
    rarity: 1,
    synergies: ["Acrobat", "Blueprint", "Brainstorm", "Burglar"],
  },
  "Hanging Chad": {
    name: "Hanging Chad",
    description: parseDescription(
      "Retrigger {{first|orange}} played card used in scoring {{2|orange}} additional times"
    ),
    rarity: 0,
    synergies: [
      "Bloodstone",
      "Lucky Cat",
      "Oops! All 6s",
      "Photograph",
      "Scary Face",
      "Scholar",
      "Walkie Talkie",
      "Wee Joker",
    ],
  },
  "Smeared Joker": {
    name: "Smeared Joker",
    description: parseDescription(
      "{{Hearts|heart}} and {{Diamonds|diamond}} count as the same suit <br>{{Spades|spade}} and {{Clubs|club}} count as the same suit"
    ),
    rarity: 1,
    synergies: [
      "Ancient Joker",
      "Arrowhead",
      "Bloodstone",
      "Castle",
      "Delayed Gratification",
      "Droll Joker",
      "Flower Pot",
      "Gluttonous Joker",
      "Greedy Joker",
      "Lusty Joker",
      "Onyx Agate",
      "Rough Gem",
      "Seance",
      "Seeing Double",
      "The Tribe",
      "Troubadour",
      "Wrathful Joker",
    ],
  },
  "Sixth Sense": {
    name: "Sixth Sense",
    description: parseDescription(
      "If {{first hand|orange}} of round is a single {{6|orange}}, destroy it and create a {{Spectral|spectral}} card"
    ),
    rarity: 1,
    synergies: ["DNA", "Perkeo"],
  },
  "Mad Joker": {
    name: "Mad Joker",
    description: parseDescription(
      "{{+10|red}} Mult if played hand contains a {{Two Pair|orange}}"
    ),
    rarity: 0,
    synergies: ["Jolly Joker", "Spare Trousers", "Square Joker"],
  },
  Bloodstone: {
    name: "Bloodstone",
    description: parseDescription(
      "{{1 in 2|chance}} chance for played cards with {{Heart|heart}} suit to give {{X1.5|redBox}} Mult when scored"
    ),
    rarity: 1,
    synergies: [
      "Droll Joker",
      "Hack",
      "Hanging Chad",
      "Lusty Joker",
      "Oops! All 6s",
      "Seance",
      "Smeared Joker",
      "Sock and Buskin",
      "Triboulet",
    ],
  },
  "Trading Card": {
    name: "Trading Card",
    description: parseDescription(
      "If first {{discard|orange}} of round has only {{1|orange}} card, destroy it and earn {{$3|orange}}"
    ),
    rarity: 1,
    synergies: ["Canio", "Drunkard", "Erosion", "Glass Joker", "Merry Andy"],
  },
  Pareidolia: {
    name: "Pareidolia",
    description: parseDescription(
      "All cards are considered {{face|orange}} cards	"
    ),
    rarity: 1,
    synergies: [
      "Business Card",
      "Canio",
      "Faceless Joker",
      "Luchador",
      "Midas Mask",
      "Photograph",
      "Reserved Parking",
      "Scary Face",
      "Smiley Face",
      "Sock and Buskin",
    ],
  },
  "The Tribe": {
    name: "The Tribe",
    description: parseDescription(
      "{{X2|redBox}} Mult if played hand contains a {{Flush|orange}}"
    ),
    rarity: 2,
    synergies: ["Droll Joker", "Four Fingers", "Smeared Joker", "Troubadour"],
  },
  "Blue Joker": {
    name: "Blue Joker",
    description: parseDescription(
      "{{+2|blue}} Chips for each remaining card in {{deck|orange}}"
    ),
    rarity: 0,
    synergies: ["DNA", "Green Joker", "Half Joker", "Ramen"],
  },
  Chicot: {
    name: "Chicot",
    description: parseDescription(
      "Disables effect of every {{Boss Blind|orange}}"
    ),
    rarity: 3,
    synergies: ["Pareidolia"],
  },
  "Burnt Joker": {
    name: "Burnt Joker",
    description: parseDescription(
      "Upgrade the level of the first {{discarded|orange}} poker hand each round"
    ),
    rarity: 2,
    synergies: [
      "Blueprint",
      "Brainstorm",
      "Drunkard",
      "Four Fingers",
      "Shortcut",
      "Smeared Joker",
      "Supernova",
      "Wee Joker",
      "Yorick",
    ],
  },
  Blueprint: {
    name: "Blueprint",
    description: parseDescription(
      "Copies ability of {{Joker|orange}} to the right"
    ),
    rarity: 2,
    synergies: [
      "8 Ball",
      "Acrobat",
      "Ancient Joker",
      "Baseball Card",
      "Blueprint",
      "Brainstorm",
      "Burglar",
      "Burnt Joker",
      "Business Card",
      "Cartomancer",
      "Cavendish",
      "Ceremonial Dagger",
      "Certificate",
      "DNA",
      "Egg",
      "Faceless Joker",
      "Hack",
      "Hit the Road",
      "Loyalty Card",
      "Luchador",
      "Mime",
      "Mr. Bones",
      "Perkeo",
      "Seance",
      "Space Joker",
      "Stone Joker",
      "Stuntman",
      "To Do List",
    ],
  },
  Dusk: {
    name: "Dusk",
    description: parseDescription(
      "Retrigger all played cards in {{final hand|orange}} of the round"
    ),
    rarity: 1,
    synergies: ["Hack", "Lucky Cat", "Photograph", "The Idol", "Walkie Talkie"],
  },
  "The Idol": {
    name: "The Idol",
    description: parseDescription(
      "Each played {{[rank]|orange}} of {{[suit]|orange}} gives {{X2|redBox}} Mult when scored <br>{{Card changes every round|lgrey}}"
    ),
    rarity: 1,
    synergies: ["Dusk", "Hack", "Lusty Joker", "Splash"],
  },
  Joker: {
    name: "Joker",
    description: parseDescription("{{+4|red}} Mult"),
    rarity: 0,
    synergies: [],
  },
  "Greedy Joker": {
    name: "Greedy Joker",
    description: parseDescription(
      "Played cards with {{Diamond|diamond}} suit give {{+3|red}} Mult when scored"
    ),
    rarity: 0,
    synergies: [
      "Droll Joker",
      "Hack",
      "Rough Gem",
      "Smeared Joker",
      "Sock and Buskin",
      "Splash",
      "Superposition",
      "The Family",
      "The Tribe",
    ],
  },
  "Steel Joker": {
    name: "Steel Joker",
    description: parseDescription(
      "Gives {{X0.2|redBox}} Mult for each {{Steel Card|orange}} in your full deck"
    ),
    rarity: 1,
    synergies: [
      "Burnt Joker",
      "Cartomancer",
      "DNA",
      "Even Steven",
      "Fibonacci",
      "Glass Joker",
      "Gluttonous Joker",
      "Golden Ticket",
      "Greedy Joker",
      "Half Joker",
      "Joker",
      "Lucky Cat",
      "Lusty Joker",
      "Mime",
      "Onyx Agate",
      "Red Card",
      "Scholar",
      "Smiley Face",
      "Stone Joker",
      "Walkie Talkie",
      "Wrathful Joker",
    ],
  },
  Matador: {
    name: "Matador",
    description: parseDescription(
      "Earn {{$8|gold}} if played hand triggers the {{Boss Blind|orange}} ability"
    ),
    rarity: 0,
    synergies: [
      "Bootstraps",
      "Bull",
      "Burglar",
      "Flash Card",
      "Green Joker",
      "Red Card",
      "To the Moon",
    ],
  },
  "To the Moon": {
    name: "To the Moon",
    description: parseDescription(
      "Earn an extra {{$1|gold}} of {{interest|orange}} for every {{$5|gold}} you have at end of round"
    ),
    rarity: 1,
    synergies: ["Baseball Card", "Bootstraps", "Golden Joker", "Matador"],
  },
  "Seeing Double": {
    name: "Seeing Double",
    description: parseDescription(
      "{{X2|redBox}} Mult if played hand has a scoring Club suit icon Club card and a scoring card of any other {{suit|orange}}"
    ),
    rarity: 1,
    synergies: ["Flower Pot", "Smeared Joker", "Splash", "Walkie Talkie"],
  },
  Shortcut: {
    name: "Shortcut",
    description: parseDescription(
      "Allows {{Straights|orange}} to be made with gaps of {{1 rank|orange}} {{(ex:|lgrey}} {{10 8 6 5 3|orange}}{{)|lgrey}}"
    ),
    rarity: 1,
    synergies: [
      "Baseball Card",
      "Blackboard",
      "Burnt Joker",
      "Crazy Joker",
      "Delayed Gratification",
      "Four Fingers",
      "Odd Todd",
      "Runner",
      "Seance",
      "Superposition",
      "The Order",
      "Walkie Talkie",
    ],
  },
  Triboulet: {
    name: "Triboulet",
    description: parseDescription(
      "Played {{Kings|orange}} and {{Queens|orange}} each give {{X2|redBox}} Mult when scored"
    ),
    rarity: 3,
    synergies: [
      "Bloodstone",
      "Business Card",
      "Canio",
      "Chicot",
      "Onyx Agate",
      "Perkeo",
      "Photograph",
      "Smiley Face",
      "Sock and Buskin",
      "Yorick",
    ],
  },
  "Clever Joker": {
    name: "Clever Joker",
    description: parseDescription(
      "{{+80|blue}} Chips if played hand contains a {{Two Pair|orange}}"
    ),
    rarity: 0,
    synergies: [
      "Jolly Joker",
      "Mad Joker",
      "Spare Trousers",
      "Square Joker",
      "Walkie Talkie",
    ],
  },
  Fibonacci: {
    name: "Fibonacci",
    description: parseDescription(
      "Each played {{Ace|orange}}, {{2|orange}}, {{3|orange}}, {{5|orange}}, or {{8|orange}} gives {{+8|red}} Mult when scored"
    ),
    rarity: 1,
    synergies: [
      "Certificate",
      "Hack",
      "Odd Todd",
      "Seance",
      "Scholar",
      "Steel Joker",
      "Wee Joker",
    ],
  },
  Troubadour: {
    name: "Troubadour",
    description: parseDescription(
      "{{+2|orange}} hand size, <br>{{-1|red}} hand per round"
    ),
    rarity: 1,
    synergies: [
      "Baron",
      "Half Joker",
      "Juggler",
      "Mime",
      "Seance",
      "Smeared Joker",
      "Stuntman",
      "The Tribe",
      "Turtle Bean",
    ],
  },
  "Sly Joker": {
    name: "Sly Joker",
    description: parseDescription(
      "{{+50|blue}} Chips if played hand contains a {{Pair|orange}}"
    ),
    rarity: 0,
    synergies: [
      "Half Joker",
      "Jolly Joker",
      "Mad Joker",
      "The Duo",
      "Walkie Talkie",
    ],
  },
  Swashbuckler: {
    name: "Swashbuckler",
    description: parseDescription(
      "Adds the sell value of all other owned {{Jokers|orange}} to Mult"
    ),
    rarity: 0,
    synergies: ["Egg", "Gift Card"],
  },
  Constellation: {
    name: "Constellation",
    description: parseDescription(
      "This Joker gains {{X0.1|redBox}} Mult every time a {{Planet|planet}} card is used"
    ),
    rarity: 1,
    synergies: [
      "Ancient Joker",
      "Astronomer",
      "Certificate",
      "Chaos the Clown",
      "Flash Card",
      "Obelisk",
      "Perkeo",
      "Red Card",
      "Satellite",
    ],
  },
  Egg: {
    name: "Egg",
    description: parseDescription(
      "Gains {{$3|gold}} of {{sell value|orange}} at end of round"
    ),
    rarity: 0,
    synergies: ["Blueprint", "Brainstorm", "Ceremonial Dagger", "Swashbuckler"],
  },
  Ramen: {
    name: "Ramen",
    description: parseDescription(
      "{{X2|redBox}} Mult, <br>loses {{X0.01|redBox}} Mult per {{card|orange}} discarded"
    ),
    rarity: 1,
    synergies: [
      "Abstract Joker",
      "Astronomer",
      "Banner",
      "Blue Joker",
      "Burglar",
      "Castle",
      "Delayed Gratification",
      "Golden Joker",
      "Green Joker",
      "Half Joker",
      "Popcorn",
      "Scholar",
      "Space Joker",
      "Turtle Bean",
      "Walkie Talkie",
    ],
  },
  Blackboard: {
    name: "Blackboard",
    description: parseDescription(
      "{{X3|redBox}} Mult if all cards held in hand are {{Spades|spade}} or {{Clubs|club}}"
    ),
    rarity: 1,
    synergies: [
      "Baseball Card",
      "Four Fingers",
      "Onyx Agate",
      "Shortcut",
      "Stuntman",
    ],
  },
  "Gluttonous Joker": {
    name: "Gluttonous Joker",
    description: parseDescription(
      "Played cards with {{Club|club}} suit give {{+3|red}} Mult when scored"
    ),
    rarity: 0,
    synergies: [
      "Ancient Joker",
      "Castle",
      "Droll Joker",
      "Greedy Joker",
      "Lusty Joker",
      "Onyx Agate",
      "Smeared Joker",
      "Steel Joker",
      "The Idol",
      "The Tribe",
      "Wrathful Joker",
    ],
  },
  DNA: {
    name: "DNA",
    description: parseDescription(
      "If {{first hand|orange}} of round has only {{1|orange}} card, add a permanent copy to deck and draw it to {{hand|orange}}"
    ),
    rarity: 2,
    synergies: [
      "8 Ball",
      "Ancient Joker",
      "Baron",
      "Blue Joker",
      "Blueprint",
      "Brainstorm",
      "Certificate",
      "Cloud 9",
      "Driver's License",
      "Glass Joker",
      "Hack",
      "Hit the Road",
      "Hologram",
      "Odd Todd",
      "Seance",
      "Scholar",
      "Shoot the Moon",
      "Sixth Sense",
      "Steel Joker",
      "Stone Joker",
      "The Idol",
      "Vampire",
      "Wee Joker",
    ],
  },
  "Golden Ticket": {
    name: "Golden Ticket",
    description: parseDescription(
      "Played {{Gold|gold}} cards earn {{$4|gold}} when scored"
    ),
    rarity: 0,
    synergies: [
      "Cartomancer",
      "Lucky Cat",
      "Midas Mask",
      "Pareidolia",
      "Sock and Buskin",
      "Steel Joker",
      "Stone Joker",
    ],
  },
  "Diet Cola": {
    name: "Diet Cola",
    description: parseDescription(
      "Sell this card to create a free {{Double Tag|orange}}"
    ),
    rarity: 1,
    synergies: ["Luchador"],
  },
  Vagabond: {
    name: "Vagabond",
    description: parseDescription(
      "Create a {{Tarot|tarot}} card if hand is played with {{$4|gold}} or less"
    ),
    rarity: 2,
    synergies: [
      "Burglar",
      "Credit Card",
      "Fortune Teller",
      "Green Joker",
      "Hack",
      "Perkeo",
      "The Idol",
    ],
  },
  Vampire: {
    name: "Vampire",
    description: parseDescription(
      "This Joker gains {{X0.1|redBox}} Mult per scoring {{Enhanced card|orange}} played, removes card {{Enhancement|orange}}"
    ),
    rarity: 1,
    synergies: [
      "Certificate",
      "DNA",
      "Fortune Teller",
      "Green Joker",
      "Marble Joker",
      "Midas Mask",
      "Pareidolia",
      "Red Card",
      "Seance",
    ],
  },
  Acrobat: {
    name: "Acrobat",
    description: parseDescription(
      "{{X3|redBox}} Mult on {{final hand|orange}} of round"
    ),
    rarity: 1,
    synergies: ["Ancient Joker", "Blueprint", "Green Joker", "Loyalty Card"],
  },
  "Credit Card": {
    name: "Credit Card",
    description: parseDescription("Go up to {{-$20|red}} in debt"),
    rarity: 0,
    synergies: [
      "Credit Card",
      "Golden Joker",
      "Joker",
      "Seance",
      "Sixth Sense",
      "Vagabond",
    ],
  },
  "Business Card": {
    name: "Business Card",
    description: parseDescription(
      "Played {{face|orange}} cards have a {{1 in 2|chance}} chance to give {{$2|gold}} when scored"
    ),
    rarity: 0,
    synergies: [
      "Bloodstone",
      "Blueprint",
      "Canio",
      "Midas Mask",
      "Oops! All 6s",
      "Pareidolia",
      "Red Card",
      "Reserved Parking",
      "Ride the Bus",
      "Scary Face",
      "Seltzer",
      "Smiley Face",
      "Sock and Buskin",
      "Splash",
      "Triboulet",
    ],
  },
  "The Order": {
    name: "The Order",
    description: parseDescription(
      "{{X3|redBox}} Mult if played hand contains a {{Straight|orange}}"
    ),
    rarity: 2,
    synergies: [
      "Crazy Joker",
      "Flower Pot",
      "Shortcut",
      "Walkie Talkie",
      "Four Fingers",
    ],
  },
  Popcorn: {
    name: "Popcorn",
    description: parseDescription(
      "{{+20|red}} Mult <br>{{-4|red}} Mult per round played"
    ),
    rarity: 0,
    synergies: ["Ice Cream", "Pareidolia", "Ramen", "Turtle Bean"],
  },
  "Cloud 9": {
    name: "Cloud 9",
    description: parseDescription(
      "Earn {{$1|gold}} for each {{9|orange}} in your {{full deck|orange}} at end of round"
    ),
    rarity: 1,
    synergies: [
      "Baseball Card",
      "Bootstraps",
      "Bull",
      "Cartomancer",
      "DNA",
      "Flash Card",
      "Fortune Teller",
      "Hologram",
      "Odd Todd",
      "Perkeo",
      "The Family",
      "The Trio",
    ],
  },
  "Green Joker": {
    name: "Green Joker",
    description: parseDescription(
      "{{+1|red}} Mult per hand played <br>{{-1|red}} Mult per discard"
    ),
    rarity: 0,
    synergies: [
      "Acrobat",
      "Banner",
      "Blue Joker",
      "Burglar",
      "Card Sharp",
      "Cartomancer",
      "Delayed Gratification",
      "Half Joker",
      "Hologram",
      "Jolly Joker",
      "Matador",
      "Ramen",
      "Space Joker",
      "Splash",
      "Square Joker",
      "Stuntman",
      "Supernova",
      "Vagabond",
      "Vampire",
    ],
  },
  "Crafty Joker": {
    name: "Crafty Joker",
    description: parseDescription(
      "{{+80|blue}} Chips if played hand contains a {{Flush|orange}}"
    ),
    rarity: 0,
    synergies: [
      "Droll Joker",
      "Gluttonous Joker",
      "Greedy Joker",
      "Lusty Joker",
      "Smeared Joker",
      "The Tribe",
    ],
  },
  "Mr. Bones": {
    name: "Mr. Bones",
    description: parseDescription(
      "Prevents Death if chips scored are at least {{25%|orange}} of required chips <br>{{self destructs|red}}"
    ),
    rarity: 1,
    synergies: ["Blueprint", "Brainstorm", "Pareidolia", "Showman"],
  },
  "Ceremonial Dagger": {
    name: "Ceremonial Dagger",
    description: parseDescription(
      "When {{Blind|orange}} is selected, destroy Joker to the right and permanently add {{double|orange}} its sell value to this {{Mult|red}}"
    ),
    rarity: 1,
    synergies: [
      "Abstract Joker",
      "Blueprint",
      "Brainstorm",
      "Egg",
      "Gift Card",
      "Pareidolia",
    ],
  },
  "Sock and Buskin": {
    name: "Sock and Buskin",
    description: parseDescription("Retrigger all played {{face|orange}} cards"),
    rarity: 1,
    synergies: [
      "Ancient Joker",
      "Bloodstone",
      "Business Card",
      "Golden Ticket",
      "Greedy Joker",
      "Lucky Cat",
      "Oops! All 6s",
      "Pareidolia",
      "Photograph",
      "Scary Face",
      "Smiley Face",
      "The Idol",
      "Triboulet",
      "Walkie Talkie",
    ],
  },
  "Four Fingers": {
    name: "Four Fingers",
    description: parseDescription(
      "All {{Flushes|orange}} and {{Straights|orange}} can be made with {{4|orange}} cards"
    ),
    rarity: 1,
    synergies: [
      "Blackboard",
      "Burnt Joker",
      "Crazy Joker",
      "Delayed Gratification",
      "Droll Joker",
      "Four Fingers",
      "Marble Joker",
      "Runner",
      "Seance",
      "Shortcut",
      "Square Joker",
      "Superposition",
      "The Tribe",
    ],
  },
  "Merry Andy": {
    name: "Merry Andy",
    description: parseDescription(
      "{{+3|red}} discards each round, <br>{{-1|red}} hand size"
    ),
    rarity: 1,
    synergies: [
      "Banner",
      "Castle",
      "Delayed Gratification",
      "Faceless Joker",
      "Hit the Road",
      "Juggler",
      "Mime",
      "Seance",
      "Trading Card",
      "Wee Joker",
      "Yorick",
    ],
  },
  "Invisible Joker": {
    name: "Invisible Joker",
    description: parseDescription(
      "After 2 rounds, sell this card to {{duplicate|orange}} a random Joker"
    ),
    rarity: 2,
    synergies: ["Luchador", "Showman"],
  },
  "Mystic Summit": {
    name: "Mystic Summit",
    description: parseDescription(
      "{{+15|red}} Mult when {{0|orange}} discards remaining"
    ),
    rarity: 0,
    synergies: ["Burglar", "Jolly Joker", "Yorick"],
  },
  "Ancient Joker": {
    name: "Ancient Joker",
    description: parseDescription(
      "Each played card with {{[suit]|orange}} gives {{X1.5|redBox}} Mult when scored, <br>{{suit changes at end of round|lgrey}}"
    ),
    rarity: 2,
    synergies: [
      "Acrobat",
      "Blueprint",
      "Brainstorm",
      "Burnt Joker",
      "Castle",
      "Cavendish",
      "Constellation",
      "DNA",
      "Dusk",
      "Even Steven",
      "Gluttonous Joker",
      "Greedy Joker",
      "Hack",
      "Hologram",
      "Lusty Joker",
      "Photograph",
      "Scholar",
      "Seltzer",
      "Smeared Joker",
      "Sock and Buskin",
      "Space Joker",
      "The Tribe",
      "Walkie Talkie",
      "Wee Joker",
    ],
  },
  Burglar: {
    name: "Burglar",
    description: parseDescription(
      "When {{Blind|orange}} is selected, gain {{+3|orange}} Hands and {{lose all discards|orange}}"
    ),
    rarity: 1,
    synergies: [
      "Blueprint",
      "Brainstorm",
      "Card Sharp",
      "Cartomancer",
      "Castle",
      "Green Joker",
      "Jolly Joker",
      "Loyalty Card",
      "Marble Joker",
      "Matador",
      "Mystic Summit",
      "Ramen",
      "Ride the Bus",
      "Space Joker",
      "Spare Trousers",
      "Splash",
      "Square Joker",
      "Supernova",
      "Vagabond",
    ],
  },
  "Zany Joker": {
    name: "Zany Joker",
    description: parseDescription(
      "{{+12|red}} Mult if played hand contains a {{Three of a Kind|orange}}"
    ),
    rarity: 0,
    synergies: [
      "Crazy Joker",
      "Droll Joker",
      "Jolly Joker",
      "Mad Joker",
      "The Trio",
      "Walkie Talkie",
    ],
  },
  Campfire: {
    name: "Campfire",
    description: parseDescription(
      "This Joker gains {{X0.25|redBox}} Mult for each card {{sold|orange}}, resets when {{Boss Blind|orange}} is defeated"
    ),
    rarity: 2,
    synergies: [
      "Astronomer",
      "Cartomancer",
      "Chaos the Clown",
      "Flash Card",
      "Luchador",
      "Perkeo",
      "Red Card",
    ],
  },
  Scholar: {
    name: "Scholar",
    description: parseDescription(
      "Played {{Aces|orange}} give {{+20|blue}} Chips and {{+4|red}} Mult when scored"
    ),
    rarity: 0,
    synergies: [
      "Ancient Joker",
      "Certificate",
      "DNA",
      "Fibonacci",
      "Hanging Chad",
      "Odd Todd",
      "Photograph",
      "Ramen",
      "Seance",
      "Splash",
      "Steel Joker",
      "Superposition",
      "Walkie Talkie",
    ],
  },
  Castle: {
    name: "Castle",
    description: parseDescription(
      "This Joker gains {{+3|blue}} Chips per discarded {{[suit]|orange}} card, suit changes every round"
    ),
    rarity: 1,
    synergies: [
      "Ancient Joker",
      "Banner",
      "Burglar",
      "Burnt Joker",
      "Delayed Gratification",
      "Drunkard",
      "Gluttonous Joker",
      "Greedy Joker",
      "Merry Andy",
      "Ramen",
      "Smeared Joker",
      "Trading Card",
      "Yorick",
    ],
  },
  "Wily Joker": {
    name: "Wily Joker",
    description: parseDescription(
      "{{+100|blue}} Chips if played hand contains a {{Three of a Kind|orange}}"
    ),
    rarity: 0,
    synergies: ["Half Joker", "The Trio", "Walkie Talkie", "Zany Joker"],
  },
  "Even Steven": {
    name: "Even Steven",
    description: parseDescription(
      "Played cards with {{even|orange}} rank give {{+4|red}} Mult when scored <br>{{(10, 8, 6, 4, 2)|lgrey}}"
    ),
    rarity: 0,
    synergies: [
      "Ancient Joker",
      "Odd Todd",
      "Ride the Bus",
      "Steel Joker",
      "Walkie Talkie",
      "Wee Joker",
    ],
  },
  "Gift Card": {
    name: "Gift Card",
    description: parseDescription(
      "Add {{1$|gold}} of {{sell value|orange}} to every {{Joker|orange}} and {{Consumable|orange}} card at end of round"
    ),
    rarity: 0,
    synergies: [
      "Cartomancer",
      "Ceremonial Dagger",
      "Luchador",
      "Perkeo",
      "Showman",
      "Swashbuckler",
    ],
  },
  "Ice Cream": {
    name: "Ice Cream",
    description: parseDescription(
      "{{+100|blue}} Chips {{-5|blue}} Chips for every hand played"
    ),
    rarity: 0,
    synergies: ["Popcorn", "Throwback", "Turtle Bean", "Wee Joker"],
  },
  Drunkard: {
    name: "Drunkard",
    description: parseDescription("{{+1|red}} discard each round"),
    rarity: 0,
    synergies: [
      "Banner",
      "Burnt Joker",
      "Card Sharp",
      "Castle",
      "Delayed Gratification",
      "Faceless Joker",
      "Hit the Road",
      "Mail-In Rebate",
      "Seance",
      "Superposition",
      "Trading Card",
      "Wee Joker",
      "Yorick",
    ],
  },
  "Joker Stencil": {
    name: "Joker Stencil",
    description: parseDescription(
      "{{X1|redBox}} Mult for each empty {{Joker|orange}} slot. <br>Joker Stencil included"
    ),
    rarity: 1,
    synergies: ["Certificate", "Seance"],
  },
  "Scary Face": {
    name: "Scary Face",
    description: parseDescription(
      "Played {{face|orange}} cards give {{+30|blue}} Chips when scored"
    ),
    rarity: 0,
    synergies: [
      "Business Card",
      "Hanging Chad",
      "Midas Mask",
      "Pareidolia",
      "Smiley Face",
      "Sock and Buskin",
      "Splash",
    ],
  },
  "Shoot the Moon": {
    name: "Shoot the Moon",
    description: parseDescription(
      "Each {{Queen|orange}} held in hand gives {{+13|red}} Mult"
    ),
    rarity: 0,
    synergies: [
      "Baron",
      "Certificate",
      "DNA",
      "Half Joker",
      "Juggler",
      "Midas Mask",
      "Mime",
      "Reserved Parking",
      "Ride the Bus",
      "Smiley Face",
    ],
  },
  "Baseball Card": {
    name: "Baseball Card",
    description: parseDescription(
      "{{Uncommon|chance}} Jokers each give {{X1.5|redBox}} Mult"
    ),
    rarity: 2,
    synergies: [
      "Blackboard",
      "Bloodstone",
      "Blueprint",
      "Brainstorm",
      "Cloud 9",
      "Glass Joker",
      "Hologram",
      "Luchador",
      "Lucky Cat",
      "Oops! All 6s",
      "Rocket",
      "Shortcut",
      "Sixth Sense",
      "To the Moon",
    ],
  },
  "Square Joker": {
    name: "Square Joker",
    description: parseDescription(
      "This Joker gains {{+4|blue}} Chips if played hand has exactly {{4|orange}} cards"
    ),
    rarity: 0,
    synergies: [
      "Burglar",
      "Cartomancer",
      "Four Fingers",
      "Green Joker",
      "Half Joker",
      "Jolly Joker",
      "Mad Joker",
      "Photograph",
      "Spare Trousers",
      "Splash",
      "Wee Joker",
    ],
  },
  Yorick: {
    name: "Yorick",
    description: parseDescription(
      "This Joker gains {{X1|redBox}} Mult every {{23|orange}} {{[23]|lgrey}} cards discarded"
    ),
    rarity: 3,
    synergies: [
      "Burnt Joker",
      "Canio",
      "Castle",
      "Drunkard",
      "Faceless Joker",
      "Hit the Road",
      "Juggler",
      "Mail-In Rebate",
      "Merry Andy",
      "Mystic Summit",
      "Perkeo",
      "Triboulet",
    ],
  },
  Perkeo: {
    name: "Perkeo",
    description: parseDescription(
      "Creates a {{Negative|negative}} copy of {{1|orange}} random {{consumable|orange}} card in your possession at the end of the {{shop|orange}}"
    ),
    rarity: 3,
    synergies: [
      "8 Ball",
      "Blueprint",
      "Brainstorm",
      "Campfire",
      "Canio",
      "Cartomancer",
      "Chicot",
      "Cloud 9",
      "Constellation",
      "Fortune Teller",
      "Gift Card",
      "Hallucination",
      "Seance",
      "Sixth Sense",
      "Superposition",
      "Triboulet",
      "Vagabond",
      "Yorick",
    ],
  },
  "Abstract Joker": {
    name: "Abstract Joker",
    description: parseDescription(
      "{{+3|red}} Mult for each {{Joker|orange}} card"
    ),
    rarity: 0,
    synergies: ["Ceremonial Dagger", "Madness", "Ramen", "Riff-Raff"],
  },
  "The Trio": {
    name: "The Trio",
    description: parseDescription(
      "{{X3|redBox}} Mult if played hand contains a {{Three of a Kind|orange}}"
    ),
    rarity: 2,
    synergies: ["Cloud 9", "Half Joker", "Walkie Talkie", "Zany Joker"],
  },
  Bootstraps: {
    name: "Bootstraps",
    description: parseDescription(
      "{{+2|red}} Mult for every {{$5|gold}} you have"
    ),
    rarity: 1,
    synergies: [
      "Bull",
      "Cloud 9",
      "Marble Joker",
      "Matador",
      "Rocket",
      "To the Moon",
    ],
  },
  "Wrathful Joker": {
    name: "Wrathful Joker",
    description: parseDescription(
      "Played cards with {{Spade|spade}} suit give {{+3|red}} Mult when scored"
    ),
    rarity: 0,
    synergies: [
      "Droll Joker",
      "Gluttonous Joker",
      "Greedy Joker",
      "Lusty Joker",
      "Smeared Joker",
      "Steel Joker",
    ],
  },
  Hologram: {
    name: "Hologram",
    description: parseDescription(
      "This Joker gains {{X0.25|redBox}} Mult every time a {{playing card|orange}} is added to your deck"
    ),
    rarity: 1,
    synergies: [
      "Ancient Joker",
      "Baseball Card",
      "Canio",
      "Certificate",
      "Cloud 9",
      "DNA",
      "Green Joker",
      "Marble Joker",
      "Red Card",
      "Seance",
      "Wee Joker",
    ],
  },
  Arrowhead: {
    name: "Arrowhead",
    description: parseDescription(
      "Played cards with {{Spade|spade}} suit give {{+50|blue}} Chips when scored"
    ),
    rarity: 1,
    synergies: [
      "Bloodstone",
      "Certificate",
      "Droll Joker",
      "Onyx Agate",
      "Rough Gem",
      "Seance",
      "Smeared Joker",
    ],
  },
  Juggler: {
    name: "Juggler",
    description: parseDescription("{{+1|orange}} hand size"),
    rarity: 0,
    synergies: [
      "Baron",
      "Card Sharp",
      "Half Joker",
      "Merry Andy",
      "Mime",
      "Seance",
      "Shoot the Moon",
      "Stuntman",
      "Troubadour",
      "Turtle Bean",
      "Yorick",
    ],
  },
  "Driver's License": {
    name: "Driver's License",
    description: parseDescription(
      "{{X3|redBox}} Mult if you have at least {{16|orange}} Enhanced cards in your full deck"
    ),
    rarity: 2,
    synergies: [],
  },
  "Glass Joker": {
    name: "Glass Joker",
    description: parseDescription(
      "This Joker gains {{X0.75|redBox}} Mult for every {{Glass Card|orange}} that is destroyed"
    ),
    rarity: 1,
    synergies: [
      "Baseball Card",
      "Canio",
      "Cartomancer",
      "Certificate",
      "DNA",
      "Erosion",
      "Hack",
      "Lucky Cat",
      "Onyx Agate",
      "Oops! All 6s",
      "Pareidolia",
      "Splash",
      "Steel Joker",
      "Stone Joker",
      "Trading Card",
      "Wee Joker",
    ],
  },
  "Ride the Bus": {
    name: "Ride the Bus",
    description: parseDescription(
      "This Joker gains {{+1|red}} Mult per consecutive hand played without a scoring {{face|orange}} card"
    ),
    rarity: 0,
    synergies: [
      "Burglar",
      "Business Card",
      "Cartomancer",
      "Even Steven",
      "Hack",
      "Marble Joker",
      "Midas Mask",
      "Odd Todd",
      "Pareidolia",
      "Reserved Parking",
      "Shoot the Moon",
      "Smiley Face",
      "Splash",
      "Trading Card",
    ],
  },
  Luchador: {
    name: "Luchador",
    description: parseDescription(
      "Sell this card to disable the current {{Boss Blind|orange}}"
    ),
    rarity: 0,
    synergies: [
      "Baseball Card",
      "Blueprint",
      "Brainstorm",
      "Campfire",
      "Cartomancer",
      "Chicot",
      "Diet Cola",
      "Gift Card",
      "Invisible Joker",
      "Pareidolia",
    ],
  },
  "Raised Fist": {
    name: "Raised Fist",
    description: parseDescription(
      "Adds {{double|orange}} the rank of {{lowest|orange}} ranked card held in hand to Mult"
    ),
    rarity: 0,
    synergies: ["Baron", "Certificate", "Half Joker", "Mime", "Stuntman"],
  },
  "Walkie Talkie": {
    name: "Walkie Talkie",
    description: parseDescription(
      "Each played {{10|orange}} or {{4|orange}} gives {{+10|blue}} Chips and {{+4|red}} Mult when scored"
    ),
    rarity: 0,
    synergies: [
      "Ancient Joker",
      "Dusk",
      "Even Steven",
      "Flower Pot",
      "Hack",
      "Hanging Chad",
      "Jolly Joker",
      "Mad Joker",
      "Ramen",
      "Scholar",
      "Seeing Double",
      "Seltzer",
      "Shortcut",
      "Smeared Joker",
      "Sock and Buskin",
      "Spare Trousers",
      "Steel Joker",
      "Superposition",
      "The Duo",
      "The Family",
      "The Order",
      "The Trio",
      "Zany Joker",
    ],
  },
  Misprint: {
    name: "Misprint",
    description: parseDescription("{{+0|red}}-{{+23|red}} Mult"),
    rarity: 0,
    synergies: [],
  },
  Banner: {
    name: "Banner",
    description: parseDescription(
      "{{+30|blue}} Chips for each remaining {{discard|orange}}"
    ),
    rarity: 0,
    synergies: [
      "Castle",
      "Delayed Gratification",
      "Drunkard",
      "Green Joker",
      "Jolly Joker",
      "Merry Andy",
      "Ramen",
    ],
  },
  Hallucination: {
    name: "Hallucination",
    description: parseDescription(
      "{{1 in 2|chance}} chance to create a {{Tarot|tarot}} card when any {{Booster Pack|orange}} is opened"
    ),
    rarity: 0,
    synergies: [
      "Bloodstone",
      "Fortune Teller",
      "Oops! All 6s",
      "Perkeo",
      "Red Card",
    ],
  },
  "Turtle Bean": {
    name: "Turtle Bean",
    description: parseDescription(
      "{{+5|orange}} hand size, <br>reduces by {{1|red}} each round"
    ),
    rarity: 1,
    synergies: [
      "Half Joker",
      "Ice Cream",
      "Juggler",
      "Popcorn",
      "Ramen",
      "Seltzer",
      "Stuntman",
      "Throwback",
      "Troubadour",
    ],
  },
  Erosion: {
    name: "Erosion",
    description: parseDescription(
      "{{+4|red}} Mult for each card below {{[the deck's starting size]|orange}} in your full deck"
    ),
    rarity: 1,
    synergies: ["Canio", "Glass Joker", "Seance", "Trading Card"],
  },
  Seltzer: {
    name: "Seltzer",
    description: parseDescription(
      "Retrigger all cards played for the next {{10|orange}} hands"
    ),
    rarity: 1,
    synergies: [
      "Ancient Joker",
      "Business Card",
      "Hack",
      "Photograph",
      "Turtle Bean",
      "Walkie Talkie",
    ],
  },
  Superposition: {
    name: "Superposition",
    description: parseDescription(
      "Create a {{Tarot|tarot}} card if poker hand contains an {{Ace|orange}} and a {{Straight|orange}} {{(Must have room)|lgrey}}"
    ),
    rarity: 0,
    synergies: [
      "Crazy Joker",
      "Drunkard",
      "Fortune Teller",
      "Four Fingers",
      "Greedy Joker",
      "Perkeo",
      "Scholar",
      "Shortcut",
      "Walkie Talkie",
    ],
  },
  "Half Joker": {
    name: "Half Joker",
    description: parseDescription(
      "{{+20|red}} Mult if played hand contains {{3|red}} or fewer cards."
    ),
    rarity: 0,
    synergies: [
      "Baron",
      "Blue Joker",
      "Burnt Joker",
      "Card Sharp",
      "Certificate",
      "Green Joker",
      "Jolly Joker",
      "Juggler",
      "Marble Joker",
      "Mime",
      "Raised Fist",
      "Ramen",
      "Reserved Parking",
      "Shoot the Moon",
      "Space Joker",
      "Splash",
      "Square Joker",
      "Steel Joker",
      "Stone Joker",
      "Stuntman",
      "Supernova",
      "The Duo",
      "The Trio",
      "Troubadour",
      "Turtle Bean",
      "Wee Joker",
    ],
  },
  "Lusty Joker": {
    name: "Lusty Joker",
    description: parseDescription(
      "Played cards with {{Heart|heart}} suit give {{+3|red}} Mult when scored"
    ),
    rarity: 0,
    synergies: [
      "Ancient Joker",
      "Bloodstone",
      "Droll Joker",
      "Gluttonous Joker",
      "Greedy Joker",
      "Oops! All 6s",
      "Smeared Joker",
      "Steel Joker",
      "The Idol",
      "Wrathful Joker",
    ],
  },
  Splash: {
    name: "Splash",
    description: parseDescription(
      "Every {{played card|orange}} counts in scoring"
    ),
    rarity: 0,
    synergies: [
      "Burglar",
      "Business Card",
      "Flower Pot",
      "Glass Joker",
      "Greedy Joker",
      "Green Joker",
      "Half Joker",
      "Hiker",
      "Jolly Joker",
      "Pareidolia",
      "Ride the Bus",
      "Scary Face",
      "Scholar",
      "Seeing Double",
      "Smiley Face",
      "Square Joker",
      "The Idol",
    ],
  },
  "Mail-In Rebate": {
    name: "Mail-In Rebate",
    description: parseDescription(
      "Earn {{$5|gold}} for each discarded {{[rank]|orange}}, <br>rank changes every round"
    ),
    rarity: 0,
    synergies: ["Drunkard", "Yorick"],
  },
  Photograph: {
    name: "Photograph",
    description: parseDescription(
      "First played {{face|orange}} card gives {{X2|redBox}} Mult when scored"
    ),
    rarity: 0,
    synergies: [
      "Ancient Joker",
      "Certificate",
      "Dusk",
      "Hanging Chad",
      "Onyx Agate",
      "Pareidolia",
      "Scholar",
      "Seltzer",
      "Sock and Buskin",
      "Square Joker",
      "The Idol",
      "Triboulet",
      "Wee Joker",
    ],
  },
  Supernova: {
    name: "Supernova",
    description: parseDescription(
      "Adds the number of times {{poker hand|orange}} has been played this run to Mult"
    ),
    rarity: 0,
    synergies: [
      "Burglar",
      "Burnt Joker",
      "Card Sharp",
      "Cartomancer",
      "Crazy Joker",
      "Green Joker",
      "Half Joker",
      "Marble Joker",
      "Space Joker",
      "Spare Trousers",
    ],
  },
  "The Duo": {
    name: "The Duo",
    description: parseDescription(
      "{{X2|redBox}} Mult if played hand contains a {{Pair|orange}}"
    ),
    rarity: 2,
    synergies: ["Half Joker", "Jolly Joker", "Walkie Talkie"],
  },
  "Droll Joker": {
    name: "Droll Joker",
    description: parseDescription(
      "{{+10|red}} Mult if played hand contains a {{Flush|orange}}"
    ),
    rarity: 0,
    synergies: [
      "Arrowhead",
      "Bloodstone",
      "Crazy Joker",
      "Four Fingers",
      "Gluttonous Joker",
      "Greedy Joker",
      "Jolly Joker",
      "Lusty Joker",
      "Mad Joker",
      "Onyx Agate",
      "Rough Gem",
      "Smeared Joker",
      "The Tribe",
      "Wrathful Joker",
      "Zany Joker",
    ],
  },
  Certificate: {
    name: "Certificate",
    description: parseDescription(
      "When round begins, add a random {{playing card|orange}} with a random {{seal|orange}} to your hand"
    ),
    rarity: 1,
    synergies: [
      "Arrowhead",
      "Baron",
      "Blueprint",
      "Brainstorm",
      "Bull",
      "Burnt Joker",
      "Constellation",
      "DNA",
      "Fibonacci",
      "Flash Card",
      "Fortune Teller",
      "Glass Joker",
      "Hack",
      "Half Joker",
      "Hit the Road",
      "Hologram",
      "Joker Stencil",
      "Lucky Cat",
      "Mime",
      "Onyx Agate",
      "Photograph",
      "Raised Fist",
      "Scholar",
      "Shoot the Moon",
      "Space Joker",
      "Vampire",
      "Wee Joker",
    ],
  },
  "Faceless Joker": {
    name: "Faceless Joker",
    description: parseDescription(
      "Earn {{$5|gold}} if {{3|orange}} or more {{face cards|orange}} are discarded at the same time"
    ),
    rarity: 0,
    synergies: [
      "Blueprint",
      "Brainstorm",
      "Drunkard",
      "Joker",
      "Merry Andy",
      "Pareidolia",
      "Yorick",
    ],
  },
  Obelisk: {
    name: "Obelisk",
    description: parseDescription(
      "This Joker gains {{X0.2|redBox}} Mult per consecutive hand played without playing your most played {{poker hand|orange}}"
    ),
    rarity: 2,
    synergies: ["Cartomancer", "Constellation", "Madness", "Spare Trousers"],
  },
  "Rough Gem": {
    name: "Rough Gem",
    description: parseDescription(
      "Played cards with {{Diamond|diamond}} suit earn {{$1|gold}} when scored"
    ),
    rarity: 1,
    synergies: [
      "Arrowhead",
      "Bloodstone",
      "Droll Joker",
      "Greedy Joker",
      "Onyx Agate",
      "Pareidolia",
      "Smeared Joker",
    ],
  },
  Hiker: {
    name: "Hiker",
    description: parseDescription(
      "Every played {{card|orange}} permanently gains {{+5|blue}} Chips when scored"
    ),
    rarity: 1,
    synergies: ["Hack", "Splash"],
  },
};

export default jokerdata;
