import * as React from "react"
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const HeroImage = (props: any) => {
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
      /* @ts-ignore: Type 'undefined' is not assignable */
      <GatsbyImage {...props} image={image}
        imgStyle={{ 
          objectFit: 'contain',
          objectPosition: 'left top'
        }} 
        alt="A tennis player in a game"
      />
  );
};

export default HeroImage;
