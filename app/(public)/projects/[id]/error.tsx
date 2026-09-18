"use client";
import Link from "next/link";
export default function ProjectError({ reset }: { reset: () => void }) {
  return (
    <div className="sg-container project-detail">
      <h1 className="page-title">This project couldn’t be loaded.</h1>
      <p className="body-copy my-6">Please try again in a moment.</p>
      <button className="sg-button" onClick={reset}>
        Try again
      </button>
      <Link href="/#projects" className="sg-text-link ml-6">
        Back to selected work
      </Link>
    </div>
  );
}
