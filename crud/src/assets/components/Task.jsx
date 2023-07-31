import React from "react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function Task({ title, desc, id, Fetching }) {

  const error = (e) => toast.error(e)
  const Succesfull = (e) => toast.success(e)

  //Update variables
  const [titleU, setTitleU] = useState();
  const [descU, setDescU] = useState();
  //handle title
  const HandleTitleU = (e) => {
    setTitleU(e.target.value);
    //console.log(e.target.value);
  };
  //handle desc
  const HandleDescU = (e) => {
    setDescU(e.target.value);
    //console.log(e.target.value);
  };
  //Handle varId
  const HandleVarId = async () => {
    localStorage.setItem("id", id);
  };
  //Update function
  const Update = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/notes/update/${Number(
          localStorage.getItem("id")
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: titleU,
            description: descU,
          }),
        }
      );
      const result = await response.json();
        Succesfull("Note Succesfully updated.");
      //console.log(result);
    } catch (error) {
      console.error(error);
    }
    const form = document.getElementById("myForm2");
    form.reset();
    Fetching();
    
  };
  //delete task function
  const Delete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/notes/delete/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if(result.modifiedCount == 1){
        Succesfull("Note Succesfully deleted.");
      }else{
        error("Note can't be deleted.")
      }
      //console.log(result);
    } catch (error) {
      console.error(error);
      error("Note can't be deleted.")
    }
    Fetching();
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

        <div className="flex flex-col items-center justify-between w-[7rem]">
          {/* The button to open modal */}
          <label
            htmlFor="my_modal_8"
            className="w-24 h-7 bg-blue-600 flex justify-center text-white text-lg font-mono font-bold rounded-md hover:text-white hover:bg-blue-500"
            onClick={HandleVarId}
          >
            Update
          </label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my_modal_8" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <form
                action="submit"
                className="min-w-full"
                onSubmit={Update}
                id="myForm2"
              >
                <h3 className="font-bold text-lg">Agrega una nueva nota!</h3>
                <label className="label">
                  <span className="label-text text-lg">Titulo de la nota.</span>
                </label>
                <input
                  className="input input-bordered w-full ml-1 outline-1"
                  type="text"
                  onChange={HandleTitleU}
                />

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base">Descripcion</span>
                  </label>
                  <input
                    className="input input-bordered w-full ml-1 outline-1"
                    type="text"
                    onChange={HandleDescU}
                  />
                </div>
                <button className=" ml-1 w-full py-1 px-5 bg-blue-600 flex justify-center items-center text-white text-lg font-mono font-bold rounded-md hover:text-white hover:bg-blue-500 self-end mt-5" htmlFor="my_modal_8">
                  Add Note
                </button>
              </form>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_8">
              Close
            </label>
          </div>

          <button
            className="w-24 h-7 bg-red-600 flex justify-center text-white text-lg font-mono font-bold rounded-md hover:text-white hover:bg-red-500"
            onClick={Delete}
          >
            Delete
          </button>
        </div>
      </div>

      <Toaster />
    </>
  );
}

export default Task;
