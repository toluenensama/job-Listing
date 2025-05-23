# Frontend Mentor - Job listings with filtering solution

This is a solution to the [Job listings with filtering challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)

- [Author](#author)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Filter job listings based on the categories



### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://reactjs.org/) - JS library


### What I learned

This project made me work in many many aspects from styling to layouts, but there are some new lessons I feel it cool to share.

#### JobContext

In this project, I created a context so as to communicate data from one component to another. The component had functions to add filter tags, remove filter tags and clear the entire filter tags list. The context also persisted the filter tags in local storage. 

```jsx

    const [filterTags, setFilterTags] = useState([])

    
    useEffect(() => {
        const storedFilter = localStorage.getItem("filterTags")
        if (storedFilter) setFilterTags(JSON.parse(storedFilter))
    }, [])
  

    useEffect(() => {
        localStorage.setItem('filterTags', JSON.stringify(filterTags))
    }, [filterTags])

```
All operations with the filterTags are stated in the context, I found this out while trying to add a function to the clear filter button. I was initially  

```jsx
      <div
          className="text-primary text-nowrap text-[15px] font-league-medium hover:underline hover:cursor-pointer"
          onClick={() => {
           localStorage.setItem("filterTags",JSON.stringify([]));
            setTags([]);
          }}
        >
          Clear
      </div>
```
This actually cleared the local storage field of `filterTag` but apparently, this did not clear the filterTag state. This was fixed by.

```jsx
      <div
          className="text-primary text-nowrap text-[15px] font-league-medium hover:underline hover:cursor-pointer"
          onClick={() => {
           clearTags();
            setTags([]);
          }}
        >
          Clear
      </div>
```
In the context, I created a function that simply set the filterTag state to an empty array. Which did the trick.
```jsx
    const clearTags = () => {
        setFilterTags([])
    }
```
Other functions included in the context includes:

```jsx
    const addToFilterTags = (tag) => {
        setFilterTags(prev => [...prev, tag])
    }
```

This adds a new tag to the filterTag state by setting the filterTag state to `[...prev,tag]` which adds a new tag to the array of existing tags.

```jsx
    const removeFromFilterTags = (tag) => {
        setFilterTags(prev => prev.filter(item => item !== tag))
    }
```
This removes a tag from the filterTag state using the `Array.prototype.filter()` method to return all items except the tag I plan on deleting, and then set the array to the filterTags state.

```jsx
    const isFilter = (tag) => {
        return filterTags.some(item => item === tag)
    }
```
This utilizes the `Array.prototype.some()` method in filterTags state if there is an occurence of a tag and returns a boolean `true` or `false`


#### Filtering Logic

The filtering of jobs was done according to their  Role (Frontend, Backend, Fullstack), Level (Junior, Midweight, Senior) ,Languages (Python, Ruby, JavaScript, HTML, CSS) ,Tools (React, Sass, Vue, Django, RoR (Ruby on Rails)).

##### Filter tags
The role, languages, level and tools components of each card was made into a button that calls the `addFilter(value)` function on click. This adds the tag to the filterTags which is a list persisted on the local storage if the tag doesn't already exist in the filterTags list. The addFilter(item) is shown below.  
```jsx
  function addFilter(item) {
    if (!isFilter(item)) {
      addToFilterTags(item);
    }
  }
```
When added there is a tab that shows the active filter tags. This tags come with a delete button that calls the `removeFromFilterTags(tag)` and removes the tag from the filterTag list. 

![](/Screenshots/Screenshot%201png.png)

```jsx
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
```

The tags are stored in a tags state which is updated by a useeffect that checks for changes in the filterTags list.
##### Filtering function
This is the function that is used to check each job object if they contain every item on the tag list.

```jsx
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
```

The function takes in two parameters, obj -> the job and valuesToCheck -> the filter tags. The function returns true if all filter tags are contained in the job (obj).

1. A new set is created called `foundValues` which stores the tags found in the object (job).

```jsx
    const foundValues = new Set();

```

2. A recursive function is then created that goes through every item of the object to check if they contain the items of the tag list.
```jsx
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

```
Firstly, it checks if the object considered is defined and has the type of `object` then loops through the key value pairs and  stores them in a variable `val`. Then check if the `val` is included in the valuesToCheck (tags), if it does, it is stored in the `foundValues` set. And then check if the amount of elements in the `foundValues` set is the same as that in the valuesToCheck list. and return `true`. If not, it checks if the `val` is an object and then goes intp the object and recalls itself (the recursion).
If all these conditions are not met the function returns `false`.

The `search(obj)` is then callled and  then the `foundValues` and `valuesToCheck` arrays compared. It returns true if they both contain the same values.
#### Rendering the filtered Jobs

```jsx
  useEffect(() => {
    setTags(filterTags);

    const filterJobs = jobs.filter(
      (job) => filterTags.length == 0 || containsAllValues(job, filterTags)
    );

    setFiltered(filterJobs);

  }, [filterTags]);
```
This useEffect checks for changes in the filterTags and set the tags state to the filterTags. An array is created so as to contain those jobs that fits the filter criteria. A `filtered` state is created and is populated by the filterJobs.
The filtering is done by returning all if the filtertag list is empty else it returns only the jobs that returns `true` for the `containsAllValues(job, filterTags)` function.




## Author

- Website - [Toluene PortFolio](https://www.toluene-portfolio.vercel.app)
- Frontend Mentor - [@toluenesama](https://www.frontendmentor.io/profile/toluenesama)


