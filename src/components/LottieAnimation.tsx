import { createEffect } from "solid-js";
import lottie from "lottie-web";

const LottieAnimation = (props:any) => {
  let container: any

  createEffect(() => {
    const animation = lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: props.loop || true,
      autoplay: props.autoplay || true,
      animationData: props.animationData,
    });

    return () => animation.destroy();
  });

  return <div ref={container} class={props.class}></div>;
};

export default LottieAnimation;