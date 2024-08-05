"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import {
  IconBrandGithub,
} from "@tabler/icons-react";

import { useRouter } from "next/navigation";
import axios from 'axios'
import { useEffect, useState } from "react"

const page = () => {
  const router = useRouter();
  const [user,setUser]  = useState({
    email:"",
    password:""
})

const [btn,setbtn] = useState(false);
const [load,setLoad] = useState(false);

const onSignup = async(e:any)=>{
  e.preventDefault();
   try {
      setLoad(true)
      const res = await axios.post("/api/users/login",user);
      console.log("login",res.data);
     

   } catch (error:any) {
      console.log("error hai signup mai",error);
     
   }
}
  return (
    <>
    
     <div className="flex justify-center items-center h-[100vh]">
   
     <div className="mt-[150px] z-50 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black border border-[#27272a]">
    <h2 className="font-bold text-xl  dark:text-neutral-200">
      Welcome to My App
    </h2>
    <form className="my-8" >
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email" className="text-white">Email Address</Label>
        <Input id="email" placeholder="projectmayhem@fc.com" value={user.email} onChange={(e)=> setUser({...user,email:e.target.value})}  type="email"  className="bg-[#18181b]" />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="password" className="text-white">Password</Label>
        <Input id="password" placeholder="••••••••" type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}  className="bg-[#18181b]"/>
      </LabelInputContainer>
      <button
        className="bg-gradient-to-br relative group/btn bg-[#18181b] from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
       onClick={onSignup}
    >
        Login &rarr;
        <BottomGradient />
      </button>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
    </form>
    <div className="flex flex-col space-y-4">
        <button
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input border border-slate-600 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
         
        >
          <IconBrandGithub className="h-4 w-4  dark:text-neutral-300 text-white" />
          <span className="text-white dark:text-neutral-300 text-sm">
            GitHub
          </span>
          <BottomGradient />
        </button>
      </div>
  </div>
   </div>
    </>
  )
}

const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };

  const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };

export default page
