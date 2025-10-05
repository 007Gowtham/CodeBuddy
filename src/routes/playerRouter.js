import express from 'express';
import { 
    createPlayerController,
    getAllPlayerController,
    getPlayerController,
    getPlayersByTeamController,
    deletePlayerController
} from '../controllers/playerController.js';

const playerRouter = express.Router();

// Player routes
playerRouter.post('/', createPlayerController);
playerRouter.get('/', getAllPlayerController);
playerRouter.get('/:id', getPlayerController);
playerRouter.get('/team/:teamId', getPlayersByTeamController);
playerRouter.delete('/:id', deletePlayerController);

export default playerRouter;
