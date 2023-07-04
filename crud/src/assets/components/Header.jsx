import React from "react";

function Header({ Post, HandleDesc, HandleTitle }) {
  return (
    <>
      <header className="flex items-center justify-between md:pr-[21rem] pr-[15rem] p-5 bg-[#1e2229] w-full fixed border-b-2 border-[#2e333e]">
        <div className="font-bold font-sans text-2xl text-white">Uncanny</div>
        <div className="flex">
          <label
            htmlFor="my_modal_7"
            className=" w-full py-1 px-5 bg-blue-600 flex justify-center items-center text-white text-lg font-mono font-bold rounded-md hover:text-white hover:bg-blue-500 self-end"
          >
            Add Note
          </label>
          <input type="checkbox" id="my_modal_7" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <form action="submit" className="min-w-full" onSubmit={Post} id="myForm1">
                <h3 className="font-bold text-lg">Agrega una nueva nota!</h3>
                <label className="label">
                  <span className="label-text text-lg">Titulo de la nota.</span>
                </label>
                <input
                  className="input input-bordered w-full ml-1 outline-1"
                  type="text"
                  onChange={HandleTitle}
                />

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base">Descripcion</span>
                  </label>
                  <input
                    className="input input-bordered w-full ml-1 outline-1"
                    type="text"
                    onChange={HandleDesc}
                  />
                </div>
                <button className=" ml-1 w-full py-1 px-5 bg-blue-600 flex justify-center items-center text-white text-lg font-mono font-bold rounded-md hover:text-white hover:bg-blue-500 self-end mt-5">
                  Add Note
                </button>
              </form>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">
              Close
            </label>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
