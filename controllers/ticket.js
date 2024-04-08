// controllers/tickets.js
import Ticket from "../models/ticket.js";
import Trains from "../models/trains.js"; // Import the Trains model
import sequelize from "../config/db.js"; // Import Sequelize to use transactions

const bookTicket = async (req, res) => {
  try {
    const { train_no } = req.body;
    // const userContactNo = req.user.contact_number;
    const userContactNo = req.body.contact_number;
    const transaction = await sequelize.transaction();

    try {
      // Find the train and lock it for update
      const train = await Trains.findOne({
        where: { train_no },
        lock: transaction.LOCK.UPDATE,
      });

      if (!train) {
        throw new Error("Train not found");
      }

      if (train.available_seats <= 0) {
        throw new Error("No seats available");
      }

      train.available_seats -= 1;
      await train.save({ transaction });

      await transaction.commit();

      const newTicket = await Ticket.create({
        train_no,
        contact_number: userContactNo,
        transaction,
      });

      res
        .status(201)
        .json({ message: "Ticket booked successfully", ticket: newTicket });
    } catch (error) {
      // Rollback the transaction in case of any error
      await transaction.rollback();
      console.error("Error booking ticket:", error);
      res
        .status(500)
        .json({ message: "Error booking ticket", error: error.message });
    }
  } catch (error) {
    console.error("Error starting transaction:", error);
    res
      .status(500)
      .json({ message: "Error starting transaction", error: error.message });
  }
};

const viewTicket = async (req, res) => {
  try {
    // const userContactNo = req.user.contact_number; // Updated field name
    const userContactNo = req.body.contact_number;
    const tickets = await Ticket.findAll({
      where: {
        contact_number: userContactNo, // Updated field name
      },
    });

    res
      .status(200)
      .json({ message: "Tickets retrieved successfully", tickets });
  } catch (error) {
    console.error("Error retrieving tickets:", error);
    res
      .status(500)
      .json({ message: "Error retrieving tickets", error: error.message });
  }
};

export { bookTicket, viewTicket };
