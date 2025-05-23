import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { JobProvider, useJobContext } from "../context/JobContext";

function Home() {
  return (
    <>
      <JobProvider>
        <div className="min-h-screen  overflow-x-hidden bg-background relative">
          <Header />
          <Footer/>

        </div>
      </JobProvider>
    </>
  );
}

export default Home;
