import express from 'express';
import { createTeamController, getAllTeamController, getTeamController, deleteTeamController,getTeamByRoomController } from '../controllers/teamController.js';

const teamRouter = express.Router();

// Base URL will be /teams in app.js
teamRouter.post('/', createTeamController);       // POST /teams
teamRouter.get('/', getAllTeamController);        // GET /teams
teamRouter.get('/:id', getTeamController);        // GET /teams/:id
teamRouter.delete('/:id', deleteTeamController);  // DELETE /teams/:id
teamRouter.get('/room/:roomId', getTeamByRoomController);

export default teamRouter;
