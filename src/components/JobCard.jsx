import { useJobContext } from "../context/JobContext";
import { cn } from "../lib/utils";


export function JobCard({ jobData }) {
  const { addToFilterTags, isFilter } = useJobContext();

  function addFilter(item) {
    if (!isFilter(item)) {
      addToFilterTags(item);
    }
  }

  return (
    <div
      className={cn(
        "relative bg-white p-6 shadow-2xl shadow-primary min-w-[320px] rounded-lg mx-auto",
        jobData.new && "border-l-4 border-primary"
      )}
    >
      <img
        src={jobData.logo}
        alt=""
        className="rounded-full w-15 h-15 absolute inset-0 -top-6"
      />
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-6 items-start justify-center p-6 space-x-6">
        <div className="space-y-3">
          <div className="flex items-baseline  space-x-4">
            <div className="text-primary text-[15px] font-league-bold">
              {jobData.company}
            </div>
            {jobData.new ? (
              <div className="uppercase text-[15px] font-league-bold text-white bg-primary px-2 py-0.5 rounded-full">
                new!
              </div>
            ) : (
              ""
            )}
            {jobData.featured ? (
              <div className="uppercase text-[15px] font-league-bold text-white bg-tertiary px-2 py-0.5 rounded-full">
                featured
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="text-[15px] font-league-bold text-tertiary hover:text-primary hover:cursor-pointer ">
            {jobData.position}
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="text-primary text-nowrap text-[15px] font-league-medium">
              {jobData.postedAt}
            </div>
            <div className="h-1 w-1 rounded-full bg-primary" />
            <div className="text-primary text-nowrap text-[15px] font-league-medium">
              {jobData.contract}
            </div>
            <div className="h-1 w-1 rounded-full bg-primary" />
            <div className="text-primary text-nowrap text-[15px] font-league-medium">
              {jobData.location}
            </div>
          </div>
        </div>
        <div className="h-0.5 w-full bg-primary lg:hidden" />
        <div className="flex lg:flex-row flex-col gap-3 ">
          <div className="flex flex-wrap gap-3">
            <div
              className="text-primary text-[15px] font-league-bold rounded-sm py-1 px-2 bg-tablets hover:bg-primary hover:cursor-pointer hover:text-tablets"
              onClick={() => {
                addFilter(jobData.role);
              }}
            >
              {jobData.role}
            </div>
            <div
              className="text-primary text-[15px] font-league-bold rounded-sm py-1 px-2 bg-tablets hover:bg-primary hover:cursor-pointer hover:text-tablets"
              onClick={() => {
                addFilter(jobData.level);
              }}
            >
              {jobData.level}
            </div>
            {jobData.languages.map((language, key) => (
              <div
                key={key}
                className="text-primary text-[15px] font-league-bold rounded-sm py-1 px-2 bg-tablets hover:bg-primary hover:cursor-pointer hover:text-tablets"
                onClick={() => {
                  addFilter(language);
                }}
              >
                {language}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {jobData.tools.map((tool, key) => (
              <div
                key={key}
                className="text-primary text-[15px] font-league-bold rounded-sm py-1 px-2 bg-tablets hover:bg-primary hover:cursor-pointer hover:text-tablets"
                onClick={() => {
                  addFilter(tool);
                }}
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
