import express from "express";
import usersRoutes from "./src/routes/users.js";
import collectionsRoutes from "./src/routes/collections.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", usersRoutes);
app.use("/collections", collectionsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
