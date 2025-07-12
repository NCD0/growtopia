# @ncd0/growtopia
Unofficial Growtopia API + scraping library for bots, tools, and integrations.  
Join the community: [Discord Server](https://discord.gg/gts)

## ✨ Features
- 📊 Fetch information easily from growtopiagame.com/detail
- 🔍 Fetch item info from the Growtopia Wiki
- 👤 Generate outfit sprites with your own JSON schema using GTSetPlanner

## 📦 Installation

```bash
npm install @ncd0/growtopia
```

# 📘 Example Usage
```js
const { Detail, Wiki, Planner } = require("@ncd0/growtopia");

// 📊 Growtopia detail usage
async function getDetailInfo() {
  const { res, code } = await Detail.getRawDetail(); // Full API response + status code
  const wotd = await Detail.getWOTD(true); // true returns image URL instead of just world name
  const onlineUserCount = await Detail.getOnlineUsers();
}

// 🔍 Growtopia wiki usage
async function getWikiInfo() {
  const item = "dirt";

  const matches = await Wiki.getItem(item); // Array of { name, url }
  const info = await Wiki.getItemInfo(item); // Object with description, rarity, image, etc.
  const sprite = await Wiki.getItemSprite(item); // 32x32 image URL
}

// 🎭 GT Set Planner usage
async function getPlannerSet() {
  const config = { /* See example below */ };
  const result = await Planner.generate(config); // Returns base64 PNG + raw data
}
```
## 🛠 Example GTSetPlanner JSON
<details> <summary> Click to expand full config </summary>
```json
{
    searchQuery: "ncd0",
    selectedType: "All",
    equipped: [["66", "Hat"], ["1784", "Back"]],
    expression: 0,
    skincolor: 0,
    roleskin: 0,
    dyes: [255, 255, 255],
    lenses: [0, 0, 0],
    drops: [255, 255, 255],
    riftcape: [
        [147, 56, 143],
        [147, 56, 143],
        true,
        false,
        3
    ],
    infinitycrown: [
        [255, 200, 37],
        [255, 0, 64],
        [26, 45, 140],
        false,
        true,
        true,
        true
    ],
    riftwings: [
        [93, 22, 200],
        [220, 72, 255],
        true,
        0
    ],
    minokawa: [true, true],
    ahool: [true, true],
    infinityaura: [
        [63, 251, 255],
        [255, 255, 255],
        [255, 255, 255],
        false,
        true,
        true,
        true,
        false,
        true,
        true
    ],
    equinox: 0,
    celesdragcharm: 0,
    crownseasons: [0, 0],
    willofthewild: 0,
    golgift: 0,
    perilous: 0,
    customskincolor: [240, 240, 240, 255],
    purebeingtrigger: 0,
    handmovement: 0,
    artlevel: [0, 0, 0, 0, 0],
    eqaura: 0,
    bbandolier: ["harlequin", null],
    infinityfist: [
        [122, 10, 250],
        [65, 65, 65],
        [78, 255, 0],
        0
    ],
    anomaly: 0
}
```
</details>

## 📄 License
MIT

## 🤝 Contributing
Feel free to open issues or submit pull requests!
Star the repo if you find it useful ⭐

## 📫 Support & Community
Join the Discord: https://discord.gg/gts

## 📍 Notes
This is an unofficial Growtopia-related project and not affiliated with Ubisoft or Growtopia itself.