import { NextRequest, NextResponse } from "next/server";
// third party
import { verifyWebhook, WebhookEvent } from "@clerk/nextjs/webhooks";

// components
import { connectToDB } from "@/app/backend/utils/db";
import User from "@/app/backend/models/User.model";

export async function POST(req: NextRequest) {
  try {
    const event = (await verifyWebhook(req)) as WebhookEvent;
    const eventData = event.data;

    // connect to db
    await connectToDB();

    switch (event.type) {
      case "user.created": {
        if ("first_name" in eventData && "last_name" in eventData) {
          const existingUser = await User.findOne({
            clerkUserId: eventData.id,
          });

          if (existingUser) {
            console.log("User already exists:", existingUser.email);
            return NextResponse.json({
              message: "User already exists, Try logging in",
            });
          }

          const userData = {
            clerkUserId: eventData.id,
            name: `${eventData.first_name ?? ""} ${
              eventData.last_name ?? ""
            }`.trim(),
            email: eventData.email_addresses?.[0]?.email_address || "",
            mobile: eventData.phone_numbers?.[0]?.phone_number || "",
            monthlyIncome: 0,
            salaryDate: 8,
            profileImageUrl: eventData.image_url,
          };

          await User.create(userData);
          console.log("✅ User created successfully:", userData.email);
        }
        break;
      }

      case "user.updated": {
        if ("first_name" in eventData && "last_name" in eventData) {
          const user = await User.findOne({ clerkUserId: eventData.id });

          if (user) {
            user.name = `${eventData.first_name ?? ""} ${
              eventData.last_name ?? ""
            }`.trim();
            user.email = eventData.email_addresses?.[0]?.email_address || "";
            user.mobile = eventData.phone_numbers?.[0]?.phone_number || "";
            user.profileImageUrl = eventData.image_url;
            await user.save();
            console.log("✅ User updated successfully:", user.email);
          }
        }
        break;
      }

      case "user.deleted": {
        const user = await User.findOne({ clerkUserId: eventData.id });

        if (user) {
          await User.deleteOne({ clerkUserId: eventData.id });
          console.log("✅ User deleted via webhook:", user.email);
        }
        break;
      }

      default:
        console.log("⚠️ Unhandled webhook event type:", event.type);
        break;
    }

    return NextResponse.json({ message: `Webhook processed: ${event.type}` });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
