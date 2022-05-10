/**
 * @typedef FootballPlayer
 * @type {object}
 * @property {string} id - player's id.
 * @property {string} name - player's name.
 * @property {PlayerPositionsEnum} position - player's position.
 * @property {number} teamid - player's team id.
 */

/**
 * @typedef FootballTeam
 * @type {object}
 * @property {string} id - an ID.
 * @property {string} name - your name.
 */


/**
 * Enum for player positions.
 * @readonly
 * @enum {string}
 */
const PlayerPositionsEnum = {
    Forward: "Forward",
    Midfielder: "Midfielder",
    Defender: "Defender",
    Goalkeeper: "Goalkeeper"
};

exports.PlayerPositionsEnum = PlayerPositionsEnum;