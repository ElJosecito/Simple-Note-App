import React from "react";
import Task from "./Task";
import toast, { Toaster } from 'react-hot-toast';
import DeletedTask from "./DeletedTask";
import Header from "./Header";
import { useState, useEffect } from "react";

function Hero({ task, Fetching }) {

  //Toast variables 
  const error = (e) => toast.error(e)
  const Succesfull = (e) => toast.success(e)


  //Variables
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [controller, setController] = useState(0);

  const Post = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/notes/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: desc,
        }),
      });
      const result = await response.json();
      if(result.id >= 0 ){
        Succesfull("Note Succesfully added.");
        setTitle('')
        setDesc('')
      }else{
        error("Note can't be added.")
      }
      //console.log(result);
    } catch (error) {
      console.error(error);
      error("Note can't be added.")
    }
    Fetching()
    const form = document.getElementById('myForm1')
    form.reset()
  };

  //handle title
  const HandleTitle = (e) => {
    setTitle(e.target.value);
    //console.log(e.target.value);
  };
  //handle desc
  const HandleDesc = (e) => {
    setDesc(e.target.value);
    //console.log(e.target.value);
  };

  //Handle Controllers
  const HandlerControllerDeleted = () => {
      setController(1);
  };

  const HandlerControllerActual = () => {
    setController(0);
};

  return (
    <>
      <section className="flex">
        <div className="h-screen w-80 fixed bg-[#1e262e] border-r-2 border-[#2e333e]">
          <div className="font-bold font-sans text-2xl text-white flex justify-start items-center h-16 p-5">
            Uncanny
          </div>
          <div className="flex flex-col items-start p-5 w-full">
            <button onClick={HandlerControllerDeleted} className="my-7 w-full py-1 px-5 bg-orange-600 flex justify-center items-center text-white text-lg font-mono font-bold rounded-md hover:text-white hover:bg-orange-500 self-end">Deleted</button>
            <button onClick={HandlerControllerActual} className="w-full py-1 px-5 bg-blue-600 flex justify-center items-center text-white text-lg font-mono font-bold rounded-md hover:text-white hover:bg-blue-500 self-end">No Deleted</button>
          </div>
        </div>
        {/*  */}
        <section className="w-full pl-80">
          <Header
            HandleTitle={HandleTitle}
            HandleDesc={HandleDesc}
            Post={Post}
          />

          <div className="max-w-screen-2xl min-h-screen flex justify-end col-span-5 row-span-full col-start-2 row-start-2">
            <div className="max-w-screen-xl w-full h-screen  pt-20 p-5">
              <h3 className="text-2xl font-semibold text my-5">
                Estas son tu notas:
              </h3>
              <div className="w-full px-5 pt-1 ">
                {task &&
                  task.map((e) => {
                    if(controller == 0){
                      if (e.deleted != true) {
                        return (
                          <Task
                            key={e.id}
                            id={e.id}
                            title={e.title}
                            desc={e.description}
                            Fetching={Fetching}
                            
                          />
                        );
                      }
                    }else if(controller == 1){
                      if (e.deleted == true) {
                        return (
                          <DeletedTask
                            key={e.id}
                            id={e.id}
                            title={e.title}
                            desc={e.description}
                            Fetching={Fetching}
                          />
                        );
                      }
                    }
                  })}
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Hero;
