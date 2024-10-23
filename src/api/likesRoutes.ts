// // src/api/routes/likesRoutes.js

// import express from 'express';
// const router = express.Router();

// // Example route
// router.post('/:itemId/like', async (req, res) => {
//     const { itemId } = req.params;
//     // Logic for liking an item (e.g., updating a database)
//     res.status(200).json({ message: `Liked item ${itemId}` });
// });

// export default router;






import express from 'express';
const router = express.Router();

// Example route
router.post('/:itemId/like', async (req, res) => {
    const { itemId } = req.params;
    // Logic for liking an item (e.g., updating a database)
    res.status(200).json({ message: `Liked item ${itemId}` });
});

export default router; // Default export