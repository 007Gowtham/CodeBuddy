import asyncHandler from '../utils/async-handler.js';
import ApiResponse from '../utils/api-response.js';
import { 
    createPlayerService,
    getAllPlayerService,
    getPlayerService,
    getPlayersByTeamService,
    deletePlayerService
} from '../service/playerService.js';

// CREATE player
export const createPlayerController = asyncHandler(async (req, res) => {
    const { teamId, nickname } = req.body;
    const player = await createPlayerService(teamId, nickname);
    return res.status(201).json(new ApiResponse(player, "Player created successfully", 201));
});

// GET all players
export const getAllPlayerController = asyncHandler(async (req, res) => {
    const players = await getAllPlayerService();
    return res.status(200).json(new ApiResponse(players, "All players fetched successfully", 200));
});

// GET player by ID
export const getPlayerController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const player = await getPlayerService(Number(id));
    return res.status(200).json(new ApiResponse(player, "Player fetched successfully", 200));
});

// GET players by team
export const getPlayersByTeamController = asyncHandler(async (req, res) => {
    const { teamId } = req.params;
    const players = await getPlayersByTeamService(Number(teamId));
    return res.status(200).json(new ApiResponse(players, "Players fetched successfully", 200));
});

// DELETE player
export const deletePlayerController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedPlayer = await deletePlayerService(Number(id));
    return res.status(200).json(new ApiResponse(deletedPlayer, "Player deleted successfully", 200));
});
