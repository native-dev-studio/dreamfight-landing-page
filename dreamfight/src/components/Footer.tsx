import * as React from "react";
import badgeSrc from "../images/badge.png";
import TwitterIcon from '../images/icon-twitter.svg';
import TwitchIcon from '../images/icon-twitch.svg';
import YoutubeIcon from '../images/icon-youtube.svg';
import InstagramIcon from '../images/icon-instagram.svg';

export function Footer() {
  return (
    <footer className="flex flex-col gap-5 md:flex-row items-center justify-between mt-20 mb-10 mx-10">
      <div className='flex items-center flex-col sm:flex-row gap-3'>
        <img src={badgeSrc} alt="DF badge" className="w-10 sm:w-7 md:w-10" />
        <p className='text-sm sm:text-md md:text-lg'>© 2022 DreamFight Inc. All rights reserved.</p>
      </div>
      <p className='text-sm text-sm md:text-lg'>
        Contact: <a href='mailto:workwith@dreamfight.io' className='text-purple'>workwith@dreamfight.io</a>
      </p>
      <div className='flex gap-5'>
        <a href='https://twitter.com/dreamfightgame' target='_blank'>
          <TwitterIcon className='w-7 md:w-10' />
        </a>
        <a href='https://www.youtube.com/@dreamfightgame/' target='_blank'>
          <YoutubeIcon className='w-7 md:w-10' />
        </a>
        <a href='https://www.instagram.com/dreamfightgame/' target='_blank'>
          <InstagramIcon className='w-7 md:w-10' />
        </a>
        <a href='https://www.twitch.tv/dreamfightgame' target='_blank'>
          <TwitchIcon className='w-7 md:w-10' />
        </a>
      </div>
    </footer>
  );
}
