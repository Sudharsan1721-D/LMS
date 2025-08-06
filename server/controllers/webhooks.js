import { Webhook } from "svix";
import User from "../models/user.js";

export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // svix expects the raw body, not the parsed JSON
        const payload = req.body;
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // If using express.json(), req.body is already parsed, so stringify for verification
        await whook.verify(JSON.stringify(payload), headers);

        const { data, type } = payload;

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses?.[0]?.email_address || "",
                    name: (data.first_name || "") + " " + (data.last_name || ""),
                    imageUrl: data.image_url || "",
                };
                await User.create(userData);
                res.json({});
                break;
            }

            case 'user.updated': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses?.[0]?.email_address || "",
                    name: (data.first_name || "") + " " + (data.last_name || ""),
                    imageUrl: data.image_url || "",
                };
                await User.findByIdAndUpdate(data.id, userData, { new: true, upsert: true });
                res.json({});
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                res.json({});
                break;
            }

            default:
                res.json({});
                break;
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};