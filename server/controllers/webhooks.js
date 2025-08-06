import { Webhook } from "svix";
import User from "../models/user.js";
import e from "express";

export const clerkWebhooks = async (req, res) => {
    try {
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        const payload = req.rawBody;
        const evt = wh.verify(payload, headers);

        const { data, type } = evt;

        switch (type) {
            case 'user.created':
            case 'user.updated': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses?.[0]?.email_address || "",
                    name: (data.first_name || "") + " " + (data.last_name || ""),
                    imageUrl: data.image_url || "",
                };
                await User.findByIdAndUpdate(data.id, userData, { new: true, upsert: true });
                return res.status(200).json({ success: true });
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                return res.status(200).json({ success: true });
            }

            default:
                return res.status(200).json({});
        }
    } catch (error) {
        console.error("Webhook Error:", error);
        return res.status(400).json({ success: false, message: error.message });
    }
};

export default clerkWebhooks;
