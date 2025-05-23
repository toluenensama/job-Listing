import { useEffect, useState } from "react";
import { useJobContext } from "../context/JobContext";
import { JobCard } from "./JobCard";
import jsonData from "../assets/data/data.json";
import { cn } from "../lib/utils";
import { X } from "lucide-react";

export function Header() {
  const [jobs, setJobs] = useState(jsonData);
  const { filterTags, removeFromFilterTags,clearTags } = useJobContext();
  const [tags, setTags] = useState([]);

  const [filtered, setFiltered] = useState([]);

  function containsAllValues(obj, valuesToCheck) {
    const foundValues = new Set();

    function search(obj) {
      if (obj && typeof obj === "object") {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const val = obj[key];

            if (valuesToCheck.includes(val)) {
              foundValues.add(val);
              if (foundValues.size === valuesToCheck.length) return true;
            }

            if (typeof val === "object") {
              if (search(val)) return true;
            }
          }
        }
      }
      return false;
    }

    search(obj);

    return valuesToCheck.every((val) => foundValues.has(val));
  }

  useEffect(() => {
    setTags(filterTags);

    const filterJobs = jobs.filter(
      (job) => filterTags.length == 0 || containsAllValues(job, filterTags)
    );

    setFiltered(filterJobs);

  }, [filterTags]);

  return (
    <section>
      <div className="relative">
        <div className="lg:bg-[url(/images/bg-header-desktop.svg)]  bg-[url(/images/bg-header-mobile.svg)] bg-cover  bg-primary h-40 bg-no-repeat"></div>
      </div>
      <div
        className={cn(
          "bg-white p-6 shadow-2xl shadow-primary min-w-[320px] rounded-lg mx-6 lg:w-4xl lg:mx-auto flex items-center justify-between",
          tags.length == 0 && "hidden",
          " z-10 inset-0 top-25 h-40 lg:h-25 absolute"
        )}
      >
        <div className="flex flex-wrap items-start justify-center gap-3 ">
          {tags.map((tag, key) => (
            <div
              key={key}
              className="flex bg-tablets items-center rounded-md text-primary text-[15px] font-league-medium shadow-lg"
            >
              <div className="px-3 ">{tag}</div>
              <div
                className="bg-primary h-full rounded-r-md hover:bg-tertiary"
                onClick={() => {
                  removeFromFilterTags(tag);
                }}
              >
                <X className="text-white" />
              </div>
            </div>
          ))}
        </div>
        <div
          className="text-primary text-nowrap text-[15px] font-league-medium hover:underline hover:cursor-pointer"
          onClick={() => {
           clearTags();
            setTags([]);
          }}
        >
          Clear
        </div>
      </div>
      <div className="mt-40 lg:mt-30 mx-6 lg:w-4xl lg:mx-auto space-y-12 ">
        {filtered.map((job) => (
          <JobCard jobData={job} key={job.id} />
        ))}
      </div>
    </section>
  );
}
