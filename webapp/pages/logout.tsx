import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/state/reducers";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { logout } from "src/state/redux/ducks/user";
import { LoggingOut } from "components/logging-out";
import { dispatchLogout } from "src/actions/sign-out";
import { CONFIG } from "config";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // if (user.ISToken === null)
    // {
    //   console.log('user.ISToken is hit logout');      
    //   router.push('/');
    //   return;
    // }


    dispatchLogout(user.ISToken?.id_token);

  }, []);

  return <LoggingOut />;
};

export default LogoutPage;
