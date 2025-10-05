import { 
    createPlayerModel,
    getAllPlayerModel,
    getPlayerModel,
    getPlayersByTeamModel,
    deletePlayerModel
} from '../models/playerModel.js';
import prisma from '../db/prismaClient.js';

// CREATE player with business logic
export const createPlayerService = async (teamId, nickname) => {
    
    const team = await prisma.team.findUnique({ where: { team_id: Number(teamId) } });
    const room = await prisma.room.findUnique({where:{room_id:Number(team.room_id)}})
    if (!team) throw new Error("Team not found");

    const players = await getPlayersByTeamModel(Number(teamId));
    if (players.length >= room.team_size) throw new Error("Team is full");

    const player = await createPlayerModel(teamId, nickname);
    return player;
}

// GET all players
export const getAllPlayerService = async () => {
    return await getAllPlayerModel();
}

// GET player by ID
export const getPlayerService = async (playerId) => {
    const player = await getPlayerModel(playerId);
    if (!player) throw new Error("Player not found");
    return player;
}

// GET players by team
export const getPlayersByTeamService = async (teamId) => {
    const team = await prisma.team.findUnique({ where: { team_id: Number(teamId) } });
    if (!team) throw new Error("Team not found");

    const players = await getPlayersByTeamModel(Number(teamId));
    return players;
}

// DELETE player
export const deletePlayerService = async (playerId) => {
    const deletedPlayer = await deletePlayerModel(playerId);
    if (!deletedPlayer) throw new Error("Player not found or already deleted");
    return deletedPlayer;
}
