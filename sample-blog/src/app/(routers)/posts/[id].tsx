import {useRouter} from "next/router";
import {GetStaticProps} from "next";
import {GetStaticPaths} from "next";
import {Post} from "@/app/models/data.model";

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}
