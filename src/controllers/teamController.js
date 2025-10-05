import asyncHandler from '../utils/async-handler.js';
import ApiResponse from '../utils/api-response.js';
import { 
    createTeamService,
    getAllTeamService,
    getTeamService,
    deleteTeamService,
    getTeamByRoomService
} from '../service/teamService.js';

// CREATE team
export const createTeamController = asyncHandler(async (req, res) => {
    const { roomId, teamName } = req.body;
    const team = await createTeamService(roomId, teamName);
    return res.status(201).json(new ApiResponse(team, "Team created successfully", 201));
});

// GET all teams
export const getAllTeamController = asyncHandler(async (req, res) => {
    const teams = await getAllTeamService();
    return res.status(200).json(new ApiResponse(teams, "All teams fetched successfully", 200));
});

// GET team by ID
export const getTeamController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const team = await getTeamService(Number(id));
    return res.status(200).json(new ApiResponse(team, "Team fetched successfully", 200));
});

// DELETE team by ID
export const deleteTeamController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedTeam = await deleteTeamService(Number(id));
    return res.status(200).json(new ApiResponse(deletedTeam, "Team deleted successfully", 200));
});

// GET all teams in a room
export const getTeamByRoomController = asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    const teams = await getTeamByRoomService(Number(roomId));
    return res.status(200).json(new ApiResponse(teams, "Teams fetched successfully", 200));
});
