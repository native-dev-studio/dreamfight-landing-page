import * as React from "react"
import DreamFightLogo from '../components/DreamFightLogo';

const IndexPage = () => {
  return (
    <div className="relative bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-black sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mx-auto max-w-7xl px-10">
            <div className="text-left">
              <div className='my-10'>
                <DreamFightLogo />
              </div>
              <h1 className="mt-16 mb-8 text-white text-6xl tracking-tight font-extrabold">
                Get in the game
              </h1>
              <p className="mt-3 text-white sm:mt-5 sm:text-lg md:mt-5 md:text-xl lg:mx-0 text-white">
                DreamFight is a new sports game augmented over live broadcast that channels the kid in all of us. Think NBA Jam. NFL Blitz. We're bringing back the magic of sports and gaming.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center justify-start">
                <div className="w-full">
                  <div className='my-3 text-white font-bold'>
                    Sign up for early access
                  </div>
                  <div className='flex space-x-4 w-3xl font-large'>
                    <input type="text" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded text-medium px-3" placeholder="Enter your email"/>
                    <button className='px-8 py-3 text-medium whitespace-nowrap text-white bg-purple rounded'>
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
