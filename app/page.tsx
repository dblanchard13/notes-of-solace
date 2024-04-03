import Link from 'next/link'

const Landing = async () => {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">Notes of Solace</h1>
        <p className="text-2xl text-white/60 mb-4">
          A simple note taking app to help you find solace in your thoughts.
        </p>
        <div className="flex align-center">
          <Link href="/notepad">
            <button className="bg-purple-500 px-4 py-2 rounded-lg text-xl">
              Go to your notes
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing
