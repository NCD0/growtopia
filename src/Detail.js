class Detail {
    static url = "https://growtopiagame.com/detail";

    static async getRawDetail() {
        try {
            const response = await fetch(this.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                }
            });

            const res = await response.json();
            return({res, code: response.status})
        } catch (e) {
            throw new Error(`Failed to fetch from ${this.url}: ${e}`)
        }
    }

    static async getWOTD(getImageLink = false) {
        const { res, code } = await this.getRawDetail();
        if (code !== 200) throw new Error(`Status code isn't 200: ${code}`);

        const world = res.world_day_images.resize || res.world_day_images.full_size;

        if (getImageLink) return world.replace("worlds/", "https://s3.amazonaws.com/world.growtopiagame.com/")

        return world;
    }

    static async getOnlineUsers() {
        const {res, code} = await this.getRawDetail();
        if (code !== 200) throw new Error(`Status code isn't 200: ${code}`);

        return res.online_user || null;
    }
}

module.exports = Detail;
