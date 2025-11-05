import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

let app = express();
let port = process.env.PORT || 6000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

