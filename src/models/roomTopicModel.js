import prisma from "../db/prismaClient.js";

// CREATE a new RoomTopic
export const createRoomTopicModel = async (roomId, name, level, noOfQuestions) => {
    try {
        const topic = await prisma.roomTopic.create({
            data: {
                room_id: Number(roomId),
                name,
                level,
                no_of_questions: Number(noOfQuestions)
            },
            include: {
                room: true,
                questions: true
            }
        });
        return topic;
    } catch (err) {
        console.error("Error creating room topic:", err);
        throw err;
    }
}

// GET all RoomTopics
export const getAllRoomTopicModel = async () => {
    try {
        const topics = await prisma.roomTopic.findMany({
            include: {
                room: true,
                questions: true
            },
            orderBy: {
                id: 'asc'
            }
        });
        return topics;
    } catch (err) {
        console.error("Error fetching all room topics:", err);
        throw err;
    }
}

// GET RoomTopic by ID
export const getRoomTopicModel = async (topicId) => {
    try {
        const topic = await prisma.roomTopic.findUnique({
            where: { id: Number(topicId) },
            include: {
                room: true,
                questions: true
            }
        });
        return topic;
    } catch (err) {
        console.error("Error fetching room topic:", err);
        throw err;
    }
}

// GET RoomTopics by roomId
export const getRoomTopicsByRoomModel = async (roomId) => {
    try {
        const topics = await prisma.roomTopic.findMany({
            where: { room_id: Number(roomId) },
            include: {
                room: true,
                questions: true
            }
        });
        return topics;
    } catch (err) {
        console.error("Error fetching room topics by room:", err);
        throw err;
    }
}

// DELETE RoomTopic by ID
export const deleteRoomTopicModel = async (topicId) => {
    try {
        const deletedTopic = await prisma.roomTopic.delete({
            where: { id: Number(topicId) }
        });
        return deletedTopic;
    } catch (err) {
        console.error("Error deleting room topic:", err);
        throw err;
    }
}
