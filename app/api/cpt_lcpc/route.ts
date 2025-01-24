// app/api/reduce_cpt_data/route.ts
import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

// 获取当前文件的目录路径
const currentDir = __dirname;

// 构建相对路径
const scriptPath = path.join(currentDir, '../../utils/cpt_lcpc.py');

export async function POST(request: Request) {
  const inputData = await request.json();
  
  return new Promise((resolve) => {
    const pyProcess = spawn('python3', [scriptPath]);
    let outputData = '';
    let errorData = '';

    pyProcess.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    pyProcess.stderr.on('data', (data) => {
      errorData += data.toString();
    });

    pyProcess.on('close', (code) => {
      if (code === 0) {
        resolve(NextResponse.json({ result: outputData }));
      } else {
        resolve(NextResponse.json({ error: errorData }, { status: 500 }));
      }
    });

    pyProcess.stdin.write(JSON.stringify(inputData));
    pyProcess.stdin.end();
  });
}