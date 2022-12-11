import * as React from "react";
import badgeSrc from "../images/badge.png";
import TwitterIcon from '../images/icon-twitter.svg';
import TwitchIcon from '../images/icon-twitch.svg';
import YoutubeIcon from '../images/icon-youtube.svg';
import InstagramIcon from '../images/icon-instagram.svg';

export function Footer() {
  return (
    <footer className="flex flex-col gap-5 sm:flex-row items-center justify-between mt-20 mb-10 mx-10">
      <div className='flex items-center'>
        <img src={badgeSrc} alt="DF badge" className="footer-badge" />
        <p className="content">© 2022 DreamFight Inc. All rights reserved.</p>
      </div>
      <div className='flex gap-5'>
        <a href='https://twitter.com/dreamfightgame' target='_blank'>
          <TwitterIcon className='w-5 sm:w-10' />
        </a>
        <a href='https://www.twitch.tv/dreamfightgame' target='_blank'>
          <TwitchIcon className='w-5 sm:w-10' />
        </a>
        <a href='https://www.youtube.com/@dreamfightgame/' target='_blank'>
          <YoutubeIcon className='w-5 sm:w-10' />
        </a>
        <a href='https://www.instagram.com/dreamfightgame/' target='_blank'>
          <InstagramIcon className='w-5 sm:w-10' />
        </a>
      </div>
    </footer>
  );
}
