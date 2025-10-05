import asyncHandler from '../utils/async-handler.js';
import ApiResponse from '../utils/api-response.js';
import { 
    createRoomTopicService,
    getAllRoomTopicService,
    getRoomTopicService,
    getRoomTopicsByRoomService,
    deleteRoomTopicService
} from '../service/roomTopicService.js';

// CREATE RoomTopic
export const createRoomTopicController = asyncHandler(async (req, res) => {
    const { roomId, name, level, noOfQuestions } = req.body;
    const topic = await createRoomTopicService(roomId, name, level, noOfQuestions);
    return res.status(201).json(new ApiResponse(topic, "Room topic created successfully", 201));
});

// GET all RoomTopics
export const getAllRoomTopicController = asyncHandler(async (req, res) => {
    const topics = await getAllRoomTopicService();
    return res.status(200).json(new ApiResponse(topics, "All room topics fetched successfully", 200));
});

// GET RoomTopic by ID
export const getRoomTopicController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const topic = await getRoomTopicService(Number(id));
    return res.status(200).json(new ApiResponse(topic, "Room topic fetched successfully", 200));
});

// GET RoomTopics by roomId
export const getRoomTopicsByRoomController = asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    const topics = await getRoomTopicsByRoomService(Number(roomId));
    return res.status(200).json(new ApiResponse(topics, "Room topics fetched successfully", 200));
});

// DELETE RoomTopic
export const deleteRoomTopicController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedTopic = await deleteRoomTopicService(Number(id));
    return res.status(200).json(new ApiResponse(deletedTopic, "Room topic deleted successfully", 200));
});
