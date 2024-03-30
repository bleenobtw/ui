import type { FC, PropsWithChildren } from 'react';
import { useEffect } from 'react';

interface FeatureProps<T = any> extends PropsWithChildren {
  id: string;
  onShow: (data: T) => void;
  onEvent?: (data: T) => void;
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

  useEffect(() => {
    window.addEventListener("message", handleMessageEvent);

    return () => {
      window.removeEventListener("message", handleMessageEvent);
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