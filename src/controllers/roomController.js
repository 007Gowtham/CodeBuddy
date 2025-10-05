import asyncHandler from '../utils/async-handler.js';
import ApiResponse from '../utils/api-response.js';
import { createRoomService, getAllRoomService, getRoomService, deleteRoomService } from '../service/roomService.js';

export const createRoomController = asyncHandler(async (req, res) => {
    const { name, teamSize, maxTeams, duration } = req.body;

    const room = await createRoomService(name, teamSize, maxTeams, duration);
    return res.status(201).json(new ApiResponse(room, "Room created successfully", 201));
});

export const getAllRoomController = asyncHandler(async (req, res) => {
    const rooms = await getAllRoomService();
    return res.status(200).json(new ApiResponse(rooms, "All rooms fetched successfully", 200));
});

export const getRoomController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const room = await getRoomService(Number(id));
    return res.status(200).json(new ApiResponse(room, "Room fetched successfully", 200));
});

export const deleteRoomController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedRoom = await deleteRoomService(Number(id));
    return res.status(200).json(new ApiResponse(deletedRoom, "Room deleted successfully", 200));
});
