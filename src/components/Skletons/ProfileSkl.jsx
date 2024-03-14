import BlogCardSkl from "./BlogCardSkl";

function ProfileSkl() {
  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        <div className="flex flex-col items-center py-8 text-center">
          <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <div className="grid w-full h-full rounded-full skeleton"></div>
          </div>
          <div className="w-1/6">
            <div className="flex w-[150%] -ml-[25%] flex-col items-center justify-center gap-1">
              <h3 className="w-full h-4 skeleton"></h3>
              <p className="w-2/3 h-3 skeleton"></p>
            </div>
            <div className="h-2 w-[200%] -ml-[50%] skeleton mt-7"></div>
            <div className="h-2 w-[180%] -ml-[40%] skeleton mt-2"></div>
            <div className="h-2 w-[150%] -ml-[25%] skeleton mt-2"></div>
            <div className="h-2 w-[180%] -ml-[40%] skeleton mt-2"></div>
          </div>
          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>
        <div>
          <h4 className="w-1/4 h-5 mt-6 lg:mt-8 skeleton"></h4>
          <div className="my-6 space-y-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <BlogCardSkl key={i} />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfileSkl;
