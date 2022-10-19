import * as Observable from "rxjs";
import Hls from "hls.js";

type VideoFeedProps = {
  src: string,
  width: number,
  height: number,
}

export const VideoSubject = ({ src, width, height }: VideoFeedProps) => {
  const subject = new Observable.Subject<ImageData>();
  const hls = new Hls({ ...Hls.DefaultConfig, ...{ autoStartLoad: true } });
  const video = document.createElement("video");
  video.muted = true;

  if (Hls.isSupported()) {
    hls.loadSource(src);
    hls.attachMedia(video);
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = src;
  }

  video.play();

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d", {
    /// Indicates whether or not read-back operations are planned; forcing use of
    /// software vs hardware acceleration which saves memory when calling
    /// getImageData frequently.
    //
    /// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
    willReadFrequently: true,
  }) as OffscreenCanvasRenderingContext2D;

  const handler = (timer: number) => {
    /// Extract pixel source from video tag
    ctx!.drawImage(video, 0, 0);
    const imdata = ctx!.getImageData(0, 0, canvas.width, canvas.height);

    subject.next(imdata);

    // @ts-ignore
    video.requestVideoFrameCallback(handler);
  };

  // @ts-ignore
  video.requestVideoFrameCallback(handler);

  return subject;
};
