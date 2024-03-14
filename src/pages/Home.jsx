import { motion as m } from "framer-motion";
import BlogList from "../components/HomePage/BlogList";
import FavList from "../components/HomePage/FevList";
import PopulerList from "../components/HomePage/PopulerList";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { PAGE_TRANSITION_VARIANT } from "../framerMotion/variants";

function Home() {
  useDocumentTitle("Home | React Blogify");
  return (
    <m.main
      variants={PAGE_TRANSITION_VARIANT}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <section>
        <div className="container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
            <div className="space-y-3 md:col-span-5">
              <BlogList />
            </div>
            <div className="w-full h-full space-y-5 md:col-span-2">
              <PopulerList />
              <FavList />
            </div>
          </div>
        </div>
      </section>
    </m.main>
  );
}

export default Home;
