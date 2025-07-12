class Planner {
  /**
   * Generates a GT outfit using GTSetPlanner.
   *
   * @param {object} config - The character appearance and equipped items config.
   * @returns {Promise<{setimage: string, [key: string]: any}>} The planner result including base64 image and other data.
   * @throws {Error} If the request fails or response is invalid.
   */
  static async generate(config) {
    const response = await fetch('https://www.gtsetplanner.com/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error(`Planner request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.setimage) {
      throw new Error('No image returned from planner.');
    }

    return {
      ...data,
      base64: `data:image/png;base64,${data.setimage}`
    };
  }
}


// Example Usage:
/*
(async () => {
  try {
    const plannerResult = await Planner.generate({
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
    });

    console.log(plannerResult.base64);
  } catch (e) {
    console.error("Planner error:", e.message);
  }
})();
*/

module.exports = Planner;
