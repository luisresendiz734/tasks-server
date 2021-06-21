import app from "./app";
import { connectDB } from "./database";

app.listen(app.get("port"), () =>
  console.log("Server running on: http://localhost:" + app.get("port"))
);

connectDB();
