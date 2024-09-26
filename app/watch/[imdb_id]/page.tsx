import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function page({ params }: { params: { imdb_id?: string } }) {
  return (
    <div className="relative">
      <Link href={"/"}>
        <div className="absolute p-[10px] w-fit h-fit scale-[0.8] top-[50px] left-[5px] z-[10] rounded-[100%] border-white border-[2px] text-white transition-all hover:bg-white hover:text-black cursor-pointer">
          <ArrowLeft />
        </div>
      </Link>

      <iframe
        allowFullScreen
        src={"https://vidsrc.cc/v2/embed/movie/" + params.imdb_id}
        className="w-[100%] h-[100%] fixed inset-0 m-0"
      ></iframe>
    </div>
  );
}
