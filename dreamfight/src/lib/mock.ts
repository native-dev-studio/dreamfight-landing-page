export const generatePlayheadIndex = (imdata: ImageData): number => {
  /// Assume there will be binary expression of an index that represents the frame
  /// count of the video we're displaying. This binary expression is 14 pixels in length
  /// (or 16,384 max values) found on the top-left of the image that we can extract
  /// an index from.
  const numPixels = 14;

  /// However, because the array is unstructured; as an Uint8ClampedArray, we need
  /// to multiply the num of pixels by 3 (where each represents an RGB value) and
  /// every 4th value represents a column value we ignore.
  ///
  /// Hence, we add (num of pixels - 1) to account for "skip values".
  const maxLength = numPixels * 3 + (numPixels - 1);
  const pixels = imdata.data.slice(0, maxLength);

  /// Our binary expression will be stored as a string to easily convert to decimal
  /// with parseInt. We use the decimal form for indexing our stubbed data.
  let bits = "";

  let i = 0;
  let n = pixels.length;

  while (i < n) {
    let [r, g, b] = [pixels[i], pixels[i + 1], pixels[i + 2]];

    /// In order to mitigate against lossy compression, we round to the nearest
    /// white/black in order to read the bit.
    const white = Math.sqrt(r ** 2 + g ** 2 + b ** 2);
    const black = Math.sqrt((r - 255) ** 2 + (g - 255) ** 2 + (b - 255) ** 2);

    if (black < white) {
      bits = bits.concat("1");
    } else {
      bits = bits.concat("0");
    }

    i += 4;
  }

  /// Produces the index based on bits
  const index = parseInt(bits, 2);

  return index;
};
