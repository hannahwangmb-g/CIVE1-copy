import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';

const INPUT_PATH = path.join(process.cwd(), 'cpt_based_tool', 'files');
const OUTPUT_PATH = path.join(process.cwd(), 'cpt_based_tool', 'gpt');

async function ensureDirs() {
  await fs.mkdir(INPUT_PATH, { recursive: true });
  await fs.mkdir(OUTPUT_PATH, { recursive: true });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const filename = url.searchParams.get('filename');

  // If filename is provided, open folder
  if (filename) {
    try {
      const filePath = path.join(OUTPUT_PATH, filename);
      const command = process.platform === 'win32' 
        ? `explorer /select,"${filePath}"`
        : `xdg-open "${path.dirname(filePath)}"`;  // Linux

      return new Promise((resolve) => {
        exec(command, (error) => {
          if (error) {
            console.error('Error opening folder:', error);
            resolve(NextResponse.json(
              { error: 'Failed to open folder' },
              { status: 500 }
            ));
          }
          resolve(NextResponse.json({ success: true }));
        });
      });
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to open folder' },
        { status: 500 }
      );
    }
  }

  // Otherwise, list files
  try {
    await ensureDirs();
    const [inputFiles, outputFiles] = await Promise.all([
      fs.readdir(INPUT_PATH),
      fs.readdir(OUTPUT_PATH)
    ]);
    return NextResponse.json({ inputFiles, outputFiles });
  } catch (error) {
    console.error('Error reading files:', error);
    return NextResponse.json(
      { error: 'Failed to read files' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await ensureDirs();
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await fs.writeFile(path.join(INPUT_PATH, file.name), new Uint8Array(buffer));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json(
      { error: 'Failed to save file' },
      { status: 500 }
    );
  }
}
