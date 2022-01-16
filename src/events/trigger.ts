import { TriggerMetaData } from "../types/triggerMetadata.ts";

class Trigger {
  metadata: TriggerMetaData;
  constructor(
    _metadata: TriggerMetaData,
  ) {
    _metadata = this.metadata;
  }
  handle() {
    /*
        Custom logic for interpeting metadata & fulfilling the Smart Service request would go here
        Make use of seperate util functions (src/utils) for cleanest implementation
        */
  }
}

export { Trigger };
