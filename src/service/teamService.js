import { 
    createTeamModel, 
    getAllTeamModel, 
    getTeamModel, 
    deleteTeamModel, 
    getTeamByRoomModel 
} from '../models/teamModel.js';
import prisma from '../db/prismaClient.js';

// CREATE team with business logic
export const createTeamService = async (roomId, teamName) => {
    // 1. Check if room exists
    const room = await prisma.room.findUnique({ where: { room_id: Number(roomId) } });
    if (!room) throw new Error("Room not found");

    // 2. Check max teams constraint
    const existingTeams = await getTeamByRoomModel(Number(roomId));
    if (existingTeams.length >= room.max_teams) throw new Error("Room is full");

    // 3. Create team
    const team = await createTeamModel(teamName, roomId);
    return team;
}

// GET all teams
export const getAllTeamService = async () => {
    return await getAllTeamModel();
}

// GET team by ID
export const getTeamService = async (teamId) => {
    const team = await getTeamModel(teamId);
    if (!team) throw new Error("Team not found");
    return team;
}

// DELETE team by ID
export const deleteTeamService = async (teamId) => {
    const deletedTeam = await deleteTeamModel(teamId);
    if (!deletedTeam) throw new Error("Team not found or already deleted");
    return deletedTeam;
}

// GET all teams in a room
export const getTeamByRoomService = async (roomId) => {
    // Check if room exists
    const room = await prisma.room.findUnique({ where: { room_id: Number(roomId) } });
    if (!room) throw new Error("Room not found");

    const teams = await getTeamByRoomModel(Number(roomId));
    return teams;
}
