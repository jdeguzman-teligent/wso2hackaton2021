import { BillingSystem } from "components/billing-system";
import { Spinner } from "components/spinner";
import { Landing } from "components/landing";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/state/reducers";
import { useEffect } from "react";
import { getCustomers } from "src/state/redux/ducks/customer";
import { getAPIMToken, getISToken, logout } from "src/state/redux/ducks/user";
import { CONFIG } from "config";
import { useRouter } from "next/router";

const IndexPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);
  const customer = useSelector((state: RootState) => state.customer);

  useEffect(() => {

    const code = new URL(window.location.href).searchParams.get("code");
    const sp = new URL(window.location.href).searchParams.get("sp");
    
    if (sp === CONFIG.SERVICE_PROVIDER && user.ISToken !== null) 
    {
      console.log('CONFIG.SERVICE_PROVIDER', sp);      
      dispatch(logout());
      router.push('/');    
      return;
    }

    if (user.ISToken !== null && user.token !== null && customer.payload.length === 0 ) {
      dispatch(getCustomers(user.token));
      return;
    }

    if (code && user.ISToken === null) {
      dispatch(getISToken(code));
      return;
    }

    if (user.ISToken !== null && user.token === null) {
      dispatch(getAPIMToken({}));
    }

  }, [user, customer]);

  if (user.isAuthenticated) {
    return (
      <> {user.loading  ? <Spinner /> : <BillingSystem />}</>
    );
  }

  return <Landing />;
};

export default IndexPage;
