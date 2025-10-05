import { createRoomModel, getAllRoomModel, getRoomModel, deleteRoomModel } from "../models/roomModel.js";

export const createRoomService = async (name, teamSize, maxTeams, duration) => {
    // Business logic can go here (e.g., check constraints)
    if (!name || !teamSize || !maxTeams || !duration) {
        throw new Error("All fields are required");
    }

    const room = await createRoomModel(name, teamSize, maxTeams, duration);
    return room;
}

export const getAllRoomService = async () => {
    const rooms = await getAllRoomModel();
    return rooms;
}

export const getRoomService = async (roomId) => {
    if (!roomId) throw new Error("Room ID is required");

    const room = await getRoomModel(Number(roomId));
    if (!room) throw new Error("Room not found");

    return room;
}

export const deleteRoomService = async (roomId) => {
    if (!roomId) throw new Error("Room ID is required");

    const deletedRoom = await deleteRoomModel(Number(roomId));
    if (!deletedRoom) throw new Error("Room not found or already deleted");

    return deletedRoom;
}
