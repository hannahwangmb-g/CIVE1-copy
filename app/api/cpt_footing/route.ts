// app/api/reduce_cpt_data/route.ts
import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function POST(request: Request) {
  const inputData = await request.json();
  
  return new Promise((resolve) => {
    const pyProcess = spawn('python3', ['/workspaces/CIVE1/app/utils/cpt_footing.py']);
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