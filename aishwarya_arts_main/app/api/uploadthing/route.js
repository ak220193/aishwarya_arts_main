// 1. Updated import name to match current UploadThing versions
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// 2. Export the GET and POST methods using the new name
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});