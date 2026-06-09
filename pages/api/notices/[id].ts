import type { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);

  if (req.method === "GET") {
    const notice = await prisma.notice.findUnique({
      where: { id },
    });

    return res.status(200).json(notice);
  }

  if (req.method === "PUT") {
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

    const notice = await prisma.notice.update({
      where: { id },
      data: {
        title,
        body,
        category,
        priority,
        publishDate: new Date(publishDate),
      },
    });

    return res.status(200).json(notice);
  }

  if (req.method === "DELETE") {
    await prisma.notice.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Deleted",
    });
  }

  return res.status(405).json({
    error: "Method not allowed",
  });
}