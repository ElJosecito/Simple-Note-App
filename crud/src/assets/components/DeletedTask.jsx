import React from "react";
import toast, { Toaster } from "react-hot-toast";

function DeletedTask({ title, desc, id, Fetching }) {


  const error = (e) => toast.error(e)
  const Succesfull = (e) => toast.success(e)

  //restore task funtion
  const Restore = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/notes/restore/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if(result.modifiedCount == 1){
        Succesfull("Note Succesfully restored.");
      }else{
        error("Note can't be restored.")
      }
      //console.log(result);
    } catch (error) {
      console.error(error);
      error("Note can't be restored.")
    }

    Fetching()
  };

  return (
    <>
      <div className="h-24 my-5 p-2 flex justify-between rounded-lg border-2 border-[#2e333e]">
        <div className="w-full max-w-xs flex justify-center items-center border-r-2 border-[#2e333e] mr-3">
          <h2 className="text-2xl font-semibold text">{title}</h2>
        </div>

        <div className="w-full max-w-xl flex items-center border-r-2 border-[#2e333e] mr-3">
          <p className="text-base font-semibold text">{desc}</p>
        </div>

        <div className="flex flex-col items-center justify-center w-[7rem] h-full">
          <button
            className="w-24 h-7 bg-green-700 flex justify-center text-white text-lg font-mono font-bold rounded-md hover:text-white hover:bg-green-600"
            onClick={Restore}
          
          >
            Restore
          </button>
        </div>
      </div>

      <Toaster/>
    </>
  );
}

export default DeletedTask;
