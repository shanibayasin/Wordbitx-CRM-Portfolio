import { NextRequest, NextResponse } from 'next/server';
import { canManageLeads, requireOrganizationAuth } from '../../../lib/auth.ts';
import { uploadToCloudinary } from '../../../lib/cloudinary.ts';

export async function POST(req: NextRequest) {
  try {
    const user = await requireOrganizationAuth();
    if (!canManageLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to upload files.' }, { status: 403 });
    }
    const body: unknown = await req.json().catch(() => null);

    if (!body || typeof body !== 'object' || !('file' in body) || typeof body.file !== 'string' || !body.file) {
      return NextResponse.json({ error: 'Valid file data is required.' }, { status: 400 });
    }
    if (body.file.length > 14_000_000) {
      return NextResponse.json({ error: 'File data exceeds the 10 MB upload limit.' }, { status: 413 });
    }

    const uploadResult = await uploadToCloudinary(body.file, `wordbitx/${user.organizationId}`);

    return NextResponse.json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      bytes: uploadResult.bytes,
    });
  } catch (error: unknown) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload to Cloudinary' },
      { status: 500 }
    );
  }
}
