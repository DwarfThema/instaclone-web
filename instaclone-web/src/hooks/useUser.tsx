import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import { MeQuery, MeQueryVariables } from "../generated/graphql";

const ME_QUERY = gql`
  query me {
    me {
      userName
      avatar
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery<MeQuery, MeQueryVariables>(ME_QUERY, {
    skip: !hasToken,
  });
  console.log(data, error);

  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
}
export default useUser;
