import type { FC, PropsWithChildren } from 'react';
import { useEffect } from 'react';

interface FeatureProps<T = any> extends PropsWithChildren {
  id: string;
  onShow: (data: T) => void;
  onEvent?: (data: T) => void;
  onEscape?: () => void;
}

const Feature: FC<FeatureProps> = (props) => {
  async function handleMessageEvent(e: MessageEvent) {
    if (!e.data || e.data.feature !== props.id)
      return;

    const data = e.data.data || {};
    if (e.data.show && typeof props.onShow === "function")
      props.onShow(e.data.show);

    if (typeof props.onEvent === "function") {
      props.onEvent(data);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key != "Escape")
      return;

    if (typeof props.onEscape === "function")
      props.onEscape();
  }

  useEffect(() => {
    window.addEventListener("message", handleMessageEvent);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("message", handleMessageEvent);
      window.removeEventListener("keydown", handleKeydown);
    }
  }, [])

  return (
    <>
      <div {...props}>
        {props.children}
      </div>
    </>
  )
}

export default Feature;