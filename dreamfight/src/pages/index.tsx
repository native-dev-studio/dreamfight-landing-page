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
      lg:flex-row-reverse sm:flex-col-reverse flex-col-reverse"
    >
      <GatsbyImage image={image} imgStyle={{ objectFit: 'contain', objectPosition: 'left top' }} className="h-screen" alt=""/>
      <main className="max-w-lg px-10">
        <div className="text-left">
          <div className='my-10'>
            <DreamFightLogo />
          </div>
          <h1 className="italic mt-16 2xl:mt-16 mb-8 text-white text-6xl md:text-7xl 2xl:text-8xl tracking-tight font-extrabold">
            Get in the game
          </h1>
          <p className="my-3 text-white sm:mt-5 text-lg md:text-2xl md:mt-5 md:text-xl lg:mx-0 text-white">
            DreamFight is a new sports game augmented over live broadcast. We're bringing back the magic of sports and gaming.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center justify-start">
            <div className="w-full">
              <div className='my-3 text-white text-lg font-bold'>
                Sign up for early access
              </div>
              <div className='flex flex-col sm:flex-row sm:space-x-4 w-3xl font-large'>
                <input type="text" className="py-3 mb-3 sm:mb-0 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded text-lg px-3" placeholder="Enter your email"/>
                <button className='px-8 py-3 text-lg whitespace-nowrap text-white bg-purple rounded'>
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

export default IndexPage
