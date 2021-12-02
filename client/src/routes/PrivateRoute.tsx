import { Redirect, Route, RouteProps } from "react-router";

export type PrivateRouteProps = {
    authenticationPath?: string;
} & RouteProps;

export default function PrivateRoute({
    authenticationPath = "/login",
    ...routeProps
}: PrivateRouteProps) {

    if (true) {
        return <Route {...routeProps} />;
    } else {
        return <Redirect to={{ pathname: authenticationPath }} />;
    }
}
