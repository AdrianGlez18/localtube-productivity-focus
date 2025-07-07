type YoutubeAPIThumbnail = {
    url: string;
    width: number;
    height: number;
  };
  
  type YoutubeAPIThumbnails = {
    default?: YoutubeAPIThumbnail;
    medium?: YoutubeAPIThumbnail;
    high?: YoutubeAPIThumbnail;
    standard?: YoutubeAPIThumbnail;
    maxres?: YoutubeAPIThumbnail;
  };
  
  type YoutubeAPISnippet = {
    categoryId: string;
    channelId: string;
    channelTitle: string;
    defaultAudioLanguage?: string;
    defaultLanguage?: string;
    description: string;
    liveBroadcastContent: string;
    publishedAt: string;
    thumbnails: YoutubeAPIThumbnails;
    title: string;
    localized?: any; // Not used
  };
  
  export type YoutubeAPIVideo = {
    etag: string;
    id: string;
    kind: string;
    snippet: YoutubeAPISnippet;
  };