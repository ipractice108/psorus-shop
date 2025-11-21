import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Нежная кожа - Натуральное средство от псориаза'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        <div style={{ fontSize: 120, marginBottom: 20 }}>🌿</div>
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 20 }}>
          Нежная кожа
        </div>
        <div style={{ fontSize: 36, opacity: 0.9, textAlign: 'center' }}>
          Натуральное средство от псориаза
        </div>
        <div style={{ fontSize: 28, opacity: 0.8, marginTop: 30 }}>
          psorus.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
