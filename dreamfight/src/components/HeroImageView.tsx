import * as React from "react"
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

const HeroImageView = ({className, children}) => {
 const { desktop, medium, small } = useStaticQuery(
    graphql`
      query {
        desktop: file(relativePath: { eq: "hero.png" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        medium: file(relativePath: { eq: "1400x900.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1400, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        small: file(relativePath: { eq: "490x352.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 490, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  )

  const backgroundArtDirectionStack = [
    {
      ...desktop.childImageSharp.fluid,
      media: `(min-width: 1401px)`,
    },
  ]

  return (
    <div className='flex items-center w-full justify-center h-screen'>
      <div className='w-full h-screen flex overflow-hidden'>
        <BackgroundImage
          Tag='section'
          className={className}
          fluid={backgroundArtDirectionStack}
          role='img'
          preserveStackingContext={true}
        >
          {children}
        </BackgroundImage>
      </div>
    </div>
  );
}

export default HeroImageView;
