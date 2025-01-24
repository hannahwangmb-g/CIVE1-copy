import { openai } from "@/app/openai";
import fs from 'fs';
import path from 'path';

const THREADS_FILE = path.join(process.cwd(), 'userThreads.json');

// 获取所有对话线程ID列表
export async function GET() {
  if(!fs.existsSync(THREADS_FILE)) {
    return Response.json([]);
  }
  const threads = JSON.parse(fs.readFileSync(THREADS_FILE, 'utf8'));
  return Response.json(threads);
}

// 保存新的 thread ID 和名称
export async function POST(request) {
  const { threadId, name } = await request.json();
  let threads = [];
  if(fs.existsSync(THREADS_FILE)) {
    threads = JSON.parse(fs.readFileSync(THREADS_FILE, 'utf8'));
  }
  // 避免重复添加
  if (!threads.some(thread => thread.id === threadId)) {
    threads.push({ id: threadId, name });
    fs.writeFileSync(THREADS_FILE, JSON.stringify(threads));
  }
  return Response.json({ success: true });
}

// 更新线程名称
export async function PUT(request) {
  const { threadId, newName } = await request.json();
  if(fs.existsSync(THREADS_FILE)) {
    let threads = JSON.parse(fs.readFileSync(THREADS_FILE, 'utf8'));
    threads = threads.map(thread => 
      thread.id === threadId ? { ...thread, name: newName } : thread
    );
    fs.writeFileSync(THREADS_FILE, JSON.stringify(threads));
  }
  return Response.json({ success: true });
}

export async function DELETE(request: Request) {
  try {
    const { threadId } = await request.json(); // 从请求体中获取 threadId
    
    // 删除 OpenAI 上的线程
    await openai.beta.threads.del(threadId);
    
    // 从本地存储中删除
    if(fs.existsSync(THREADS_FILE)) {
      let threads = JSON.parse(fs.readFileSync(THREADS_FILE, 'utf8'));
      threads = threads.filter(thread => thread.id !== threadId);
      fs.writeFileSync(THREADS_FILE, JSON.stringify(threads));
    }
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Delete thread error:', error);
    return Response.json(
      { error: error.message || 'Failed to delete thread' }, 
      { status: 500 }
    );
  }
}