function BlogCardSkl() {
  return (
    <div className="blog-card">
      <div className="blog-thumb w-96 skeleton"></div>
      <div className="relative w-full mt-2">
        <h3 className="w-5/6 h-6 skeleton"></h3>
        <div className="mt-4 mb-6">
          <p className="h-2 mb-1 skeleton"></p>
          <p className="h-2 mb-1 skeleton"></p>
          <p className="h-2 mb-1 skeleton"></p>
          <p className="h-2 mb-1 skeleton"></p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="avater-img skeleton"></div>
            <div>
              <div className="skeleton h-3 w-[10vw] mb-2"></div>
              <div className="skeleton h-1 w-[8vw]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCardSkl;
