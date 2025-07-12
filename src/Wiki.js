const cheerio = require("cheerio");

class Wiki {
    /**
     * Search for Growtopia wiki items by name.
     *
     * @param {string} name - The name (or partial name) of the item to search for.
     * @returns {Promise<Array<{ name: string, url: string }>>} A list of matching items with their wiki URLs.
     * @throws {Error} If the item cannot be found or the request fails.
     */
    static async getItem(name) {
        const url = `https://growtopia.fandom.com/api.php?action=query&srlimit=20&list=search&srsearch=${name.toLowerCase()}&format=json`;

        const response = await fetch(url);

        if (!response.ok) throw new Error(`Failed to fetch from Wiki, Code: ${response.status}`)
        const res = await response.json();

        console.log(res)

        const data = res.query.search;

        if (!data) throw new Error("Cannot find item.");

        const items = data.filter(i => i.title.toLowerCase().includes(name.toLowerCase()) && !i.title.includes("Category:") && !i.title.includes("(update)") && !i.title.includes("(disambiguation)"));
        if (!(items.length > 0)) throw new Error("Cannot find item.");

        const result = items.map(element => {
            return {
                name: element.title,
                url: `https://growtopia.fandom.com/wiki/${element.title.replace(/ /g, "_")}`
            }
        });

        return result;
    }

    /**
     * Fetch detailed info for a Growtopia item from the wiki.
     *
     * @param {string} name - The name of the item to search for.
     * @returns {Promise<{
     *   name: string,
     *   description: string,
     *   properties: string,
     *   image: string|null,
     *   rarity: string,
     *   recipe: string[],
     *   splice: string,
     *   extraInfo: string
     * }>} An object containing detailed wiki info for the item.
     * @throws {Error} If the item is not found or the request fails.
     */
    static async getItemInfo(name) {
        const suggestionsUrl = `https://growtopia.fandom.com/api/v1/SearchSuggestions/List?query=${encodeURIComponent(name)}`;
        const suggestionsRes = await fetch(suggestionsUrl);
        if (!suggestionsRes.ok) throw new Error("Couldn't find item (Suggestions API)");
        const suggestionData = await suggestionsRes.json();

        const title = suggestionData.items?.[0]?.title;
        if (!title) throw new Error("Couldn't find item title");

        const wikiURL = `https://growtopia.fandom.com/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;
        const pageRes = await fetch(wikiURL);
        if (!pageRes.ok) throw new Error("Couldn't fetch Wiki page");
        const html = await pageRes.text();

        const $ = cheerio.load(html);

        const data = {
            name: title,
            description: $(".card-text").first().text().trim(),
            properties: $("#mw-content-text .gtw-card.item-card").eq(0).children().eq(3).text().trim(),
            image: $("div.card-header .growsprite > img").attr("src") || null,
            rarity: $(".s_rarity").first().text().trim(),
            recipe: $("div.recipebox table.content").first().text().split(/\n+/).map(x => x.trim()).filter(Boolean),
            splice: $(".bg-splice").first().text().trim(),
            extraInfo: $("#mw-content-text > div > p").eq(2).text().trim()
        };

        if (!data.image && !data.recipe.length) throw new Error("Incorrect item name or structure mismatch.");

        return data;
    }

     /**
     * Fetch a Growtopia item's sprite from the Wiki.
     *
     * @param {string} name - The name of the item to search for.
     * @returns {Promise<string>} A 32x32 image URL displaying the item's sprite.
     * @throws {Error} If the item is not found or has no image.
     */
    static async getItemSprite(name) {
        const { image } = await this.getItemInfo(name);
        if (!image) throw new Error("Item does not have an image.");
        return image;

    }
}

module.exports = Wiki;
