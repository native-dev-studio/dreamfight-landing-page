import * as Observable from "rxjs";
import Hls, { FragChangedData } from "hls.js";
import videoChunks from "../data/data.json";

const VIDEO = {
  width: 1280,
  height: 720,
  fps: 15,
};

const videoFeed$ = (url: string) => {
  return new Observable.Observable((sub: Observable.Subscriber<{ imdata: ImageData, coords: any }>) => {

    const hls = new Hls({ 
      ...Hls.DefaultConfig,
      ...{ startFragPrefetch: true }
    });

    const video = document.createElement('video');
    video.muted = true;

    if (Hls.isSupported()) {
      hls.loadSource(url);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    }

    hls.once(Hls.Events.FRAG_CHANGED, (evt, data) => {
      const sn = data.frag.sn;
      const secondsPerChunk      = 6;
      const videoLengthInMinutes = 10;
      const secondsInMinutes     = 60;
      const chunkId = (sn as number) % ((videoLengthInMinutes * secondsInMinutes) / secondsPerChunk);
      const sliced = videoChunks.slice(chunkId).flat();

      /// Video is paused temporarily so that we can first obtain the `sequence number`
      /// from live stream to find the relative position of the global playhead.
      /// With that, we're able to serve our stubbed tennis ball coordinates for 
      /// rendering.
      video.play();

      console.log(`(sn=(${sn}), chunkId=(${chunkId}))`);

      const canvas = new OffscreenCanvas(VIDEO.width, VIDEO.height);
      const ctx  = canvas.getContext('2d');

      const handler = (timer: number) => {
        ctx!.drawImage(video, 0, 0);
        const imdata = ctx!.getImageData(0, 0, canvas.width, canvas.height);
        sub.next({
          imdata: imdata,
          coords: sliced.shift(),
        });
        // @ts-ignore
        video.requestVideoFrameCallback(handler); 
      } 

      // @ts-ignore
      video.requestVideoFrameCallback(handler);
    });

  });
}

export default videoFeed$;
