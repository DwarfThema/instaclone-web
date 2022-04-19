import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { logUserOut, tokenVar } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      id
      userName
      avatar
    }
  }
`;

const useMe = () => {
  const hasToken = useReactiveVar(tokenVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
};

export default useMe;
