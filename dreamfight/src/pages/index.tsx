import * as React from "react"

import DreamFightLogo from '../components/DreamFightLogo';
import HeroImageView from '../components/HeroImageView.tsx';
import heroImageSrc from '../images/hero.png';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      hero: file(relativePath: { eq: "hero.png" }) {
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `);

  const image = getImage(data.hero);

  return (
    <section className="flex justify-center
      md:flex-row-reverse md:items-start items-center flex-col-reverse"
    >
      { /* @ts-ignore: Type 'undefined' is not assignable */ }
      <GatsbyImage image={image}
        imgStyle={{ 
          objectFit: 'contain',
          objectPosition: 'left top'
        }} 
        className="max-w-full sm:max-w-[50%] h-screen"
        alt="A tennis player in a game"
      />
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
              text-md
              my-3 font-bold
            '>
              Sign up for early access
            </div>
            <div className='flex flex-col sm:flex-row sm:space-x-4 w-3xl font-large'>
              <input type="text" className="py-3 mb-3 sm:mb-0 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded text-lg px-3" placeholder="Enter your email"/>
              <button className='
                px-8 py-3 whitespace-nowrap bg-purple rounded
                text-lg sm:text-md
              '>
                Sign up
              </button>
            </div>
          </div>
        </div>
        <div className='mt-10 text-gray-600 italic text-sm'>
          © 2022 DreamFight Inc. All rights reserved.
        </div>
      </main>
    </section>
  )
}

export default IndexPage
