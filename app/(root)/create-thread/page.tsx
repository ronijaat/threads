import PostThread from '@/components/form/PostThread';
import { fetchUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const CreateThread = async () => {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const userInfo = await fetchUser(user.id);
  if (!userInfo.onboarded) redirect('/onboarding');

  return (
    <>
      <h1 className="head-text">Create a Thread</h1>
      <PostThread userId={userInfo._id} />
    </>
  );
};

export default CreateThread;
