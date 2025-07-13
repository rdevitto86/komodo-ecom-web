import { BaseLog } from '../types.';

export type ClickstreamLog = BaseLog & {
  type: 'clickstream';
  eventType: 'page_view' | 'click' | 'scroll' | 'form_submit' | 'download' | 'video_play' | 'custom';
  eventName: string;
  page: {
    url: string;
    title?: string;
    referrer?: string;
    path: string;
    queryParams?: Record<string, string>;
  };
  user: {
    anonymousId?: string;
    userId?: string;
    cohort?: string;
    segment?: string;
  };
  element?: {
    id?: string;
    className?: string;
    tagName?: string;
    text?: string;
    position?: { x: number; y: number };
  };
  session: {
    sessionId: string;
    isNewSession: boolean;
    sessionDuration?: number;
    pageSequence?: number;
  };
  device: {
    userAgent: string;
    platform?: string;
    browser?: string;
    screenSize?: string;
    viewport?: { width: number; height: number };
    isMobile?: boolean;
  };
  marketing?: {
    campaign?: string;
    source?: string;
    medium?: string;
    content?: string;
    term?: string;
  };
  customProperties?: Record<string, any>;
}
