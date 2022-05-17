import Layout from "../components/layout";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Always do navigations after the first render
    router.push("/ekonomicke-dopady", undefined, { shallow: true });
  }, []);

  return <Layout></Layout>;
}
