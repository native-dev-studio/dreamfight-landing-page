import * as React from "react"

import { Link } from 'gatsby';
import DreamFightLogo from '../components/DreamFightLogo';
import HeroImage from '../components/HeroImage';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const IndexPage = () => {
  return (
    <section className="
      flex flex-col justify-center items-center 
      md:flex-row md:items-start
    ">
      <main className="max-w-lg mb-10 px-10">
        <DreamFightLogo className='my-5'/>
        <h1 className="
          mt-4 sm:mt-8 2xl:mt-16 
          mb-8 
          italic tracking-tight font-extrabold
        ">
          Get in the game
        </h1>
        <p className="
          my-3 sm:mt-5 md:mt-5 lg:mx-0
        ">
          DreamFight is a new type of sports game augmented over live broadcast. We're bringing back the magic of sports and gaming.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center justify-start">
          <div className="w-full">
            <div className='
              text-lg
              my-3 font-semibold
            '>
              Sign up for early access
            </div>
            <div className='flex flex-col sm:flex-row sm:space-x-4 w-3xl font-large'>
              <input type="text" 
                className="
                  py-3 mb-3 text-black sm:mb-0 focus:ring-red focus:border-red flex-1 block w-full rounded text-lg px-3
                "
                placeholder="Enter your email"
              />
              { /* @ts-ignore */}
              <Link to='/pong' className='
                px-8 py-3 whitespace-nowrap bg-purple rounded
                text-lg sm:text-md'
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className='mt-5 sm:mt-10 text-gray-600 italic text-sm'>
          © 2022 DreamFight Inc. All rights reserved.
        </div>
      </main>
      <HeroImage className="max-w-full sm:max-w-[40%] h-screen" />
    </section>
  )
}

export default IndexPage
