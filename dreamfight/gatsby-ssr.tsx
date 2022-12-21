import * as React from "react"
import type { GatsbySSR } from "gatsby"

export const onPreRenderHTML: GatsbySSR["onPreRenderHTML"] = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents();

  const tagline     = "DreamFight | A new era in gaming";
  const description = "DreamFight is a radically new strategy game played on top of live sports broadcast. Play as your favorite champions and fight!";

  replaceHeadComponents([
    ...headComponents,
    <title key={0}>DreamFight</title>,
    <meta  key={1} property="og:title" content={tagline} />,
    <meta  key={2} property="og:type" content="website" />,
    <meta  key={3} property="og:description" content={description} />,
  ])
}
