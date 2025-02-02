"use client";
import { increment, addMessage } from "@/actions/increment";
import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [visitors, SetVisitors] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addMessage(name, email, message);
    setName("");
    setEmail("");
    setMessage("");
  };
  useEffect(() => {
    async function fetchVisitorCount() {
      const count = await increment();
      SetVisitors(count);
    }
    fetchVisitorCount();
  }, []);

  return (
    <div className="pt-10">
      <div>
        <h1 className="text-4xl bg-clip-text text-center tracking-tighter relative w-full leading-relaxed font-bold text-transparent bg-gradient-to-b from-[#fff] to-black capitalize">
          Welcome To My Website
        </h1>
        {visitors !== null ? (
          <p className="hidden">Visitors: {visitors}</p>
        ) : (
          <p className="hidden">Loading...</p>
        )}
      </div>
      <div className="flex items-center justify-center new-container">
        <div className="bg-transparent border-4 border-zinc-800 p-8 rounded-2xl">
          <p className="text-4xl bg-clip-text text-center tracking-tighter relative w-full leading-relaxed font-bold text-transparent bg-gradient-to-b from-[#fff] to-black capitalize after:content-[''] after:w-full after:h-[3px] after:bg-gradient-to-b after:from-[#fff] after:to-[#000] after:absolute after:bottom-0 after:left-0 after:rounded-full">
            Something new for a database
          </p>
          <form action="." className="mt-4" onSubmit={onSubmit}>
            <div className="flex flex-col space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full bg-transparent border-zinc-800 focus:outline-none outline-none focus:border-zinc-800 text-lg text-white capitalize"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Enter your email"
                className="input input-bordered w-full bg-transparent border-zinc-800 focus:outline-none outline-none focus:border-zinc-800 text-lg text-white"
              />
              <input
                value={message}
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                className="input input-bordered w-full bg-transparent border-zinc-800 focus:outline-none outline-none focus:border-zinc-800 text-lg text-white capitalize"
              />
              <button className="btn btn-primary text-inherit font-bold text-base tracking-tighter uppercase w-full">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
