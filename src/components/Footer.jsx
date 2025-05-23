import {
    ArrowUp,
    LucideMessageCircle,
    LucideFacebook,
    LucideTwitter,
    Linkedin,
    LinkIcon,
    Github,
  } from "lucide-react";
  export function Footer() {
    return (
      <footer className="py-12  font-league-medium flex justify-between items-center mt-12 pt-8 px-4 flex-wrap bg-white ">
        <div className="flex flex-col gap-4 items-start">
          <p className=" text-sm text-primary">
            &copy; {new Date().getFullYear()} Toluene. All rights reserved.
          </p>
          <div className="flex gap-3 items-center justify-center">
            <a href="https://x.com/magetoluene" target="_blank">
              <LucideTwitter className="h-6 w-6 text-primary" />
            </a>
            <a href="https://web.facebook.com/toluene.kirito/" target="_blank">
              <LucideFacebook className="h-6 w-6 text-primary" />
            </a>
            <a href="https://wa.me/2347016682022" target="_blank">
              <LucideMessageCircle className="h-6 w-6 text-primary" />
            </a>
            <a
              href="https://www.linkedin.com/in/tolu-daniel-ojo-8508a7231/"
              target="_blank"
            >
              <Linkedin className="h-6 w-6 text-primary" />
            </a>
            <a
              href="https://github.com/toluenensama/"
              target="_blank"
              className="h-6 w-6 text-primary"
            >
              <Github />
            </a>
          </div>
          <a
            href="https://toluene-portfolio.vercel.app"
            className="flex items-center gap-1"
          >
            <span className="text-sm text-primary">
              Check out my portfolio here
            </span>{" "}
            <LinkIcon className="h-6 w-6 text-primary" />
          </a>
        </div>
  

      </footer>
    );
  }
  