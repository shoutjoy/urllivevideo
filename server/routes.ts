import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

function extractVideoMetadata(url: string): {
  platform: "youtube" | "vimeo";
  videoId: string;
  thumbnail: string;
  title: string;
} {
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);

  if (youtubeMatch) {
    const videoId = youtubeMatch[1];
    return {
      platform: "youtube",
      videoId,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      title: `YouTube Video - ${videoId}`,
    };
  } else if (vimeoMatch) {
    const videoId = vimeoMatch[1];
    return {
      platform: "vimeo",
      videoId,
      thumbnail: `https://vumbnail.com/${videoId}.jpg`,
      title: `Vimeo Video - ${videoId}`,
    };
  }

  throw new Error("Invalid video URL");
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/videos", async (_req, res) => {
    try {
      const videos = await storage.getAllVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  const createVideoInputSchema = z.object({
    url: z.string().url(),
  });

  app.post("/api/videos", async (req, res) => {
    try {
      const result = createVideoInputSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ error: result.error.message });
      }

      const { url } = result.data;
      
      const metadata = extractVideoMetadata(url);
      const videoData = {
        url,
        title: metadata.title,
        thumbnail: metadata.thumbnail,
        platform: metadata.platform,
        duration: null,
      };

      const video = await storage.createVideo(videoData);
      res.status(201).json(video);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Failed to create video" });
    }
  });

  app.delete("/api/videos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteVideo(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Video not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete video" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
