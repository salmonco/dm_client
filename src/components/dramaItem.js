import Link from "next/link";

export default function DramaItem({ item }) {
  return (
    <Link href={"/dramaDetail"}>
      <div className="flex flex-col gap-[8px] items-center">
        <div className="w-[100px] h-[140px] bg-slate-200"></div>
        <span>{item.title}</span>
      </div>
    </Link>
  );
}