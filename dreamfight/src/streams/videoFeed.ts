import * as Observable from "rxjs";
import Hls, { FragChangedData } from "hls.js";
import videoChunks from "../data/data.json";

const VIDEO = {
  width: 1280,
  height: 720,
  fps: 15,
};

const videoFeed$ = (url: string) => {
  return new Observable.Observable((sub: Observable.Subscriber<ImageData>) => {
    const hls = new Hls({ ...Hls.DefaultConfig, ...{ autoStartLoad: true }});

    const video = document.createElement('video');
    video.muted = true;

    if (Hls.isSupported()) {
      hls.loadSource(url);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    }

    /// Video is paused temporarily so that we can first obtain the `sequence number`
    /// from live stream to find the relative position of the global playhead.
    /// With that, we're able to serve our stubbed tennis ball coordinates for 
    /// rendering.
    video.play();

    const canvas = new OffscreenCanvas(VIDEO.width, VIDEO.height);
    const ctx  = canvas.getContext('2d', { 
      /// Indicates whether or not read-back operations are planned; forcing use of
      /// software vs hardware acceleration which saves memory when calling 
      /// getImageData frequently.
      //
      /// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
      willReadFrequently: true 
    }) as OffscreenCanvasRenderingContext2D;

    const handler = (timer: number) => {
      /// Extract pixel source from video tag
      ctx!.drawImage(video, 0, 0);
      const imdata = ctx!.getImageData(0, 0, canvas.width, canvas.height);

      sub.next(imdata);

      // @ts-ignore
      video.requestVideoFrameCallback(handler); 
    } 

    // @ts-ignore
    video.requestVideoFrameCallback(handler);
  });
}

export default videoFeed$;
