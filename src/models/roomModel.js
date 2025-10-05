import prisma from "../db/prismaClient.js";

export const createRoomModel = async (roomName, teamSize, maxTeams, duration) => {
    try {
        const room = await prisma.room.create({
            data: {
                name: roomName,
                team_size: teamSize,
                max_teams: maxTeams,
                duration: duration,
            },
        });

        return room;
    } catch (err) {
        console.error("Error creating room:", err);
        throw err;
    }
}

export const getAllRoomModel = async () => {
    try {
        const rooms = await prisma.room.findMany({
            include: {
                teams: true,
                roomTopics: true
            }
        })
        return rooms;
    } catch (err) {
        console.error("Error list all the  room:", err);
        throw err;
    }
}

export const getRoomModel = async (roomId) => {
    try {
        const room = await prisma.room.findUnique({
            include: {
                teams: true,
                roomTopics: true
            },
            where:{
                room_id:roomId
            }
        })
        return room;
    } catch (err) {
        console.error("Error list a perticular room:", err);
        throw err;
    }
}

export const deleteRoomModel = async (roomId) => {
    try {
        const deletedRoom = await prisma.room.delete({
            where: {
                room_id: roomId
            }
        });
        return deletedRoom; 
    } catch (err) {
        console.error("Error deleting a particular room:", err);
        throw err;
    }
};
