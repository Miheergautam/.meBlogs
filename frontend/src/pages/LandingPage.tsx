import NavBar from "../components/LandingPage/NavBar";

export default function LandingPage() {
  return (
    <div className="flex flex-col h-screen bg-neutral-800">
      <NavBar />
      <div className="flex flex-col justify-center items-center text-white h-screen">
        <h1 className="text-4xl font-bold py-2">
          Publish your passions, your way
        </h1>
        <p className="text-xl">Create a unique and beautiful blog easily.</p>
        <div className="py-5">
          <button className="bg-red-400 text-white px-4 py-2 rounded-md">
            CREATE A BLOG
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-white text-3xl ">
        <div>Sample Blogs</div>
      </div>
    </div>
  );
}
