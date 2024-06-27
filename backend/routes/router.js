// routes/routes.js
const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const slotController = require("../controllers/slotController");
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");
const areaController = require("../controllers/areaController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// Authentication route
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/me", authenticate, authController.me);

// User routes
router.post(
  "/users",
  //   authenticate,
  //   authorize(["admin"]),
  userController.createUser
);

router.post(
  "/create-admin",
  authenticate,
  // authorize(["admin"]),
  userController.createAdmin
);
router.get(
  "/users",
  authenticate,
  authorize(["admin"]),
  userController.getUsers
);
router.get(
  "/users/:id",
  authenticate,
  authorize(["admin"]),
  userController.getUserById
);
router.put(
  "/users/:id",
  authenticate,
  authorize(["admin"]),
  userController.updateUser
);
router.delete(
  "/users/:id",
  authenticate,
  authorize(["admin"]),
  userController.deleteUser
);

// Slot routes
router.post(
  "/slots",
  authenticate,
  authorize(["admin"]),
  slotController.createSlot
);
router.get(
  "/slots",
  //   authenticate,
  //   authorize(["admin", "customer"]),
  slotController.getSlots
);
router.get(
  "/slots/:id",
  //   authenticate,
  //   authorize(["admin", "customer"]),
  slotController.getSlotById
);
router.put(
  "/slots/:id",
  authenticate,
  //   authorize(["admin"]),
  slotController.updateSlot
);
router.delete(
  "/slots/:id",
  //   authenticate,
  //   authorize(["admin"]),
  slotController.deleteSlot
);

// Booking routes
router.post(
  "/bookings",
  authenticate,
  //   authorize(["customer"]),
  bookingController.createBooking
);
router.get(
  "/bookings",
  authenticate,
  //   authorize(["admin", "customer"]),
  bookingController.getBookings
);
router.get(
  "/bookings/my",
  authenticate,
  //   authorize(["admin", "customer"]),
  bookingController.getMyBookings
);
router.get(
  "/bookings/user/:id",
  authenticate,
  //   authorize(["admin", "customer"]),
  bookingController.getUserBooking
);
router.get(
  "/bookings/:id",
  authenticate,
  //   authorize(["admin", "customer"]),
  bookingController.getBookingById
);
router.put(
  "/bookings/:id",
  authenticate,
  //   authorize(["admin"]),
  bookingController.updateBooking
);
router.put("/bookings/:id/checkout", authenticate, bookingController.checkOut);

router.delete(
  "/bookings/:id",
  //   authenticate,
  //   authorize(["admin"]),
  bookingController.deleteBooking
);

// Area routes
router.post(
  "/areas",
  authenticate,
  authorize(["admin"]),
  areaController.createArea
);
router.get(
  "/areas",
  authenticate,
  authorize(["admin", "customer"]),
  areaController.getAreas
);
router.delete(
  "/areas/:id",
  authenticate,
  authorize(["admin"]),
  areaController.deleteArea
);

router.get("/areas/:areaId/slots", authenticate, areaController.getSlotsByArea);
router.get(
  "/areas/:areaId/slots/:slotId",
  authenticate,
  areaController.getSlotsById
);

module.exports = router;
