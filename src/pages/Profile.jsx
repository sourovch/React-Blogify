import { useParams } from "react-router-dom";
import BlogCard from "../components/common/BlogCard";
import NothingIndicator from "../components/common/NothingIndicator";
import ProfileBio from "../components/profile/ProfileBio";
import ProfileImage from "../components/profile/ProfileImage";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useProfile from "../hooks/useProfile";
import Spinner from "../components/common/Spinner";

function Profile() {
  const { id } = useParams();
  const { profile, isLoading, isError, error, isPending } = useProfile(
    id || null
  );
  const { userId } = useAuth();

  const fullName = `${profile?.firstName} ${profile?.lastName}`;
  let content;

  if (isError)
    content = (
      <div className="h-[50vh] flex items-center justify-center">
        <div className="text-center text-gray-500">
          {error?.message || "There Was An Unexpected Error"}
        </div>
      </div>
    );
  else if (isLoading || isPending)
    content = (
      <div className="min-h-[60vh] grid place-content-center">
        {isPending && !isLoading ? (
          <Spinner
            overlay="na"
            loadingInfo={"Check Your Internet connection"}
            showLoadingInfo
          />
        ) : (
          isLoading && (
            <Spinner loadingInfo={"Loading Profile Data"} showLoadingInfo />
          )
        )}
      </div>
    );
  else
    content = (
      <>
        <div className="flex flex-col items-center py-8 text-center">
          <ProfileImage
            userId={userId}
            avatar={profile?.avatar}
            name={fullName}
            edit={userId === profile?.id}
          />
          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px] capitalize">
              {fullName}
            </h3>
            <p className="leading-[231%] lg:text-lg">{profile?.email}</p>
          </div>
          <ProfileBio
            userId={userId}
            bio={profile?.bio}
            edit={userId === profile?.id}
          />
          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>
        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">
          {userId === profile?.id
            ? "Your Blogs"
            : `${profile?.firstName}'s Blogs`}
        </h4>
        <div className="my-6 space-y-4">
          {profile?.blogs?.length > 0 ? (
            profile.blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <NothingIndicator />
          )}
        </div>
      </>
    );

  useDocumentTitle(`${fullName || "name"} | React Blogify`);
  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">{content}</div>
    </main>
  );
}

export default Profile;
