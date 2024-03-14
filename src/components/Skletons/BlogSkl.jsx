function BlogSkl() {
  return (
    <div className="container py-8">
      <div className="w-3/4 mx-auto space-y-1">
        <h1 className="skeleton h-7"></h1>
        <h1 className="w-2/5 skeleton h-7"></h1>
      </div>
      <div className="flex items-center justify-center gap-4 my-4">
        <div className="flex items-center space-x-2">
          <div className="avater-img skeleton"></div>
          <div className="space-y-1">
            <h5 className="w-[20ch] h-1 skeleton"></h5>
            <h5 className="w-[20ch] h-1 skeleton"></h5>
          </div>
        </div>
        <span className="skeleton h-2 w-[80px] dot"></span>
        <span className="skeleton h-2 w-[100px] dot"></span>
      </div>
      <div className="object-cover w-full mx-auto skeleton md:w-8/12 h-80 md:h-96"></div>
      <ul className="tags">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <li key={i} className="w-10 h-3 skeleton"></li>
          ))}
      </ul>
      <div className="w-full mx-auto space-y-2 md:w-10/1">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-2 skeleton"></div>
          ))}
      </div>
    </div>
  );
}

export default BlogSkl;
