import AccountProfile from '@/components/form/AccountProfile';
import { currentUser } from '@clerk/nextjs';

const Onbording = async () => {
  const user = await currentUser();
  // console.log(user);
  if (!user) return null;

  const userInfo = undefined;

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? '',
    bio: userInfo ? userInfo?.bio : '',
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  // console.log(userData);

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-center px-10 py-20">
      <h1 className="head-text">Onbording</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now, to use Threds.
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default Onbording;
