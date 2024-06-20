import Article from "./Article";
import Header from "./header";
import Intro from "./Intro";
import Service from "./Service";
import Footer from "../Footer";

let Landing = () => {
    return (
        <div className="">
          <Header />
          <Intro />
          <Service />
          <Article />
          <Footer />
        </div>
      );
}
  


export default Landing;
