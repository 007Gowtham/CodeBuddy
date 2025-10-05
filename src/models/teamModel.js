import prisma from "../db/prismaClient.js";

// CREATE a new team
export const createTeamModel = async (teamName, roomId) => {
    try {
        const team = await prisma.team.create({
            data: {
                team_name: teamName,
                room_id: Number(roomId)
            },
            include: {
                room: true,
                players: true,
                answers: true
            }
        });
        return team;
    } catch (err) {
        console.error("Error creating team:", err);
        throw err;
    }
}

// GET all teams
export const getAllTeamModel = async () => {
    try {
        const teams = await prisma.team.findMany({
            include: {
                room: true,
                players: true,
                answers: true
            },
            orderBy: {
                score: 'desc'
            }
        });
        return teams;
    } catch (err) {
        console.error("Error fetching all teams:", err);
        throw err;
    }
}

// GET team by ID
export const getTeamModel = async (teamId) => {
    try {
        const team = await prisma.team.findUnique({
            where: { team_id: Number(teamId) },
            include: {
                room: true,
                players: true,
                answers: true
            }
        });
        return team;
    } catch (err) {
        console.error("Error fetching team:", err);
        throw err;
    }
}

// DELETE team by ID
export const deleteTeamModel = async (teamId) => {
    try {
        const deletedTeam = await prisma.team.delete({
            where: { team_id: Number(teamId) }
        });
        return deletedTeam;
    } catch (err) {
        console.error("Error deleting team:", err);
        throw err;
    }
}


export const getTeamByRoomModel = async(roomID)=>{
      try{
            const teams = await prisma.team.findMany({
                where:{
                    room_id:roomID
                }
            })
            return teams;
      } catch (err) {
        console.error("Error get team by room:", err);
        throw err;
    } 
}