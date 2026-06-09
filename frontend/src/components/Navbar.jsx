function Navbar() {

  return (

    <div className="flex justify-between items-center mb-10">

      <h1 className="text-2xl font-bold">
        AI Generator
      </h1>

      <div className="flex gap-6">
        <button>Home</button>
        <button>Gallery</button>
        <button>Settings</button>
      </div>

    </div>
  );
}

export default Navbar;