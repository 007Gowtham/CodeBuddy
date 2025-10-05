import prisma from "../db/prismaClient.js";

// CREATE a new player
export const createPlayerModel = async (teamId, nickname) => {
    try {
        const player = await prisma.player.create({
            data: {
                team_id: Number(teamId),
                nickname
            },
            include: {
                team: true,
                answers: true
            }
        });
        return player;
    } catch (err) {
        console.error("Error creating player:", err);
        throw err;
    }
}

// GET all players
export const getAllPlayerModel = async () => {
    try {
        const players = await prisma.player.findMany({
            include: {
                team: true,
                answers: true
            },
            orderBy: {
                total_score: 'desc'
            }
        });
        return players;
    } catch (err) {
        console.error("Error fetching all players:", err);
        throw err;
    }
}

// GET player by ID
export const getPlayerModel = async (playerId) => {
    try {
        const player = await prisma.player.findUnique({
            where: { player_id: Number(playerId) },
            include: {
                team: true,
                answers: true
            }
        });
        return player;
    } catch (err) {
        console.error("Error fetching player:", err);
        throw err;
    }
}

// GET players by team
export const getPlayersByTeamModel = async (teamId) => {
    try {
        const players = await prisma.player.findMany({
            where: { team_id: Number(teamId) },
            include: {
                team: true,
                answers: true
            }
        });
        return players;
    } catch (err) {
        console.error("Error fetching players by team:", err);
        throw err;
    }
}

// DELETE player by ID
export const deletePlayerModel = async (playerId) => {
    try {
        const deletedPlayer = await prisma.player.delete({
            where: { player_id: Number(playerId) }
        });
        return deletedPlayer;
    } catch (err) {
        console.error("Error deleting player:", err);
        throw err;
    }
}
