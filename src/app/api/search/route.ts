export const revalidate = false;

// Search is temporarily disabled - needs configuration for i18n support
export async function GET() {
  return new Response(JSON.stringify({ error: 'Search not configured' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  });
}