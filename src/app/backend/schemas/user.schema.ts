import { z } from "zod";

export const clerkUserWebhookSchema = z.object({
  id: z.string(),
  email_addresses: z.array(
    z.object({
      email_address: z.string().email(),
    })
  ),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  phone_numbers: z.array(
    z.object({
      phone_number: z.string(),
    })
  ),
});
