import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const INPUT_PATH = path.join(process.cwd(), 'cpt_based_tool', 'files');
const OUTPUT_PATH = path.join(process.cwd(), 'cpt_based_tool', 'gpt');

export async function DELETE(
  request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    // 尝试从输入和输出目录删除文件
    await Promise.all([
      fs.unlink(path.join(INPUT_PATH, filename)).catch(() => {}),
      fs.unlink(path.join(OUTPUT_PATH, filename)).catch(() => {})
    ]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}