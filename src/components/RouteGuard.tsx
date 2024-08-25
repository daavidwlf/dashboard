import { createEffect, createResource, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import LoadingPage from "./LoadingPage";
import { isAuthenticated, validateToken } from "../utils/auth";

export default function RouteGuard(props: any) {
  const navigate = useNavigate();

  const [authValidation] = createResource(validateToken);

  createEffect(() => {
    if (authValidation.state === "ready" && !isAuthenticated()) {
      navigate("/", { replace: true });
    }
  });

  return (
    <Show
      when={authValidation.state === "ready"}
      fallback={<LoadingPage />} 
    >
      <Show when={isAuthenticated()}>{props.children}</Show>
    </Show>
  );
}