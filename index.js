const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Auth Server is running");
});

app.post("/auth", async (req, res) => {

    const start = Date.now();

    const {
        metaUserId,
        oculusUsername,
        playFabId,
        orgScopedId
    } = req.body;

    const authTime = Date.now() - start;

    res.json({
        success: true,

        authentication: {
            metaUserId,
            oculusUsername,
            playFabId,
            orgScopedId,
            ipAddress:
                req.headers["x-forwarded-for"] ||
                req.socket.remoteAddress,
            authTimeMs: authTime,
            status: "VERIFIED"
        }
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Auth Server running on port " + PORT);
});
