import { Application } from "../deps.ts";
import { TriggerMetaData } from "../types/triggerMetadata.ts";
import { Trigger } from "./trigger.ts";

class Events {
  static listen = (app: Application) => {
    app.addEventListener("listen", ({ hostname, port, secure }) => {
      console.log(
        `Listening on: ${secure ? "https://" : "http://"}${
          hostname ??
            "localhost"
        }:${port}`,
      );
    });

    // @ts-ignore -- The Trigger event is not emitted anywhere yet as the implementation details are unknown. See below for details
    app.addEventListener("trigger", (_metadata: TriggerMetaData) => {
      /*
      It's not quite clear how the outlined trigger() function will be called, however based on my reading of the docs this will
      be via some automatic process taken care of using a node or some other method. It's possible that this is achived using
      a websocket or even a simple API call built into a node, but at right now it's still not very obvious how this will be implemented.
      Whatever this may look what when more info is published, the request should be processed by the router and then end up calling
      this fn using an event emitter.
      */
      new Trigger(_metadata).handle();
    });
  };
}

export { Events };
