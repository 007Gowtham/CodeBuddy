import { createRoomController,getAllRoomController,getRoomController,deleteRoomController } from "../controllers/roomController.js";
import express from 'express';

const roomRouter = express.Router();

roomRouter.post('/', createRoomController);

roomRouter.get('/', getAllRoomController);

roomRouter.get('/:id', getRoomController);

roomRouter.delete('/:id', deleteRoomController);  


export default roomRouter;
