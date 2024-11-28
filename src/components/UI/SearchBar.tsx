  export default function SearchBar() {
    return (
      <form className="flex justify-items-center items-center">
        <div className="flex bg-white rounded-lg w-[24em]">
          <div className="flex-grow">
            <input type="text" className="w-full h-full p-2 bg-transparent focus:outline-none"/>
          </div>
          <button className="rounded bg-white py-[0.25em] px-[0.25em]">
            Buscar
          </button>
        </div>
      </form>
    );
  }
