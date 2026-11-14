"use client";

import React from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function GoogleAnalyticsWrapper() {
  return (
    <GoogleAnalytics
      gaMeasurementId="G-K76000TXCG"
      trackPageViews
    />
  );
}