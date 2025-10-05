import prisma from "../db/prismaClient.js";
import { 
    createRoomTopicModel,
    getAllRoomTopicModel,
    getRoomTopicModel,
    getRoomTopicsByRoomModel,
    deleteRoomTopicModel
} from '../models/roomTopicModel.js';

// CREATE RoomTopic
export const createRoomTopicService = async (roomId, name, level, noOfQuestions) => {
    
    const room = await prisma.room.findUnique({ where: { room_id: Number(roomId) } });
    if (!room) throw new Error("Room not found");

    const topic = await createRoomTopicModel(roomId, name, level, noOfQuestions);
    return topic;
}

// GET all RoomTopics
export const getAllRoomTopicService = async () => {
    return await getAllRoomTopicModel();
}

// GET RoomTopic by ID
export const getRoomTopicService = async (topicId) => {
    const topic = await getRoomTopicModel(topicId);
    if (!topic) throw new Error("Room topic not found");
    return topic;
}

// GET RoomTopics by roomId
export const getRoomTopicsByRoomService = async (roomId) => {
    const room = await prisma.room.findUnique({ where: { room_id: Number(roomId) } });
    if (!room) throw new Error("Room not found");

    const topics = await getRoomTopicsByRoomModel(roomId);
    return topics;
}

// DELETE RoomTopic
export const deleteRoomTopicService = async (topicId) => {
    const deletedTopic = await deleteRoomTopicModel(topicId);
    if (!deletedTopic) throw new Error("Room topic not found or already deleted");
    return deletedTopic;
}
