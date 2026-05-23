import express from "express";

const app = express();
app.use(express.json());

const ROBLOX_API_KEY = process.env.ROBLOX_API_KEY;
const GROUP_ID = "953262098";

app.post("/approve", async (req, res) => {
    const { userId, score } = req.body;

    if (score < 90) {
        return res.status(403).json({
            error: "Failed questionnaire"
        });
    }

    try {
        const response = await fetch(
            `https://apis.roblox.com/cloud/v2/groups/${GROUP_ID}/join-requests/${userId}:accept`,
            {
                method: "POST",
                headers: {
                    "x-api-key": ROBLOX_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        const text = await response.text();

        res.status(response.status).send(text);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

app.listen(3000, () => {
    console.log("Backend running");
});
