import { APIClient } from '../http-client/http.service';

// TODO: Define a more specific type for the event payload
type LogEventPayload = {
  eventType: string;
  payload: any;
};

type SendMetricsPayload = {
  metricName: string;
  value: number;
  tags?: Record<string, string>;
};

const telemetryApi = APIClient.injectEndpoints({
  endpoints: (builder) => ({
    logEvent: builder.mutation<void, LogEventPayload>({
      query: (event) => ({
        url: '/api/logging',
        method: 'POST',
        data: event,
      }),
    }),
    sendMetrics: builder.mutation<void, SendMetricsPayload>({
      query: (metric) => ({
        url: '/api/metrics',
        method: 'POST',
        data: metric,
      }),
    }),
  }),
});

export const { useLogEventMutation, useSendMetricsMutation } = telemetryApi;
