"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import book from "base/individual_books/01_ኦሪት ዘፍጥረት.json"

import { api } from "base/trpc/react";

export function CreatePost() {

  console.log("this is the book of Genesis",book)


  const router = useRouter();
  const [name, setName] = useState("");
  const [chapter,setChapter] = useState(0) 

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  const handleChapter = (chap:number)=>{
    setChapter(chap)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name });
      }}
      className="flex flex-col gap-2 w-full text-justify md:w-[60%] justify-center"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isLoading}
      >
        {createPost.isLoading ? "Submitting..." : "Submit"}
      </button>

      <input
        type="number"
        placeholder="chapter"
        value={chapter}
        onChange={(e) => {
          setChapter(parseInt(e.target.value))
        }}
        className="w-full rounded-full px-4 py-2 text-black"
      />
       
       
      

      <div className="book flex flex-col gap-8 text-center justify-center items-center w-full py-3">
        <h1 className="">{book.title}</h1>
        <div className="chapter1 flex flex-col gap-4">
          {
            !chapter?(
              <div className="">you haven't selecter a chapter</div>
            ):(
              book.chapters[chapter+1]?.verses.map((verse:any,id:number)=>(
                <div className="verse px-10 py-3 flex gap-4 hover:bg-stone-500">
                  <div className="verseNumber">{id +1}</div>
                  <div className="text-ellipsis">{verse}</div>
                </div>
              ))
            )
          }
        </div>
      </div>

      
    </form>
  );
}
