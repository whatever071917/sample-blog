import Image from "next/image";
import Homepage from "./components/homepage";

export default function Home() {
  return (
      <div className={'h-full bg-zinc-800'}>
        <Homepage />
      </div>
  );
}
