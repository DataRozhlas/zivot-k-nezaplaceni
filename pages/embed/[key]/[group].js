import React from "react";
import { useRouter } from "next/router";

const bigEmbed = () => {
  const router = useRouter();
  const { key, group } = router.query;
  return (
    <div>
      {key},,
      {group}
    </div>
  );
};

export default bigEmbed;
