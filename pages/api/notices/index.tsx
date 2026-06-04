import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const notices = await prisma.notice.findMany({
      orderBy: [
        {
          priority: "desc",
        },
        {
          publishDate: "desc",
        },
      ],
    });

    return res.status(200).json(notices);
  }

  if (req.method === "POST") {
    const {
      title,
      body,
      category,
      priority,
      publishDate,
    } = req.body;

    if (!title || !body || !publishDate) {
      return res.status(400).json({
        error: "Required fields missing",
      });
    }

    const notice = await prisma.notice.create({
      data: {
        title,
        body,
        category,
        priority,
        publishDate: new Date(publishDate),
      },
    });

    return res.status(201).json(notice);
  }

  return res.status(405).json({
    error: "Method not allowed",
  });
}