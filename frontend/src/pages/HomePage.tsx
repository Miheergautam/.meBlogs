export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-800">
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="min-w-1/2 min-h-1/2 p-2 space-y-3">
          <h1 className="text-4xl text-red-400 font-bold ">Your Blog Here !</h1>
          <div className="bg-white h-full max-h-3/4 rounded-2xl p-4" >
            <p>Write your text here</p>
          </div>
          <button className="p-3 bg-red-400 text-white rounded-4xl">
            Create One
          </button>
        </div>
      </div>
    </div>
  );
}
