"use client";
import Link from "next/link";
export default function ProjectError({ reset }: { reset: () => void }) {
  return (
    <div className="content-container project-detail">
      <h1 className="page-title">This project couldn’t be loaded.</h1>
      <p className="body-copy my-6">Please try again in a moment.</p>
      <button className="solid-link" onClick={reset}>
        Try again
      </button>
      <Link href="/#projects" className="text-link ml-6">
        Back to selected work
      </Link>
    </div>
  );
}
