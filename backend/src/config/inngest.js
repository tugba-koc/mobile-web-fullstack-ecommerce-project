import { Inngest } from 'inngest';
import { connectDB } from './db';
import User from '../models/user.model.js';

export const inngest = new Inngest({
  id: 'expo-fullstack-ecommerce-project',
});

const syncUser = inngest.createFunction(
  { id: 'sync-user' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;
    const email = email_addresses[0].email_address;

    const newUser = {
      clerkId: id,
      email,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
      addresses: [],
      wishList: [],
    };
    await User.create(newUser);
  },
);

export const functions = [syncUser];
