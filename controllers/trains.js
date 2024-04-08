import Sequelize, { Op } from "sequelize";
import Trains from "../models/Trains.js";

const addTrainDetails = async (req, res) => {
  try {
    const { train_no, train_name, source, destination, available_seats } =
      req.body;

    const newTrain = await Trains.create({
      train_no,
      train_name,
      source,
      destination,
      available_seats,
    });

    res
      .status(201)
      .send({ message: "Train added successfully", train: newTrain });
  } catch (error) {
    console.error("Error adding train:", error);
    res
      .status(500)
      .send({ message: "Error adding train", error: error.message });
  }
};

const searchTrains = async (req, res) => {
  try {
    const { train_no, train_name } = req.body;

    if (!train_no && !train_name) {
      return res.status(400).json({
        message:
          "Please provide either train_no or train_name in the request body.",
      });
    }

    const trains = await Trains.findAll({
      where: {
        [Sequelize.Op.or]: [{ train_no }, { train_name }],
      },
    });

    if (trains.length > 0) {
      res.status(200).json({ message: "Trains found", trains });
    } else {
      res
        .status(404)
        .json({ message: "No trains found matching the criteria." });
    }
  } catch (error) {
    console.error("Error searching trains:", error);
    res
      .status(500)
      .json({ message: "Error searching trains", error: error.message });
  }
};

const searchTrainByRoute = async (req, res) => {
  try {
    const { source, destination } = req.body;

    const formattedSource = source.trim().toLowerCase();
    const formattedDestination = destination.trim().toLowerCase();

    const trains = await Trains.findAll({
      where: {
        source: {
          [Op.like]: Sequelize.literal(`LOWER(TRIM('${formattedSource}'))`),
        },
        destination: {
          [Op.like]: Sequelize.literal(
            `LOWER(TRIM('${formattedDestination}'))`
          ),
        },
      },
    });

    res.status(200).json({ message: "Trains found", trains });
  } catch (error) {
    console.error("Error searching trains:", error);
    res
      .status(500)
      .json({ message: "Error searching trains", error: error.message });
  }
};

export { addTrainDetails, searchTrainByRoute, searchTrains };
