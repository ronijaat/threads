'use server';

import { revalidatePath } from 'next/cache';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';

interface Params {
  userId: string;
  name: string;
  username: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  name,
  username,
  bio,
  image,
  path,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        name,
        username: username.toLowerCase(),
        bio,
        image,
        onboarded: true,
      },
      {
        upsert: true,
      }
    );

    if (path === '/profile/edit') {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
