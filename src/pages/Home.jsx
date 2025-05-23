import { Header } from "../components/Header";
import { JobProvider, useJobContext } from "../context/JobContext";

function Home() {
  return (
    <>
        <JobProvider>
        <div className="min-h-screen  overflow-x-hidden bg-background relative">
        <Header />
      </div>
        </JobProvider>

    </>
  );
}

export default Home;
