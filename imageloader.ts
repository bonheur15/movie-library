"use client";

export default function myImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  //
  console.log();
  if (src.includes("http")) {
    src = `https://cloundary-temp-test.b-cdn.net/?url=${src}&width=${width}`;
    if (quality) {
      src += `&quality=${quality}`;
    }
  } else {
    src = `${src}`;
  }
  return src;
}
